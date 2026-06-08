/**
 * 存储模块 - localStorage封装
 * 负责用户数据、进度、设置的持久化存储
 */

const STORAGE_KEY = 'python-learning';
const STORAGE_VERSION = '1.0';

/**
 * 存储管理器
 */
const StorageManager = {
    /**
     * 存储键名列表
     */
    KEYS: {
        THEME: 'theme',
        PROGRESS: 'progress',
        WRONG_ANSWERS: 'wrongAnswers',
        NOTES: 'notes',
        CODE_CACHE: 'codeCache',
        STATS: 'stats'
    },

    /**
     * 初始化存储结构
     */
    init() {
        const data = this.getAll();
        if (!data || data.version !== STORAGE_VERSION) {
            // 首次使用或版本不匹配，初始化默认结构
            const defaultData = {
                version: STORAGE_VERSION,
                theme: 'light',
                progress: {
                    completedLessons: [],
                    completedExercises: [],
                    currentLesson: null
                },
                wrongAnswers: [],
                notes: {},
                codeCache: {},
                stats: {
                    totalTime: 0,
                    lastVisit: Date.now(),
                    visitCount: 1
                }
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        } else {
            // 更新访问统计
            this.updateStats({
                lastVisit: Date.now(),
                visitCount: (data.stats?.visitCount || 0) + 1
            });
        }
    },

    /**
     * 获取所有存储数据
     * @returns {Object|null}
     */
    getAll() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('读取存储失败:', e);
            return null;
        }
    },

    /**
     * 读取指定键的值
     * @param {string} key - 键名
     * @returns {any} 值
     */
    get(key) {
        const data = this.getAll();
        if (!data) return null;
        return data[key] ?? null;
    },

    /**
     * 设置指定键的值
     * @param {string} key - 键名
     * @param {any} value - 值
     */
    set(key, value) {
        try {
            const data = this.getAll() || {};
            data[key] = value;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('写入存储失败:', e);
        }
    },

    /**
     * 获取主题设置
     * @returns {string} 'light' | 'dark'
     */
    getTheme() {
        return this.get(this.KEYS.THEME) || 'light';
    },

    /**
     * 设置主题
     * @param {string} theme - 'light' | 'dark'
     */
    setTheme(theme) {
        this.set(this.KEYS.THEME, theme);
    },

    /**
     * 获取学习进度
     * @returns {Object}
     */
    getProgress() {
        return this.get(this.KEYS.PROGRESS) || {
            completedLessons: [],
            completedExercises: [],
            currentLesson: null
        };
    },

    /**
     * 更新学习进度
     * @param {Object} progress - 新的进度数据
     */
    updateProgress(progress) {
        this.set(this.KEYS.PROGRESS, progress);
    },

    /**
     * 标记课程完成
     * @param {string} lessonId - 课程ID
     */
    completeLesson(lessonId) {
        const progress = this.getProgress();
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            this.updateProgress(progress);
        }
    },

    /**
     * 标记习题完成
     * @param {string} exerciseId - 习题ID
     */
    completeExercise(exerciseId) {
        const progress = this.getProgress();
        if (!progress.completedExercises.includes(exerciseId)) {
            progress.completedExercises.push(exerciseId);
            this.updateProgress(progress);
        }
    },

    /**
     * 获取错题列表
     * @returns {Array}
     */
    getWrongAnswers() {
        return this.get(this.KEYS.WRONG_ANSWERS) || [];
    },

    /**
     * 添加错题
     * @param {Object} wrongAnswer - 错题信息
     */
    addWrongAnswer(wrongAnswer) {
        const list = this.getWrongAnswers();
        // 检查是否已存在
        const exists = list.some(item => item.exerciseId === wrongAnswer.exerciseId);
        if (!exists) {
            list.push({
                ...wrongAnswer,
                timestamp: Date.now()
            });
            this.set(this.KEYS.WRONG_ANSWERS, list);
        }
    },

    /**
     * 移除错题
     * @param {string} exerciseId - 习题ID
     */
    removeWrongAnswer(exerciseId) {
        const list = this.getWrongAnswers();
        const filtered = list.filter(item => item.exerciseId !== exerciseId);
        this.set(this.KEYS.WRONG_ANSWERS, filtered);
    },

    /**
     * 获取笔记
     * @param {string} lessonId - 课程ID
     * @returns {string}
     */
    getNotes(lessonId) {
        const notes = this.get(this.KEYS.NOTES) || {};
        return notes[lessonId] || '';
    },

    /**
     * 保存笔记
     * @param {string} lessonId - 课程ID
     * @param {string} content - 笔记内容
     */
    saveNotes(lessonId, content) {
        const notes = this.get(this.KEYS.NOTES) || {};
        notes[lessonId] = content;
        this.set(this.KEYS.NOTES, notes);
    },

    /**
     * 获取全局笔记
     * @returns {string}
     */
    getGlobalNotes() {
        return this.get('globalNotes') || '';
    },

    /**
     * 保存全局笔记
     * @param {string} content - 笔记内容
     */
    saveGlobalNotes(content) {
        this.set('globalNotes', content);
    },

    /**
     * 获取代码缓存
     * @param {string} lessonId - 课程ID
     * @returns {string|null}
     */
    getCodeCache(lessonId) {
        const cache = this.get(this.KEYS.CODE_CACHE) || {};
        return cache[lessonId] || null;
    },

    /**
     * 缓存代码
     * @param {string} lessonId - 课程ID
     * @param {string} code - 代码内容
     */
    cacheCode(lessonId, code) {
        const cache = this.get(this.KEYS.CODE_CACHE) || {};
        cache[lessonId] = code;
        this.set(this.KEYS.CODE_CACHE, cache);
    },

    /**
     * 获取学习统计
     * @returns {Object}
     */
    getStats() {
        return this.get(this.KEYS.STATS) || {
            totalTime: 0,
            lastVisit: null,
            visitCount: 0
        };
    },

    /**
     * 更新学习统计
     * @param {Object} stats - 新的统计数据
     */
    updateStats(stats) {
        const current = this.getStats();
        this.set(this.KEYS.STATS, { ...current, ...stats });
    },

    /**
     * 增加学习时间
     * @param {number} seconds - 增加的秒数
     */
    addStudyTime(seconds) {
        const stats = this.getStats();
        stats.totalTime = (stats.totalTime || 0) + seconds;
        this.set(this.KEYS.STATS, stats);
    },

    /**
     * 导出所有数据为JSON
     * @returns {string} JSON字符串
     */
    exportJSON() {
        const data = this.getAll();
        return JSON.stringify({
            exportTime: new Date().toISOString(),
            version: STORAGE_VERSION,
            data: data
        }, null, 2);
    },

    /**
     * 从JSON导入数据
     * @param {string} json - JSON字符串
     * @returns {boolean} 是否导入成功
     */
    importJSON(json) {
        try {
            const parsed = JSON.parse(json);
            if (parsed.data) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.data));
                showToast('数据导入成功', 'success');
                return true;
            }
            showToast('数据格式错误', 'error');
            return false;
        } catch (e) {
            console.error('导入失败:', e);
            showToast('导入失败：' + e.message, 'error');
            return false;
        }
    },

    /**
     * 清除所有数据
     */
    clear() {
        localStorage.removeItem(STORAGE_KEY);
        this.init();
        showToast('数据已清除', 'success');
    },

    /**
     * 获取统计数据用于展示
     * @returns {Object}
     */
    getDashboardStats() {
        const progress = this.getProgress();
        const stats = this.getStats();
        const wrongAnswers = this.getWrongAnswers();

        const totalLessons = 12; // 总课程数
        const totalExercises = 24; // 总习题数

        return {
            completedLessons: progress.completedLessons.length,
            totalLessons,
            completedExercises: progress.completedExercises.length,
            totalExercises,
            totalTime: stats.totalTime || 0,
            avgScore: progress.completedExercises.length > 0
                ? Math.round(((progress.completedExercises.length - wrongAnswers.length) / progress.completedExercises.length) * 100)
                : 0,
            wrongCount: wrongAnswers.length
        };
    }
};

// 初始化存储
StorageManager.init();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}
