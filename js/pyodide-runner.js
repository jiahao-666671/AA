/**
 * Pyodide Runner - Python运行环境和执行管理
 * 使用Pyodide在浏览器中运行Python代码
 */

const PyodideRunner = {
  // Pyodide实例
  pyodide: null,
  
  // 初始化状态
  initialized: false,
  initializing: false,
  
  // 运行状态
  isRunning: false,
  
  // 启动提示元素
  loadingElement: null,
  lagWarningElement: null,
  
  // 大数据检测阈值（字符数）
  LARGE_DATA_THRESHOLD: 100000,

  /**
   * 初始化Pyodide
   * @returns {Promise<Pyodide>}
   */
  async init() {
    if (this.initialized) {
      return this.pyodide;
    }
    
    if (this.initializing) {
      // 等待初始化完成
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (this.initialized) {
            clearInterval(checkInterval);
            resolve(this.pyodide);
          }
        }, 100);
      });
    }
    
    this.initializing = true;
    this.showLoading(true);
    
    try {
      // 加载Pyodide
      this.pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
      });
      
      // 预加载pandas（这会显著提升首次运行速度）
      this.showStatus('正在加载pandas库...');
      await this.pyodide.loadPackage(['pandas', 'numpy']);
      
      this.initialized = true;
      this.initializing = false;
      this.showLoading(false);
      console.log('Pyodide初始化完成，pandas已预加载');
      
      return this.pyodide;
    } catch (error) {
      this.initializing = false;
      this.showLoading(false);
      console.error('Pyodide初始化失败:', error);
      throw error;
    }
  },

  /**
   * 运行Python代码
   * @param {string} code - Python代码
   * @returns {Promise<{success: boolean, output: string, error: string}>}
   */
  async run(code) {
    if (this.isRunning) {
      return { success: false, output: '', error: '上一次运行尚未完成' };
    }
    
    // 确保已初始化
    if (!this.initialized) {
      await this.init();
    }
    
    this.isRunning = true;
    
    // 检测大数据代码
    if (this.isLargeDataOperation(code)) {
      this.showLagWarning();
    }
    
    try {
      // 设置标准输出捕获
      let stdout = '';
      let stderr = '';
      
      this.pyodide.setStdout({
        batched: (text) => {
          stdout += text + '\n';
        }
      });
      
      this.pyodide.setStderr({
        batched: (text) => {
          stderr += text + '\n';
        }
      });
      
      // 执行代码
      const startTime = performance.now();
      await this.pyodide.runPythonAsync(code);
      const endTime = performance.now();
      
      this.hideLagWarning();
      this.isRunning = false;
      
      // 如果有错误
      if (stderr) {
        return { 
          success: false, 
          output: stdout, 
          error: this.formatError(stderr) 
        };
      }
      
      return { 
        success: true, 
        output: stdout.trim() || '运行成功（无输出）', 
        error: '' 
      };
      
    } catch (error) {
      this.isRunning = false;
      this.hideLagWarning();
      return { 
        success: false, 
        output: '', 
        error: this.formatError(error.message || String(error)) 
      };
    }
  },

  /**
   * 检测是否是大数据操作
   * @param {string} code - 代码
   * @returns {boolean}
   */
  isLargeDataOperation(code) {
    // 检查是否有大循环或大数据处理
    const largePatterns = [
      /for\s+\w+\s+in\s+range\s*\(\s*\d{6,}\s*\)/,  // 大范围循环
      /for\s+\w+\s+in\s+\w+\s*:[\s\S]{500,}/,        // 大循环体
      /DataFrame.*shape.*\[.*[5-9]\d{4,}/,           // 大DataFrame
      /\.apply\(.*lambda.*\)/,                      // apply操作
      /merge\(.*\)/,                                 // merge操作
      /concat\(.*\)/,                               // concat操作
    ];
    
    return largePatterns.some(pattern => pattern.test(code));
  },

  /**
   * 格式化错误信息
   * @param {string} error - 原始错误
   * @returns {string}
   */
  formatError(error) {
    // 简化Python错误追踪
    const lines = error.split('\n');
    const simplified = [];
    let skipUntilTraceback = true;
    
    for (const line of lines) {
      if (line.includes('Traceback') || line.includes('File "<exec>"')) {
        skipUntilTraceback = false;
        simplified.push('错误:');
        continue;
      }
      
      if (skipUntilTraceback) continue;
      
      if (line.trim()) {
        simplified.push(line.replace(/File ".*", line (\d+), in/, '第$1行:'));
      }
    }
    
    return simplified.slice(0, 10).join('\n') || error;
  },

  /**
   * 显示加载状态
   * @param {boolean} show 
   */
  showLoading(show) {
    if (show) {
      if (!this.loadingElement) {
        this.loadingElement = document.createElement('div');
        this.loadingElement.className = 'lag-warning';
        this.loadingElement.innerHTML = `
          <span class="loading-spinner"></span>
          <span>Python环境初始化中...</span>
        `;
        document.body.appendChild(this.loadingElement);
      }
      this.loadingElement.style.display = 'flex';
    } else if (this.loadingElement) {
      this.loadingElement.style.display = 'none';
    }
  },

  /**
   * 显示状态文本
   * @param {string} text 
   */
  showStatus(text) {
    if (this.loadingElement) {
      this.loadingElement.querySelector('span:last-child').textContent = text;
    }
  },

  /**
   * 显示卡顿警告
   */
  showLagWarning() {
    if (!this.lagWarningElement) {
      this.lagWarningElement = document.createElement('div');
      this.lagWarningElement.className = 'lag-warning';
      this.lagWarningElement.innerHTML = `
        <span>⚡</span>
        <span>检测到大数据操作，可能需要几秒钟...</span>
      `;
      document.body.appendChild(this.lagWarningElement);
    }
    this.lagWarningElement.style.display = 'flex';
  },

  /**
   * 隐藏卡顿警告
   */
  hideLagWarning() {
    if (this.lagWarningElement) {
      this.lagWarningElement.style.display = 'none';
    }
  },

  /**
   * 导入电商数据集
   * @returns {Promise<Object>} 包含orders和products的字典
   */
  async loadEcommerceDataset() {
    // 生成模拟电商数据
    const generateData = `
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 设置随机种子
np.random.seed(42)

# 生成订单数据
n_orders = 1000
start_date = datetime(2024, 1, 1)

orders_data = {
    'order_id': [f'ORD{str(i).zfill(6)}' for i in range(1, n_orders + 1)],
    'customer_id': np.random.randint(1, 201, n_orders),
    'product_id': np.random.randint(1, 51, n_orders),
    'quantity': np.random.randint(1, 5, n_orders),
    'unit_price': np.round(np.random.uniform(10, 500, n_orders), 2),
    'order_date': [(start_date + timedelta(days=np.random.randint(0, 180))).strftime('%Y-%m-%d') for _ in range(n_orders)],
    'status': np.random.choice(['已完成', '已发货', '处理中', '已取消'], n_orders, p=[0.6, 0.2, 0.15, 0.05]),
    'payment_method': np.random.choice(['微信', '支付宝', '银行卡', '信用卡'], n_orders, p=[0.4, 0.35, 0.15, 0.1]),
    'region': np.random.choice(['华东', '华南', '华北', '华中', '西南', '西北'], n_orders, p=[0.3, 0.25, 0.2, 0.1, 0.1, 0.05])
}

orders = pd.DataFrame(orders_data)
orders['total_amount'] = orders['quantity'] * orders['unit_price']
orders['order_date'] = pd.to_datetime(orders['order_date'])

# 生成商品数据
n_products = 50
products_data = {
    'product_id': list(range(1, n_products + 1)),
    'product_name': [f'商品{i}' for i in range(1, n_products + 1)],
    'category': np.random.choice(['电子产品', '服装', '食品', '家居', '美妆'], n_products, p=[0.25, 0.25, 0.2, 0.15, 0.15]),
    'brand': np.random.choice(['品牌A', '品牌B', '品牌C', '品牌D', '品牌E'], n_products),
    'cost': np.round(np.random.uniform(5, 200, n_products), 2),
}

products = pd.DataFrame(products_data)

# 将数据存入全局变量
import js
js.orders_df = orders
js.products_df = products
js.orders = orders.to_dict('records')
js.products = products.to_dict('records')
`;
    
    await this.run(generateData);
    
    return {
      orders: window.orders || [],
      products: window.products || []
    };
  },

  /**
   * 获取运行状态
   * @returns {boolean}
   */
  checkRunning() {
    return this.isRunning;
  },

  /**
   * 停止运行（如果支持）
   */
  async stop() {
    // Pyodide不支持强制停止，这里只是设置标志
    this.isRunning = false;
  }
};

// 导出模块
window.PyodideRunner = PyodideRunner;
