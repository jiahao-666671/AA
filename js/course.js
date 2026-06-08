/**
 * Course.js - 课程页面逻辑
 * 任务卡片渲染、编辑器集成
 */

const CoursePage = {
  // 当前章节和任务
  currentChapter: null,
  currentTask: null,
  currentEditor: null,

  /**
   * 初始化课程页面
   */
  init() {
    // 应用主题
    this.applyTheme();
    
    // 初始化Pyodide
    this.initPyodide();
    
    // 解析URL参数
    this.parseUrlParams();
    
    // 渲染课程目录
    this.renderCourseSidebar();
    
    // 渲染辅助侧边栏
    this.renderNotesSidebar();
    
    // 绑定事件
    this.bindEvents();
    
    // 如果有指定任务则加载
    if (this.currentChapter && this.currentTask) {
      this.loadTask(this.currentChapter, this.currentTask);
    } else if (this.currentChapter) {
      this.loadChapter(this.currentChapter);
    } else {
      // 默认加载第一章
      this.loadChapter(1);
    }
  },

  /**
   * 应用主题
   */
  applyTheme() {
    const theme = StorageManager.getTheme();
    document.documentElement.setAttribute('data-theme', theme);
  },

  /**
   * 初始化Pyodide
   */
  async initPyodide() {
    try {
      await PyodideRunner.init();
    } catch (error) {
      console.error('Pyodide初始化失败:', error);
    }
  },

  /**
   * 解析URL参数
   */
  parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const chapter = params.get('chapter');
    const task = params.get('task');
    
    if (chapter) {
      this.currentChapter = parseInt(chapter);
    }
    if (task) {
      this.currentTask = task;
    }
  },

  /**
   * 渲染课程目录
   */
  renderCourseSidebar() {
    const sidebar = document.getElementById('course-sidebar');
    if (!sidebar) return;
    
    let html = '';
    
    COURSES.forEach((chapter, chapterIndex) => {
      const chapterNum = chapterIndex + 1;
      const isActive = this.currentChapter === chapterNum;
      const completedCount = chapter.tasks.filter(t => 
        StorageManager.isLessonCompleted(t.id)
      ).length;
      const totalCount = chapter.tasks.length;
      
      html += `
        <div class="course-chapter">
          <div class="chapter-header ${isActive ? 'expanded' : ''}" data-chapter="${chapterNum}">
            <span class="chapter-icon">▶</span>
            <span class="chapter-title">${chapter.icon} ${chapter.title}</span>
            <span class="chapter-progress">${completedCount}/${totalCount}</span>
          </div>
          <div class="chapter-lessons ${isActive ? 'expanded' : ''}">
            ${chapter.tasks.map(task => {
              const isTaskActive = this.currentTask === task.id;
              const isCompleted = StorageManager.isLessonCompleted(task.id);
              return `
                <a href="course.html?chapter=${chapterNum}&task=${task.id}" 
                   class="lesson-item ${isTaskActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"
                   data-lesson="${task.id}">
                  ${task.title}
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });
    
    sidebar.innerHTML = html;
  },

  /**
   * 渲染笔记侧边栏
   */
  renderNotesSidebar() {
    const notesArea = document.getElementById('global-notes');
    if (notesArea) {
      notesArea.value = StorageManager.getGlobalNote();
      notesArea.addEventListener('input', (e) => {
        StorageManager.saveGlobalNote(e.target.value);
      });
    }
    
    // 渲染代码片段
    const snippetsContainer = document.getElementById('code-snippets');
    if (snippetsContainer) {
      snippetsContainer.innerHTML = this.getCodeSnippetsHTML();
      this.bindSnippetCopy();
    }
    
    // 渲染电商指标
    const metricsContainer = document.getElementById('ecommerce-metrics');
    if (metricsContainer) {
      metricsContainer.innerHTML = this.getMetricsHTML();
    }
  },

  /**
   * 获取代码片段HTML
   */
  getCodeSnippetsHTML() {
    const snippets = [
      { name: '导入pandas', code: 'import pandas as pd' },
      { name: '读取CSV', code: 'df = pd.read_csv("file.csv")' },
      { name: '筛选行', code: 'df[df["col"] > value]' },
      { name: '分组聚合', code: 'df.groupby("col").agg({"val": "sum"})' },
      { name: '排序', code: 'df.sort_values("col", ascending=False)' },
      { name: '新增列', code: 'df["new_col"] = df["a"] + df["b"]' },
    ];
    
    return snippets.map(s => `
      <div class="snippet-item" data-code="${this.escapeHtml(s.code)}">
        <span class="snippet-name">${s.name}</span>
        <span class="snippet-copy">📋</span>
      </div>
    `).join('');
  },

  /**
   * 获取电商指标HTML
   */
  getMetricsHTML() {
    const metrics = [
      { name: 'GMV', formula: 'sum(订单金额)', desc: '成交总额' },
      { name: '客单价', formula: 'GMV / 订单数', desc: '平均订单金额' },
      { name: '毛利', formula: '销售额 - 成本', desc: '商品毛利' },
      { name: '毛利率', formula: '毛利 / 销售额 × 100%', desc: '盈利能力' },
      { name: '复购率', formula: '复购用户 / 总用户 × 100%', desc: '用户粘性' },
      { name: '转化率', formula: '下单用户 / 访客 × 100%', desc: '订单转化' },
    ];
    
    return `
      <table class="metrics-table">
        <thead>
          <tr>
            <th>指标</th>
            <th>公式</th>
          </tr>
        </thead>
        <tbody>
          ${metrics.map(m => `
            <tr>
              <td><strong>${m.name}</strong><br><small>${m.desc}</small></td>
              <td><code>${m.formula}</code></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  /**
   * 绑定代码片段复制
   */
  bindSnippetCopy() {
    const snippets = document.querySelectorAll('.snippet-item');
    snippets.forEach(item => {
      item.addEventListener('click', () => {
        const code = item.dataset.code;
        navigator.clipboard.writeText(code).then(() => {
          Toast.show('代码已复制', 'success');
        });
      });
    });
  },

  /**
   * 绑定事件
   */
  bindEvents() {
    // 侧边栏折叠
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        sidebar.classList.toggle('open');
      });
    }
    
    // 章节折叠
    document.addEventListener('click', (e) => {
      const header = e.target.closest('.chapter-header');
      if (header) {
        const lessons = header.nextElementSibling;
        header.classList.toggle('expanded');
        lessons.classList.toggle('expanded');
      }
    });
    
    // 主题切换
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        StorageManager.toggleTheme();
      });
    }
  },

  /**
   * 加载章节
   */
  loadChapter(chapterNum) {
    const chapter = COURSES[chapterNum - 1];
    if (!chapter) return;
    
    this.currentChapter = chapterNum;
    this.currentTask = null;
    
    const container = document.getElementById('task-container');
    if (!container) return;
    
    // 渲染章节概览
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">${chapter.icon} ${chapter.title}</h2>
        </div>
        <div class="card-body">
          <p class="task-content">${chapter.description}</p>
          <h3>本章节任务</h3>
          <ul class="task-list">
            ${chapter.tasks.map((task, i) => {
              const isCompleted = StorageManager.isLessonCompleted(task.id);
              return `
                <li class="task-list-item ${isCompleted ? 'completed' : ''}">
                  <a href="course.html?chapter=${chapterNum}&task=${task.id}">
                    <span class="task-number">${i + 1}</span>
                    <span class="task-title">${task.title}</span>
                    ${isCompleted ? '<span class="task-check">✓</span>' : ''}
                  </a>
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      </div>
    `;
    
    // 更新目录高亮
    this.updateSidebarHighlight();
  },

  /**
   * 加载任务
   */
  loadTask(chapterNum, taskId) {
    const chapter = COURSES[chapterNum - 1];
    if (!chapter) return;
    
    const task = chapter.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    this.currentChapter = chapterNum;
    this.currentTask = taskId;
    
    const container = document.getElementById('task-container');
    if (!container) return;
    
    // 获取保存的代码或使用模板
    const savedCode = StorageManager.getCode(taskId);
    const initialCode = savedCode || task.templateCode;
    
    // 渲染任务内容
    container.innerHTML = `
      <div class="card task-card">
        <div class="card-header">
          <div>
            <span class="text-muted">${chapter.title}</span>
            <h2 class="card-title">${task.title}</h2>
          </div>
          <button class="btn btn-success btn-sm" id="complete-btn">
            ${StorageManager.isLessonCompleted(taskId) ? '✓ 已完成' : '标记完成'}
          </button>
        </div>
        <div class="card-body">
          <div class="task-content">
            ${task.content}
          </div>
        </div>
      </div>
      
      <div id="editor-container" style="margin-top: var(--space-lg);"></div>
    `;
    
    // 扫描并绑定术语tooltip
    if (task.glossary && task.glossary.length > 0) {
      TooltipManager.scanAndBind('.task-content', task.glossary);
    }
    
    // 初始化编辑器
    this.initEditor('editor-container', {
      initialCode,
      lessonId: taskId,
      onRun: (code, result) => {
        // 可选：保存运行结果
        console.log('代码运行结果:', result);
      }
    });
    
    // 绑定完成按钮
    const completeBtn = document.getElementById('complete-btn');
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        StorageManager.completeLesson(taskId);
        Toast.show('任务完成！', 'success');
        completeBtn.innerHTML = '✓ 已完成';
        completeBtn.disabled = true;
        this.updateSidebarHighlight();
      });
    }
    
    // 更新URL
    const url = new URL(window.location);
    url.searchParams.set('chapter', chapterNum);
    url.searchParams.set('task', taskId);
    window.history.replaceState({}, '', url);
    
    // 更新侧边栏高亮
    this.updateSidebarHighlight();
  },

  /**
   * 初始化编辑器
   */
  initEditor(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 销毁已有编辑器
    if (this.currentEditor) {
      this.currentEditor.destroy();
    }
    
    // 创建新编辑器
    this.currentEditor = EditorComponent.create(container, options);
  },

  /**
   * 更新侧边栏高亮
   */
  updateSidebarHighlight() {
    // 更新章节展开状态
    document.querySelectorAll('.chapter-header').forEach(header => {
      const chapterNum = parseInt(header.dataset.chapter);
      if (chapterNum === this.currentChapter) {
        header.classList.add('expanded');
        header.nextElementSibling.classList.add('expanded');
      }
    });
    
    // 更新任务高亮
    document.querySelectorAll('.lesson-item').forEach(item => {
      if (item.dataset.lesson === this.currentTask) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  },

  /**
   * HTML转义
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  CoursePage.init();
});

// 导出
window.CoursePage = CoursePage;
