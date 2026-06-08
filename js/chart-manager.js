/**
 * Chart Manager - 图表管理模块
 * 使用Chart.js生成学习统计可视化图表
 */

const ChartManager = {
  // Chart.js实例存储
  charts: new Map(),
  
  // 颜色配置
  colors: {
    primary: '#3B82F6',
    primaryLight: 'rgba(59, 130, 246, 0.2)',
    success: '#10B981',
    successLight: 'rgba(16, 185, 129, 0.2)',
    warning: '#F59E0B',
    warningLight: 'rgba(245, 158, 11, 0.2)',
    error: '#EF4444',
    errorLight: 'rgba(239, 68, 68, 0.2)',
    purple: '#8B5CF6',
    pink: '#EC4899'
  },

  /**
   * 初始化Chart.js（如果尚未初始化）
   */
  ensureInit() {
    if (typeof Chart === 'undefined') {
      console.error('Chart.js未加载');
      return false;
    }
    // 设置全局配置
    Chart.defaults.font.family = "'Noto Sans SC', system-ui, sans-serif";
    Chart.defaults.color = '#64748B';
    return true;
  },

  /**
   * 创建环形进度图
   * @param {string} canvasId - Canvas元素ID
   * @param {number} value - 当前值
   * @param {number} max - 最大值
   * @param {string} label - 标签文字
   * @param {string} color - 颜色
   * @returns {Chart}
   */
  createDoughnutChart(canvasId, value, max, label, color = null) {
    if (!this.ensureInit()) return null;
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error('Canvas元素不存在:', canvasId);
      return null;
    }
    
    // 销毁已存在的图表
    if (this.charts.has(canvasId)) {
      this.charts.get(canvasId).destroy();
    }
    
    const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
    const chartColor = color || this.colors.primary;
    
    const chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['已完成', '未完成'],
        datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: [chartColor, '#E2E8F0'],
          borderWidth: 0,
          cutout: '75%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                if (context.dataIndex === 0) {
                  return `已完成: ${value}/${max} (${percentage}%)`;
                }
                return '';
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          duration: 1000
        }
      },
      // 插件：在中心显示文字
      plugins: [{
        id: 'centerText',
        afterDraw: (chart) => {
          const ctx = chart.ctx;
          const centerX = chart.width / 2;
          const centerY = chart.height / 2;
          
          ctx.save();
          ctx.font = 'bold 24px "Noto Sans SC"';
          ctx.fillStyle = chartColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(value, centerX, centerY - 5);
          
          ctx.font = '12px "Noto Sans SC"';
          ctx.fillStyle = '#94A3B8';
          ctx.fillText(label, centerX, centerY + 18);
          
          ctx.restore();
        }
      }]
    });
    
    this.charts.set(canvasId, chart);
    return chart;
  },

  /**
   * 创建柱状图
   * @param {string} canvasId - Canvas元素ID
   * @param {Array} labels - 标签数组
   * @param {Array} values - 值数组
   * @param {Object} options - 配置选项
   * @returns {Chart}
   */
  createBarChart(canvasId, labels, values, options = {}) {
    if (!this.ensureInit()) return null;
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error('Canvas元素不存在:', canvasId);
      return null;
    }
    
    if (this.charts.has(canvasId)) {
      this.charts.get(canvasId).destroy();
    }
    
    const color = options.color || this.colors.primary;
    
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: options.label || '数据',
          data: values,
          backgroundColor: color,
          borderRadius: 8,
          barThickness: options.barThickness || 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: options.tooltip !== false ? {
            backgroundColor: '#1E293B',
            titleColor: '#F1F5F9',
            bodyColor: '#F1F5F9',
            padding: 12,
            cornerRadius: 8
          } : false
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94A3B8' }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#E2E8F0' },
            ticks: { color: '#94A3B8' }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    });
    
    this.charts.set(canvasId, chart);
    return chart;
  },

  /**
   * 创建折线图
   * @param {string} canvasId - Canvas元素ID
   * @param {Array} labels - 标签数组
   * @param {Array} values - 值数组
   * @param {Object} options - 配置选项
   * @returns {Chart}
   */
  createLineChart(canvasId, labels, values, options = {}) {
    if (!this.ensureInit()) return null;
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error('Canvas元素不存在:', canvasId);
      return null;
    }
    
    if (this.charts.has(canvasId)) {
      this.charts.get(canvasId).destroy();
    }
    
    const color = options.color || this.colors.primary;
    
    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: options.label || '数据',
          data: values,
          borderColor: color,
          backgroundColor: color.replace(')', ', 0.1)').replace('rgb', 'rgba'),
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            titleColor: '#F1F5F9',
            bodyColor: '#F1F5F9',
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94A3B8' }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#E2E8F0' },
            ticks: { color: '#94A3B8' }
          }
        },
        animation: {
          duration: 1000
        }
      }
    });
    
    this.charts.set(canvasId, chart);
    return chart;
  },

  /**
   * 更新图表数据
   * @param {string} canvasId - Canvas元素ID
   * @param {Array} values - 新值数组
   */
  updateChart(canvasId, values) {
    const chart = this.charts.get(canvasId);
    if (chart) {
      chart.data.datasets[0].data = values;
      chart.update();
    }
  },

  /**
   * 销毁图表
   * @param {string} canvasId - Canvas元素ID
   */
  destroyChart(canvasId) {
    const chart = this.charts.get(canvasId);
    if (chart) {
      chart.destroy();
      this.charts.delete(canvasId);
    }
  },

  /**
   * 销毁所有图表
   */
  destroyAll() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }
};

// 导出模块
window.ChartManager = ChartManager;
