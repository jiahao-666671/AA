/**
 * 代码编辑器组件
 * 基于CodeMirror 5的封装
 */

/**
 * 代码编辑器类
 */
class CodeEditor {
    /**
     * @param {HTMLElement|string} container - 容器元素或选择器
     * @param {Object} options - 配置选项
     */
    constructor(container, options = {}) {
        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        if (!this.container) {
            throw new Error('编辑器容器不存在');
        }

        this.options = {
            theme: 'default',
            mode: 'python',
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            lineWrapping: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            ...options
        };

        this.editor = null;
        this.init();
    }

    /**
     * 初始化编辑器
     */
    init() {
        // 检查CodeMirror是否已加载
        if (typeof CodeMirror === 'undefined') {
            console.error('CodeMirror未加载');
            return;
        }

        // 创建textarea
        const textarea = document.createElement('textarea');
        textarea.id = 'codeMirror_' + Date.now();
        this.container.innerHTML = '';
        this.container.appendChild(textarea);

        // 初始化CodeMirror
        this.editor = CodeMirror.fromTextArea(textarea, {
            mode: this.options.mode,
            theme: this.options.theme,
            lineNumbers: this.options.lineNumbers,
            indentUnit: this.options.indentUnit,
            tabSize: this.options.tabSize,
            indentWithTabs: this.options.indentWithTabs,
            lineWrapping: this.options.lineWrapping,
            autoCloseBrackets: this.options.autoCloseBrackets,
            matchBrackets: this.options.matchBrackets,
            placeholder: '# 在这里编写Python代码...'
        });

        // 设置默认高度
        this.editor.setSize('100%', '100%');

        // 应用主题
        this.applyTheme();
    }

    /**
     * 应用当前主题
     */
    applyTheme() {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        if (theme === 'dark' && this.editor) {
            this.editor.setOption('theme', 'material-darker');
        } else if (this.editor) {
            this.editor.setOption('theme', 'default');
        }
    }

    /**
     * 获取编辑器内容
     * @returns {string}
     */
    getValue() {
        return this.editor ? this.editor.getValue() : '';
    }

    /**
     * 设置编辑器内容
     * @param {string} code - 代码内容
     */
    setValue(code) {
        if (this.editor) {
            this.editor.setValue(code || '');
        }
    }

    /**
     * 在光标位置插入文本
     * @param {string} text - 要插入的文本
     */
    insertText(text) {
        if (this.editor) {
            const cursor = this.editor.getCursor();
            this.editor.replaceRange(text, cursor);
        }
    }

    /**
     * 格式化代码（简单格式化）
     */
    formatCode() {
        if (!this.editor) return;

        const code = this.getValue();
        // 简单的代码格式化
        let formatted = this.basicFormat(code);
        this.setValue(formatted);
    }

    /**
     * 基础代码格式化
     * @private
     */
    basicFormat(code) {
        // 移除多余空白
        let result = code.split('\n')
            .map(line => line.trimEnd())
            .join('\n');

        // 规范化空行
        result = result.replace(/\n{3,}/g, '\n\n');

        return result;
    }

    /**
     * 清空编辑器
     */
    clear() {
        this.setValue('');
    }

    /**
     * 重置为模板代码
     * @param {string} template - 模板代码
     */
    reset(template) {
        this.setValue(template || '');
    }

    /**
     * 调整编辑器高度
     * @param {number} height - 高度(px)
     */
    resize(height) {
        if (this.editor) {
            this.editor.setSize('100%', height + 'px');
        }
    }

    /**
     * 聚焦编辑器
     */
    focus() {
        if (this.editor) {
            this.editor.focus();
        }
    }

    /**
     * 获取当前光标位置
     * @returns {Object} {line, ch}
     */
    getCursor() {
        return this.editor ? this.editor.getCursor() : { line: 0, ch: 0 };
    }

    /**
     * 设置光标位置
     * @param {number} line - 行号
     * @param {number} ch - 列号
     */
    setCursor(line, ch) {
        if (this.editor) {
            this.editor.setCursor(line, ch);
        }
    }

    /**
     * 滚动到指定行
     * @param {number} line - 行号
     */
    scrollToLine(line) {
        if (this.editor) {
            this.editor.scrollIntoView({ line, ch: 0 });
        }
    }

    /**
     * 销毁编辑器
     */
    destroy() {
        if (this.editor) {
            this.editor.toTextArea();
            this.editor = null;
        }
    }

    /**
     * 监听事件
     * @param {string} event - 事件名
     * @param {Function} callback - 回调函数
     */
    on(event, callback) {
        if (this.editor) {
            this.editor.on(event, callback);
        }
    }

    /**
     * 取消监听事件
     * @param {string} event - 事件名
     * @param {Function} callback - 回调函数
     */
    off(event, callback) {
        if (this.editor) {
            this.editor.off(event, callback);
        }
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeEditor;
}
