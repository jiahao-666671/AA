/**
 * Tooltip Manager - 术语弹窗模块
 * 鼠标hover专业名词时显示解释弹窗
 */

const TooltipManager = {
  // tooltip元素
  tooltip: null,
  
  // 延迟配置
  SHOW_DELAY: 300,
  HIDE_DELAY: 200,
  
  // 定时器
  showTimer: null,
  hideTimer: null,

  /**
   * 初始化tooltip系统
   */
  init() {
    // 创建tooltip元素
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    this.tooltip.id = 'glossary-tooltip';
    document.body.appendChild(this.tooltip);
  },

  /**
   * 为元素绑定tooltip
   * @param {HTMLElement} element - 目标元素
   * @param {string} content - tooltip内容
   * @param {Object} options - 配置选项
   */
  bind(element, content, options = {}) {
    if (!this.tooltip) this.init();
    
    const config = {
      position: options.position || 'top', // top, bottom, left, right
      maxWidth: options.maxWidth || 300
    };
    
    element.addEventListener('mouseenter', (e) => {
      clearTimeout(this.hideTimer);
      this.showTimer = setTimeout(() => {
        this.show(e.target, content, config);
      }, this.SHOW_DELAY);
    });
    
    element.addEventListener('mouseleave', () => {
      clearTimeout(this.showTimer);
      this.hideTimer = setTimeout(() => {
        this.hide();
      }, this.HIDE_DELAY);
    });
  },

  /**
   * 显示tooltip
   * @param {HTMLElement} target - 目标元素
   * @param {string} content - 内容
   * @param {Object} config - 配置
   */
  show(target, content, config) {
    this.tooltip.textContent = content;
    this.tooltip.style.maxWidth = config.maxWidth + 'px';
    this.tooltip.className = `tooltip visible ${config.position}`;
    
    // 计算位置
    const rect = target.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    
    let top, left;
    
    switch (config.position) {
      case 'top':
        top = rect.top - tooltipRect.height - 10;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = rect.bottom + 10;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        this.tooltip.classList.remove('top');
        break;
      case 'left':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.left - tooltipRect.width - 10;
        break;
      case 'right':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.right + 10;
        break;
    }
    
    // 确保不超出视口
    const padding = 10;
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
    
    this.tooltip.style.top = top + 'px';
    this.tooltip.style.left = left + 'px';
  },

  /**
   * 隐藏tooltip
   */
  hide() {
    this.tooltip.classList.remove('visible');
  },

  /**
   * 扫描页面内容，自动为带data-term属性的元素绑定tooltip
   * @param {string} containerSelector - 容器选择器
   * @param {Array} glossary - 术语表 [{term, definition}]
   */
  scanAndBind(containerSelector, glossary) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // 创建术语表查找
    const glossaryMap = new Map();
    glossary.forEach(item => {
      glossaryMap.set(item.term.toLowerCase(), item.definition);
    });
    
    // 查找所有带data-term属性的元素
    const elements = container.querySelectorAll('[data-term]');
    elements.forEach(el => {
      const term = el.getAttribute('data-term').toLowerCase();
      const definition = glossaryMap.get(term);
      if (definition) {
        this.bind(el, definition);
      }
    });
    
    // 也扫描普通文本，包装专业术语
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const terms = Array.from(glossaryMap.keys());
    let node;
    while (node = walker.nextNode()) {
      terms.forEach(term => {
        if (node.textContent.toLowerCase().includes(term)) {
          // 找到包含术语的文本节点，替换为带tooltip的元素
          const regex = new RegExp(`\\b(${term})\\b`, 'gi');
          if (regex.test(node.textContent)) {
            const parent = node.parentNode;
            if (parent && !parent.classList.contains('term-highlight')) {
              // 简化处理：只标记，不替换节点
              // 实际应用中可以使用更复杂的DOM操作
            }
          }
        }
      });
    }
  },

  /**
   * 销毁tooltip
   */
  destroy() {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }
};

// 导出模块
window.TooltipManager = TooltipManager;
