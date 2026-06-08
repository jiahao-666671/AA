/**
 * Toast - 轻量级提示组件
 * 显示成功/错误/警告/信息提示
 */

const Toast = {
  container: null,
  
  /**
   * 显示Toast提示
   * @param {string} message - 提示文本
   * @param {string} type - 类型: success, error, warning, info
   * @param {number} duration - 显示时长(ms)
   */
  show(message, type = 'info', duration = 3000) {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${message}</span>
    `;
    
    this.container.appendChild(toast);
    
    // 自动移除
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  },
  
  /**
   * 成功提示
   */
  success(message, duration) {
    this.show(message, 'success', duration);
  },
  
  /**
   * 错误提示
   */
  error(message, duration) {
    this.show(message, 'error', duration);
  },
  
  /**
   * 警告提示
   */
  warning(message, duration) {
    this.show(message, 'warning', duration);
  },
  
  /**
   * 信息提示
   */
  info(message, duration) {
    this.show(message, 'info', duration);
  }
};

// 添加slideOut动画
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// 导出
window.Toast = Toast;
