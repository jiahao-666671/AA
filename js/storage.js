/**
 * Storage Manager - localStorage 数据管理模块
 * 统一管理所有localStorage操作，提供进度、代码、笔记、主题的存取
 */

const StorageManager = {
  // localStorage key前缀
  STORAGE_KEY: 'python-learning',
  
  // 默认数据结构
  DEFAULT_DATA: {
    theme: 'light',
    progress: {
      completedLessons: [],
      completedQuizzes: []
    },
    codes: {},
    notes: {
      global: ''
    },
    wrongAnswers: [],
    quizScores: [],
    totalStudyTime: 0,
    lastVisit: null
  },

  /**
   * 获取所有存储数据
   * @returns {Object} 存储的数据对象
   */
  getAll() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return { ...this.DEFAULT_DATA };
    } catch (error) {
      console.error('读取存储数据失败:', error);
      return { ...this.DEFAULT_DATA };
    }
  },

  /**
   * 保存所有数据
   * @param {Object} data - 要保存的数据对象
   */
  saveAll(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('保存数据失败:', error);
    }
  },

  /**
   * 获取当前主题
   * @returns {string} 'light' 或 'dark'
   */
  getTheme() {
    const data = this.getAll();
    return data.theme || 'light';
  },

  /**
   * 设置主题
   * @param {string} theme - 'light' 或 'dark'
   */
  setTheme(theme) {
    const data = this.getAll();
    data.theme = theme;
    this.saveAll(data);
    // 立即应用主题
    document.documentElement.setAttribute('data-theme', theme);
  },

  /**
   * 切换主题
   */
  toggleTheme() {
    const current = this.getTheme();
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
    return next;
  },

  /**
   * 保存用户代码
   * @param {string} lessonId - 任务ID
   * @param {string} code - 代码内容
   */
  saveCode(lessonId, code) {
    const data = this.getAll();
    data.codes[lessonId] = code;
    this.saveAll(data);
  },

  /**
   * 读取用户代码
   * @param {string} lessonId - 任务ID
   * @returns {string|null} 保存的代码或null
   */
  getCode(lessonId) {
    const data = this.getAll();
    return data.codes[lessonId] || null;
  },

  /**
   * 保存学习进度
   * @param {Array<string>} completedLessons - 已完成的任务ID列表
   * @param {Array<string>} completedQuizzes - 已完成的题目ID列表
   */
  saveProgress(completedLessons, completedQuizzes) {
    const data = this.getAll();
    data.progress.completedLessons = completedLessons;
    data.progress.completedQuizzes = completedQuizzes;
    this.saveAll(data);
  },

  /**
   * 标记任务为完成
   * @param {string} lessonId - 任务ID
   */
  completeLesson(lessonId) {
    const data = this.getAll();
    if (!data.progress.completedLessons.includes(lessonId)) {
      data.progress.completedLessons.push(lessonId);
      this.saveAll(data);
    }
  },

  /**
   * 检查任务是否完成
   * @param {string} lessonId - 任务ID
   * @returns {boolean}
   */
  isLessonCompleted(lessonId) {
    const data = this.getAll();
    return data.progress.completedLessons.includes(lessonId);
  },

  /**
   * 保存全局笔记
   * @param {string} note - 笔记内容
   */
  saveGlobalNote(note) {
    const data = this.getAll();
    data.notes.global = note;
    this.saveAll(data);
  },

  /**
   * 获取全局笔记
   * @returns {string}
   */
  getGlobalNote() {
    const data = this.getAll();
    return data.notes.global || '';
  },

  /**
   * 保存任务专属笔记
   * @param {string} lessonId - 任务ID
   * @param {string} note - 笔记内容
   */
  saveLessonNote(lessonId, note) {
    const data = this.getAll();
    data.notes[lessonId] = note;
    this.saveAll(data);
  },

  /**
   * 获取任务专属笔记
   * @param {string} lessonId - 任务ID
   * @returns {string}
   */
  getLessonNote(lessonId) {
    const data = this.getAll();
    return data.notes[lessonId] || '';
  },

  /**
   * 添加错题记录
   * @param {string} quizId - 题目ID
   * @param {string} userCode - 用户代码
   */
  addWrongAnswer(quizId, userCode) {
    const data = this.getAll();
    data.wrongAnswers.push({
      quizId,
      userCode,
      attemptTime: new Date().toISOString()
    });
    this.saveAll(data);
  },

  /**
   * 获取所有错题
   * @returns {Array}
   */
  getWrongAnswers() {
    const data = this.getAll();
    return data.wrongAnswers || [];
  },

  /**
   * 清除错题记录
   * @param {string} quizId - 可选，指定题目ID
   */
  clearWrongAnswers(quizId = null) {
    const data = this.getAll();
    if (quizId) {
      data.wrongAnswers = data.wrongAnswers.filter(w => w.quizId !== quizId);
    } else {
      data.wrongAnswers = [];
    }
    this.saveAll(data);
  },

  /**
   * 保存测评分数
   * @param {string} quizId - 题目ID
   * @param {number} score - 得分
   */
  addQuizScore(quizId, score) {
    const data = this.getAll();
    data.quizScores.push({
      quizId,
      score,
      attemptTime: new Date().toISOString()
    });
    this.saveAll(data);
  },

  /**
   * 获取所有测评分数
   * @returns {Array}
   */
  getQuizScores() {
    const data = this.getAll();
    return data.quizScores || [];
  },

  /**
   * 计算平均得分
   * @returns {number}
   */
  getAverageScore() {
    const scores = this.getQuizScores();
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, s) => sum + s.score, 0);
    return Math.round(total / scores.length);
  },

  /**
   * 更新累计学习时长
   * @param {number} seconds - 增加的秒数
   */
  addStudyTime(seconds) {
    const data = this.getAll();
    data.totalStudyTime = (data.totalStudyTime || 0) + seconds;
    this.saveAll(data);
  },

  /**
   * 获取累计学习时长（秒）
   * @returns {number}
   */
  getTotalStudyTime() {
    const data = this.getAll();
    return data.totalStudyTime || 0;
  },

  /**
   * 格式化学习时长
   * @param {number} seconds - 秒数
   * @returns {string} 格式化后的字符串
   */
  formatStudyTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    }
    return `${minutes}分钟`;
  },

  /**
   * 导出数据为JSON文件
   */
  exportData() {
    const data = this.getAll();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `python-learning-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * 导入JSON数据
   * @param {File} file - JSON文件
   * @returns {Promise<Object>} 导入的数据
   */
  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          // 合并数据，保留已完成的内容
          const existing = this.getAll();
          const merged = {
            ...this.DEFAULT_DATA,
            ...existing,
            ...data,
            progress: {
              ...existing.progress,
              ...data.progress
            },
            codes: {
              ...existing.codes,
              ...data.codes
            },
            notes: {
              ...existing.notes,
              ...data.notes
            }
          };
          this.saveAll(merged);
          resolve(merged);
        } catch (error) {
          reject(new Error('无效的JSON文件'));
        }
      };
      reader.onerror = () => reject(new Error('读取文件失败'));
      reader.readAsText(file);
    });
  },

  /**
   * 重置所有数据
   */
  resetAll() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  /**
   * 获取统计数据（用于首页看板）
   * @returns {Object}
   */
  getStatistics() {
    const data = this.getAll();
    return {
      completedLessons: data.progress.completedLessons.length,
      completedQuizzes: data.progress.completedQuizzes.length,
      totalQuizzes: 20, // 预估总数，实际从课程数据获取
      averageScore: this.getAverageScore(),
      totalStudyTime: data.totalStudyTime,
      formattedStudyTime: this.formatStudyTime(data.totalStudyTime),
      wrongAnswersCount: data.wrongAnswers.length
    };
  }
};

// 导出模块
window.StorageManager = StorageManager;
