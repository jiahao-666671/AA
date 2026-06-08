/**
 * Quiz.js - 题库页面逻辑，支持每道题目独立的内嵌编辑器
 */

const QuizPage = {
  // 当前模式：practice练习 | wrong错题
  mode: 'practice',

  // 所有题库数据
  allQuizzes: [],

  // 用户答案和答题记录
  userAnswers: {},
  quizResults: {},

  /**
   * 初始化题库页面
   */
  init() {
    // 应用主题
    this.applyTheme();

    // 解析URL参数
    this.parseUrlParams();

    // 收集所有题目
    this.collectAllQuizzes();

    // 渲染界面
    this.render();

    // 绑定事件
    this.bindEvents();

    // 初始化Pyodide
    this.initPyodide();
  },

  /**
   * 应用主题
   */
  applyTheme() {
    const theme = StorageManager.getTheme();
    document.documentElement.setAttribute('data-theme', theme);
  },

  /**
   * 解析URL参数
   */
  parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'wrong') {
      this.mode = 'wrong';
    } else {
      this.mode = 'practice';
    }
  },

  /**
   * 收集所有题目
   */
  collectAllQuizzes() {
    this.allQuizzes = [];
    window.COURSES.forEach(chapter => {
      if (chapter.quizzes && chapter.quizzes.length > 0) {
        chapter.quizzes.forEach(quiz => {
          this.allQuizzes.push({
            ...quiz,
            chapterTitle: chapter.title
          });
        });
      }
    });
  },

  /**
   * 渲染页面
   */
  render() {
    // 渲染模式切换
    this.renderModeToggle();

    // 根据模式渲染内容
    if (this.mode === 'wrong') {
      this.renderWrongList();
    } else {
      this.renderQuizList();
    }

    // 统计数据
    this.renderStats();
  },

  /**
   * 渲染模式切换
   */
  renderModeToggle() {
    const container = document.getElementById('mode-toggle');
    if (!container) return;

    const wrongCount = StorageManager.getWrongAnswers().length;
    container.innerHTML = `
      <a href="quiz.html" class="btn ${this.mode === 'practice' ? 'btn-primary' : 'btn-secondary'}">
        练习模式
      </a>
      <a href="quiz.html?mode=wrong" class="btn ${this.mode === 'wrong' ? 'btn-primary' : 'btn-secondary'}">
        错题本 (${wrongCount})
      </a>
    `;
  },

  /**
   * 渲染统计
   */
  renderStats() {
    const total = this.allQuizzes.length;
    const completedCount = Object.keys(StorageManager.getAll().codes).length;
    const avgScore = StorageManager.getAverageScore();

    document.getElementById('total-quiz-count').textContent = total;
    document.getElementById('completed-quiz-count').textContent = completedCount;
    document.getElementById('quiz-accuracy').textContent = avgScore + '%';
  },

  /**
   * 渲染题目列表
   */
  renderQuizList() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    if (this.allQuizzes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <div class="empty-state-title">暂无题目</div>
          <div class="empty-state-description">课程内容正在更新中</div>
        </div>
      `;
      return;
    }

    container.innerHTML = this.allQuizzes.map((quiz, index) => `
      <div class="card quiz-card" data-quiz-index="${index}" data-quiz-id="${quiz.id}">
        <div class="card-header">
          <div>
            <span class="text-muted">${quiz.chapterTitle}</span>
            <span class="quiz-number">第${index + 1}题</span>
          </div>
          <span class="quiz-status ${this.quizResults[quiz.id] ? 'answered' : ''}" id="status-${quiz.id}">
            ${this.quizResults[quiz.id] ? (this.quizResults[quiz.id] === true ? '✓ 正确' : '✗ 错误') : '未答'}
          </span>
        </div>
        <div class="card-body">
          <p class="quiz-question-text">${quiz.question}</p>

          <!-- 选项（如果是选择题） -->
          ${quiz.options ? `
            <div class="quiz-options">
              ${quiz.options.map((opt, optIndex) => `
                <div class="quiz-option" data-option-index="${optIndex}" data-quiz-id="${quiz.id}">
                  <span class="quiz-option-letter">${String.fromCharCode(65 + optIndex)}</span>
                  <span class="quiz-option-text">${opt}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- 代码编辑器 -->
          <div class="mt-md" id="editor-${quiz.id}"></div>

          <!-- 代码运行结果 -->
          <div class="editor-output" id="output-${quiz.id}" style="display: none;">
            <div class="editor-output-header">
              <span class="editor-output-title">运行结果</span>
            </div>
            <pre class="editor-output-content">等待运行...</pre>
          </div>
        </div>

        <div class="card-footer quiz-footer" id="footer-${quiz.id}" style="display: none;">
          <div class="quiz-result" id="result-${quiz.id}"></div>
          <div class="quiz-explanation" id="explanation-${quiz.id}" style="display: none;">
            <h4>解题思路</h4>
            <p>${quiz.explanation || '暂无解析'}</p>
          </div>
          <div class="quiz-solution" id="solution-${quiz.id}" style="display: none;">
            <h4>参考答案</h4>
            <pre><code>${this.escapeHtml(quiz.solution || '')}</code></pre>
          </div>
        </div>
      </div>
    `).join('');

    // 初始化每道题的编辑器
    this.allQuizzes.forEach(quiz => {
      this.initQuizEditor(quiz);
    });

    // 绑定题目选项点击
    this.bindQuizCardEvents();
  },

  /**
   * 渲染错题列表
   */
  renderWrongList() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const wrongAnswers = StorageManager.getWrongAnswers();

    if (wrongAnswers.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div class="empty-state-title">太棒了！</div>
          <div class="empty-state-description">目前没有错题，继续保持！</div>
          <a href="quiz.html" class="btn btn-primary mt-md">去练习</a>
        </div>
      `;
      return;
    }

    // 按题目分组
    const grouped = {};
    wrongAnswers.forEach(w => {
      if (!grouped[w.quizId]) grouped[w.quizId] = [];
      grouped[w.quizId].push(w);
    });

    // 找到对应题目信息
    const wrongQuizzes = [];
    for (const quizId in grouped) {
      const quiz = this.allQuizzes.find(q => q.id === quizId);
      if (quiz) {
        wrongQuizzes.push({
          ...quiz,
          wrongCount: grouped[quizId].length
        });
      }
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">错题复习</h3>
          <button class="btn btn-secondary btn-sm" id="clear-wrong">
            清空错题本
          </button>
        </div>
        <div class="card-body">
          ${wrongQuizzes.map(quiz => `
            <div class="wrong-quiz-item" data-quiz-id="${quiz.id}">
              <div class="wrong-quiz-question">
                <strong>${quiz.question}</strong>
                <span class="text-muted ml-md">错误${quiz.wrongCount}次</span>
              </div>
              <div class="quiz-explanation">
                <details>
                  <summary>查看解题思路</summary>
                  <p>${quiz.explanation || '暂无解析'}</p>
                </details>
              </div>
              <div class="mt-sm">
                <a href="quiz.html" class="btn btn-sm btn-secondary">去练习</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // 绑定清空按钮
    const clearBtn = document.getElementById('clear-wrong');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('确定要清空错题本吗？')) {
          StorageManager.clearWrongAnswers();
          Toast.show('错题本已清空', 'success');
          this.render();
        }
      });
    }
  },

  /**
   * 初始化单个题目的编辑器
   */
  initQuizEditor(quiz) {
    const containerId = `editor-${quiz.id}`;
    const container = document.getElementById(containerId);
    if (!container) return;

    // 获取保存的代码或者模板代码
    const savedCode = StorageManager.getCode(quiz.id);
    const initialCode = savedCode || quiz.templateCode || '# 请输入代码';

    // 创建编辑器
    EditorComponent.create(containerId, {
      initialCode,
      lessonId: quiz.id,
      onRun: async (code, result) => {
        // 运行后自动保存
        StorageManager.saveCode(quiz.id, code);
        // 这里简单标记已尝试
        if (!this.quizResults[quiz.id]) {
          document.getElementById(`status-${quiz.id}`).textContent = '已尝试';
        }
      },
      outputId: `output-${quiz.id}`
    });

    // 绑定查看答案按钮
    setTimeout(() => {
      const footer = document.getElementById(`footer-${quiz.id}`);
      if (footer) {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'mt-sm';
        btnContainer.innerHTML = `
          <button class="btn btn-ghost btn-sm show-solution" data-quiz-id="${quiz.id}">
            查看答案
          </button>
        `;
        footer.appendChild(btnContainer);

        btnContainer.querySelector('.show-solution').addEventListener('click', () => {
          const solution = document.getElementById(`solution-${quiz.id}`);
          const explanation = document.getElementById(`explanation-${quiz.id}`);
          solution.style.display = solution.style.display === 'none' ? 'block' : 'none';
          explanation.style.display = explanation.style.display === 'none' ? 'block' : 'none';
        });
      }
    }, 100);
  },

  /**
   * 绑定题目卡片事件
   */
  bindQuizCardEvents() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        const quizId = option.dataset.quizId;
        const optionIndex = parseInt(option.dataset.optionIndex);
        const quiz = this.allQuizzes.find(q => q.id === quizId);

        if (!quiz || !quiz.options) return;

        const allOptions = document.querySelectorAll(`.quiz-option[data-quiz-id="${quizId}"]`);
        allOptions.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
        option.classList.add('selected');

        const footer = document.getElementById(`footer-${quizId}`);
        const resultDiv = document.getElementById(`result-${quizId}`);
        const statusDiv = document.getElementById(`status-${quizId}`);

        if (footer) footer.style.display = 'block';

        const isCorrect = quiz.correctAnswer === optionIndex;
        this.quizResults[quizId] = isCorrect;

        // 标记正确选项
        allOptions.forEach((o, i) => {
          if (i === quiz.correctAnswer) o.classList.add('correct');
        });
        if (!isCorrect) option.classList.add('incorrect');

        if (resultDiv) {
          resultDiv.innerHTML = isCorrect ?
            '<span class="text-success">✓ 回答正确！</span>' :
            '<span class="text-error">✗ 回答错误</span>';
        }

        if (statusDiv) {
          statusDiv.textContent = isCorrect ? '✓ 正确' : '✗ 错误';
          statusDiv.className = `quiz-status ${isCorrect ? 'correct' : 'incorrect'}`;
        }

        // 错题记录
        if (!isCorrect) {
          StorageManager.addWrongAnswer(quizId, '');
        }

        // 显示解析
        const explanationDiv = document.getElementById(`explanation-${quizId}`);
        if (explanationDiv) explanationDiv.style.display = 'block';
      });
    });
  },

  /**
   * 绑定其他事件
   */
  bindEvents() {
    // 主题切换
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        StorageManager.toggleTheme();
        Toast.show('已切换主题', 'success');
      });
    }

    // 侧边栏折叠
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }
  },

  /**
   * 初始化Pyodide
   */
  async initPyodide() {
    try {
      await PyodideRunner.init();
    } catch (e) {
      console.log('Pyodide will init on first run');
    }
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

document.addEventListener('DOMContentLoaded', () => {
  QuizPage.init();
});

window.QuizPage = QuizPage;
