/**
 * Main.js - 首页逻辑
 * 学习统计看板展示
 */

const MainPage = {
  /**
   * 初始化首页
   */
  init() {
    // 应用保存的主题
    this.applyTheme();
    
    // 初始化Pyodide（后台预加载）
    this.initPyodide();
    
    // 渲染统计看板
    this.renderStats();
    
    // 渲染快捷入口
    this.renderQuickLinks();
    
    // 绑定主题切换
    this.bindThemeToggle();
    
    // 绑定导入导出
    this.bindDataManagement();
    
    // 更新学习时长
    this.startStudyTimer();
  },

  /**
   * 应用保存的主题
   */
  applyTheme() {
    const theme = StorageManager.getTheme();
    document.documentElement.setAttribute('data-theme', theme);
  },

  /**
   * 初始化Pyodide（后台预加载）
   */
  async initPyodide() {
    try {
      await PyodideRunner.init();
    } catch (error) {
      console.log('Pyodide预加载失败，将在首次运行时重新加载');
    }
  },

  /**
   * 渲染统计看板
   */
  renderStats() {
    const stats = StorageManager.getStatistics();
    
    // 渲染统计卡片
    const statsGrid = document.getElementById('stats-grid');
    if (!statsGrid) return;
    
    statsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-label">已完成任务</div>
        <div class="stat-value">${stats.completedLessons}</div>
        <div class="stat-change positive">入门+实操+进阶</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">完成习题</div>
        <div class="stat-value">${stats.completedQuizzes}</div>
        <div class="stat-change">共${stats.totalQuizzes}道</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">平均得分</div>
        <div class="stat-value">${stats.averageScore}%</div>
        <div class="stat-change ${stats.averageScore >= 80 ? 'positive' : 'negative'}">
          ${stats.averageScore >= 80 ? '表现优秀' : '继续加油'}
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">累计学习</div>
        <div class="stat-value">${stats.formattedStudyTime}</div>
        <div class="stat-change">keep learning</div>
      </div>
    `;
    
    // 渲染环形进度图
    const totalTasks = 12; // 课程总任务数
    ChartManager.createDoughnutChart(
      'progress-chart',
      stats.completedLessons,
      totalTasks,
      '任务',
      '#3B82F6'
    );
    
    // 渲染做题正确率
    const correctRate = stats.averageScore;
    ChartManager.createDoughnutChart(
      'score-chart',
      correctRate,
      100,
      '得分',
      '#10B981'
    );
    
    // 渲染错题统计
    const wrongCount = stats.wrongAnswersCount;
    ChartManager.createDoughnutChart(
      'wrong-chart',
      Math.max(0, 10 - wrongCount),
      10,
      '正确',
      wrongCount > 5 ? '#EF4444' : '#F59E0B'
    );
  },

  /**
   * 渲染快捷入口
   */
  renderQuickLinks() {
    const container = document.getElementById('quick-links');
    if (!container) return;
    
    container.innerHTML = `
      <a href="course.html?chapter=1" class="card quick-link">
        <div class="quick-link-icon">📚</div>
        <div class="quick-link-title">入门篇</div>
        <div class="quick-link-desc">Python基础语法速成</div>
      </a>
      <a href="course.html?chapter=2" class="card quick-link">
        <div class="quick-link-icon">💼</div>
        <div class="quick-link-title">实操篇</div>
        <div class="quick-link-desc">pandas电商数据实战</div>
      </a>
      <a href="course.html?chapter=3" class="card quick-link">
        <div class="quick-link-icon">🚀</div>
        <div class="quick-link-title">进阶篇</div>
        <div class="quick-link-desc">高级数据分析技巧</div>
      </a>
      <a href="quiz.html" class="card quick-link">
        <div class="quick-link-icon">📝</div>
        <div class="quick-link-title">题库</div>
        <div class="quick-link-desc">巩固练习与测评</div>
      </a>
    `;
  },

  /**
   * 绑定主题切换
   */
  bindThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
      const newTheme = StorageManager.toggleTheme();
      Toast.show(`已切换到${newTheme === 'dark' ? '深色' : '浅色'}模式`, 'success');
    });
  },

  /**
   * 绑定数据管理（导入/导出）
   */
  bindDataManagement() {
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const importInput = document.getElementById('import-input');
    
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        StorageManager.exportData();
        Toast.show('学习进度已导出', 'success');
      });
    }
    
    if (importBtn && importInput) {
      importBtn.addEventListener('click', () => {
        importInput.click();
      });
      
      importInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
          await StorageManager.importData(file);
          Toast.show('进度导入成功', 'success');
          this.renderStats();
        } catch (error) {
          Toast.show(error.message, 'error');
        }
        
        // 清空input
        importInput.value = '';
      });
    }
  },

  /**
   * 开始学习计时器
   */
  startStudyTimer() {
    // 记录页面进入时间
    const startTime = Date.now();
    
    // 每分钟更新一次学习时长
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      StorageManager.addStudyTime(elapsed);
    }, 60000);
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  MainPage.init();
});

// 导出
window.MainPage = MainPage;
