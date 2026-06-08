/**
 * Pyodide运行器模块
 * 负责在浏览器中运行Python代码
 */

/**
 * Pyodide运行器类
 */
class PyodideRunner {
    /**
     * @param {Function} onProgress - 进度回调
     * @param {Function} onOutput - 输出回调
     */
    constructor(onProgress, onOutput) {
        this.onProgress = onProgress || (() => {});
        this.onOutput = onOutput || (() => {});
        this.pyodide = null;
        this.isLoading = false;
        this.isReady = false;
        this.currentRunPromise = null;
        this.loadingPromise = null;
    }

    /**
     * 初始化Pyodide
     * @returns {Promise<boolean>}
     */
    async init() {
        // 如果已加载，直接返回
        if (this.isReady && this.pyodide) {
            return true;
        }

        // 如果正在加载，返回现有的加载Promise
        if (this.loadingPromise) {
            return this.loadingPromise;
        }

        this.isLoading = true;
        this.onProgress({ status: 'loading', message: '正在加载Python环境...' });

        this.loadingPromise = this._loadPyodide();
        return this.loadingPromise;
    }

    /**
     * 内部加载方法
     * @private
     */
    async _loadPyodide() {
        try {
            // 检查是否已存在pyodide全局对象
            if (typeof loadPyodide === 'undefined') {
                throw new Error('Pyodide脚本未加载');
            }

            this.pyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
            });

            // 预加载pandas
            this.onProgress({ status: 'loading', message: '正在加载pandas库...' });
            await this.pyodide.loadPackage(['pandas', 'numpy']);

            this.isReady = true;
            this.isLoading = false;
            this.onProgress({ status: 'ready', message: '环境就绪' });

            return true;
        } catch (error) {
            console.error('Pyodide初始化失败:', error);
            this.isLoading = false;
            this.onProgress({ status: 'error', message: '加载失败: ' + error.message });
            throw error;
        }
    }

    /**
     * 运行Python代码
     * @param {string} code - Python代码
     * @param {Object} options - 运行选项
     * @returns {Promise<Object>} 运行结果
     */
    async run(code, options = {}) {
        const { timeout = 30000, onProgress } = options;

        // 确保Pyodide已初始化
        if (!this.isReady) {
            await this.init();
        }

        // 设置输出捕获
        let output = '';
        let errorOutput = '';

        // 创建输出捕获函数
        const captureCode = `
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.stdout = StringIO()
        self.stderr = StringIO()

    def start(self):
        sys.stdout = self.stdout
        sys.stderr = self.stderr

    def stop(self):
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

    def get_output(self):
        return self.stdout.getvalue()

    def get_error(self):
        return self.stderr.getvalue()

_capture = OutputCapture()
        `;

        try {
            // 运行捕获设置代码
            await this.pyodide.runPythonAsync(captureCode);

            // 开始捕获
            await this.pyodide.runPythonAsync('_capture.start()');

            // 设置超时
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('代码执行超时（30秒）')), timeout);
            });

            // 执行用户代码
            const startTime = Date.now();
            this.currentRunPromise = this.pyodide.runPythonAsync(code);

            let result;
            try {
                result = await Promise.race([this.currentRunPromise, timeoutPromise]);
            } catch (runError) {
                // 停止捕获
                await this.pyodide.runPythonAsync('_capture.stop()');

                // 获取错误输出
                const error = await this.pyodide.runPythonAsync('_capture.get_error()');
                const outputAfterError = await this.pyodide.runPythonAsync('_capture.get_output()');

                throw new Error(error || runError.message);
            }

            // 停止捕获
            await this.pyodide.runPythonAsync('_capture.stop()');

            // 获取输出
            output = await this.pyodide.runPythonAsync('_capture.get_output()');
            errorOutput = await this.pyodide.runPythonAsync('_capture.get_error()');

            const executionTime = Date.now() - startTime;

            // 检查是否有大数据运算警告
            if (executionTime > 5000) {
                onProgress?.({ type: 'lag-warning', time: executionTime });
            }

            if (errorOutput) {
                return {
                    success: false,
                    output: output,
                    error: errorOutput,
                    executionTime
                };
            }

            return {
                success: true,
                output: output,
                error: null,
                executionTime
            };

        } catch (error) {
            // 确保停止捕获
            try {
                await this.pyodide.runPythonAsync('_capture.stop()');
            } catch (e) {}

            return {
                success: false,
                output: output,
                error: error.message,
                executionTime: 0
            };
        }
    }

    /**
     * 加载额外的Python包
     * @param {string|string[]} packages - 包名
     */
    async loadPackage(packages) {
        if (!this.isReady) {
            await this.init();
        }

        const pkgs = Array.isArray(packages) ? packages : [packages];
        this.onProgress({ status: 'loading', message: `正在加载 ${pkgs.join(', ')}...` });

        try {
            await this.pyodide.loadPackage(pkgs);
            this.onProgress({ status: 'ready', message: '包加载完成' });
        } catch (error) {
            console.error('包加载失败:', error);
            throw error;
        }
    }

    /**
     * 检查是否就绪
     * @returns {boolean}
     */
    checkReady() {
        return this.isReady;
    }

    /**
     * 中断当前执行
     */
    interrupt() {
        // Pyodide不支持真正的中断，这里只是标记
        if (this.currentRunPromise) {
            this.currentRunPromise.cancel?.();
        }
    }
}

/**
 * 全局Pyodide运行器实例
 */
let globalPyodideRunner = null;

/**
 * 获取全局Pyodide运行器
 * @returns {PyodideRunner}
 */
function getPyodideRunner() {
    if (!globalPyodideRunner) {
        globalPyodideRunner = new PyodideRunner(
            (progress) => {
                // 更新状态指示器
                const indicator = document.getElementById('statusIndicator');
                const statusText = document.getElementById('statusText');
                if (indicator && statusText) {
                    if (progress.status === 'loading') {
                        indicator.className = 'status-indicator loading';
                        statusText.textContent = progress.message;
                    } else if (progress.status === 'ready') {
                        indicator.className = 'status-indicator';
                        statusText.textContent = '就绪';
                    } else if (progress.status === 'error') {
                        indicator.className = 'status-indicator error';
                        statusText.textContent = '错误';
                    }
                }
            }
        );
    }
    return globalPyodideRunner;
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PyodideRunner, getPyodideRunner };
}
