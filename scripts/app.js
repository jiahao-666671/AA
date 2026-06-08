/**
 * 主应用逻辑
 * 处理页面初始化、事件绑定、用户交互
 */

// 全局变量
let codeEditor = null;
let pyodideRunner = null;
let currentLessonId = null;
let charts = {};

// ==================== 页面初始化 ====================

/**
 * 根据页面类型初始化
 */
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('course.html')) {
        initCoursePage();
    } else {
        initHomePage();
    }

    // 初始化主题
    initTheme();

    // 绑定全局事件
    bindGlobalEvents();
});

/**
 * 初始化首页
 */
function initHomePage() {
    renderStats();
    renderWrongQuestions();
    bindHomeEvents();

    // 初始化Pyodide快速体验
    initDemoRunner();
}

/**
 * 初始化课程页
 */
function initCoursePage() {
    // 获取当前课程ID
    const lessonId = getUrlParam('lesson') || '1-1';
    currentLessonId = lessonId;

    // 渲染课程目录
    renderCourseList();

    // 加载课程内容
    loadLesson(lessonId);

    // 绑定课程页事件
    bindCourseEvents();
}

/**
 * 初始化主题
 */
function initTheme() {
    const savedTheme = StorageManager.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 绑定主题切换
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

/**
 * 切换主题
 */
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    StorageManager.setTheme(newTheme);

    // 更新编辑器主题
    if (codeEditor) {
        codeEditor.applyTheme();
    }

    // 重新渲染图表
    if (charts.lessons) {
        charts.lessons.destroy();
    }
    if (charts.score) {
        charts.score.destroy();
    }
    charts = {};

    if (window.location.pathname.includes('course.html')) {
        // 不需要重新渲染
    } else {
        renderStats();
    }
}

// ==================== 首页逻辑 ====================

/**
 * 渲染学习统计
 */
function renderStats() {
    const stats = StorageManager.getDashboardStats();

    // 更新数字显示
    document.getElementById('completedLessons').textContent = stats.completedLessons;
    document.getElementById('totalExercises').textContent = stats.completedExercises;
    document.getElementById('avgScore').textContent = stats.avgScore + '%';
    document.getElementById('totalTime').textContent = formatTime(stats.totalTime);

    // 渲染环形图
    renderLessonsChart(stats.completedLessons, stats.totalLessons);

    // 渲染得分图
    renderScoreChart(stats.avgScore);

    // 更新课程进度
    updateCourseProgress();
}

/**
 * 渲染课程完成环形图
 */
function renderLessonsChart(completed, total) {
    const canvas = document.getElementById('lessonsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    charts.lessons = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percentage, 100 - percentage],
                backgroundColor: [
                    getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#4F46E5',
                    getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#E5E7EB'
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '70%',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

/**
 * 渲染得分环形图
 */
function renderScoreChart(score) {
    const canvas = document.getElementById('scoreChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    charts.score = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [score, 100 - score],
                backgroundColor: [
                    getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#10B981',
                    getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#E5E7EB'
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '70%',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

/**
 * 更新课程卡片进度
 */
function updateCourseProgress() {
    const progress = StorageManager.getProgress();

    document.querySelectorAll('.course-card').forEach(card => {
        const level = card.dataset.level;
        let chapterNum = 1;

        if (level === '入门') chapterNum = 1;
        else if (level === '实操') chapterNum = 2;
        else if (level === '进阶') chapterNum = 3;

        const chapter = COURSE_DATA[chapterNum];
        if (!chapter) return;

        const completedInChapter = chapter.lessons.filter(
            lesson => progress.completedLessons.includes(lesson.id)
        ).length;

        const totalInChapter = chapter.lessons.length;
        const percentage = (completedInChapter / totalInChapter) * 100;

        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');

        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
        if (progressText) {
            progressText.textContent = `${completedInChapter}/${totalInChapter} 课程`;
        }
    });
}

/**
 * 渲染错题本
 */
function renderWrongQuestions() {
    const wrongAnswers = StorageManager.getWrongAnswers();
    const section = document.getElementById('wrongQuestionsSection');
    const list = document.getElementById('wrongQuestionsList');

    if (wrongAnswers.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    list.innerHTML = wrongAnswers.map(item => {
        const lesson = getLesson(item.exerciseId.split('-').slice(0, 2).join('-'));
        const exercise = lesson?.exercises?.find(e => e.id === item.exerciseId);

        return `
            <div class="wrong-question-item" data-id="${item.exerciseId}">
                <div class="wrong-question-info">
                    <span class="wrong-question-id">${item.exerciseId}</span>
                    <p class="wrong-question-text">${exercise?.question?.substring(0, 50) || '题目内容'}...</p>
                </div>
                <button class="btn btn-sm btn-secondary" onclick="reviewWrongAnswer('${item.exerciseId}')">查看</button>
            </div>
        `;
    }).join('');
}

/**
 * 绑定首页事件
 */
function bindHomeEvents() {
    // 导出按钮
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const json = StorageManager.exportJSON();
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `python-learning-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('进度已导出', 'success');
        });
    }

    // 导入按钮
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => importFile.click());
        importFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    StorageManager.importJSON(event.target.result);
                    renderStats();
                    renderWrongQuestions();
                };
                reader.readAsText(file);
            }
        });
    }

    // 笔记保存
    const globalNotes = document.getElementById('globalNotes');
    if (globalNotes) {
        globalNotes.value = StorageManager.getGlobalNotes();
        globalNotes.addEventListener('input', debounce(() => {
            StorageManager.saveGlobalNotes(globalNotes.value);
        }, 500));
    }

    // 代码片段复制
    document.querySelectorAll('.snippet-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.dataset.code;
            copyToClipboard(code);
        });
    });
}

/**
 * 初始化快速体验Runner
 */
function initDemoRunner() {
    const demoModal = document.getElementById('demoModal');
    if (!demoModal) return;

    let demoPyodide = null;

    // 运行按钮
    const runBtn = document.getElementById('runDemoBtn');
    const output = document.getElementById('demoOutput');
    const codeArea = document.getElementById('demoCode');

    if (runBtn) {
        runBtn.addEventListener('click', async () => {
            if (!demoPyodide) {
                output.innerHTML = '<div class="loading-spinner"></div> 正在加载Python环境...';
                demoPyodide = new PyodideRunner(
                    (p) => {
                        if (p.status === 'loading') {
                            output.innerHTML = `<div class="loading-spinner"></div> ${p.message}`;
                        }
                    }
                );
                await demoPyodide.init();
            }

            const code = codeArea.value;
            output.innerHTML = '<div class="loading-spinner"></div> 运行中...';

            const result = await demoPyodide.run(code);
            if (result.success) {
                output.innerHTML = result.output
                    ? `<pre class="output-success">${result.output}</pre>`
                    : '<div class="output-placeholder">代码执行完成，无输出</div>';
            } else {
                output.innerHTML = `<pre class="output-error">${result.error}</pre>`;
            }
        });
    }

    // 清空按钮
    const clearBtn = document.getElementById('clearDemoBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            codeArea.value = `# 在这里输入Python代码
print("Hello, Python!")`;
            output.innerHTML = '<div class="output-placeholder">运行结果将显示在这里...</div>';
        });
    }
}

// ==================== 课程页逻辑 ====================

/**
 * 渲染课程目录
 */
function renderCourseList() {
    const container = document.getElementById('courseList');
    if (!container) return;

    let html = '';

    for (const chapterNum in COURSE_DATA) {
        const chapter = COURSE_DATA[chapterNum];
        html += `
            <div class="course-chapter">
                <div class="chapter-title" data-chapter="${chapterNum}">
                    <svg class="chapter-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                    <span>${chapter.title}</span>
                    <span class="badge badge-${chapter.level === '入门' ? 'primary' : chapter.level === '实操' ? 'success' : 'warning'}">${chapter.level}</span>
                </div>
                <div class="lesson-list">
                    ${chapter.lessons.map(lesson => {
                        const isCompleted = StorageManager.getProgress().completedLessons.includes(lesson.id);
                        const isActive = currentLessonId === lesson.id;
                        return `
                            <a class="lesson-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}"
                               data-lesson="${lesson.id}"
                               href="course.html?lesson=${lesson.id}">
                                <span class="lesson-status">${isCompleted ? '✓' : '○'}</span>
                                <span>${lesson.title}</span>
                            </a>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    // 绑定章节折叠事件
    container.querySelectorAll('.chapter-title').forEach(title => {
        title.addEventListener('click', () => {
            title.classList.toggle('collapsed');
            title.nextElementSibling.style.display =
                title.classList.contains('collapsed') ? 'none' : 'block';
        });
    });
}

/**
 * 加载课程
 */
function loadLesson(lessonId) {
    const lesson = getLesson(lessonId);
    if (!lesson) {
        showToast('课程不存在', 'error');
        return;
    }

    currentLessonId = lessonId;
    setUrlParam('lesson', lessonId);

    // 更新面包屑
    document.getElementById('breadcrumbText').textContent = lesson.title;

    // 更新任务元信息
    document.getElementById('taskId').textContent = lesson.id;
    document.getElementById('taskTitle').textContent = lesson.title;

    // 获取章节信息
    const chapterNum = lessonId.split('-')[0];
    const chapter = COURSE_DATA[chapterNum];
    document.getElementById('taskBadge').textContent = chapter?.level || '入门';

    // 渲染文字内容
    const taskText = document.getElementById('taskText');
    taskText.innerHTML = parseMarkdown(lesson.content);

    // 绑定术语解释
    bindTermTooltip();

    // 初始化编辑器
    initCodeEditor(lesson.template);

    // 渲染习题
    renderExercises(lesson.exercises);

    // 更新导航
    updateNavButtons(lessonId);

    // 更新笔记
    const notesTextarea = document.getElementById('lessonNotes');
    if (notesTextarea) {
        notesTextarea.value = StorageManager.getNotes(lessonId);
    }

    // 更新进度
    updateOverallProgress();

    // 更新目录激活状态
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.toggle('active', item.dataset.lesson === lessonId);
    });
}

/**
 * 初始化代码编辑器
 */
function initCodeEditor(template) {
    const editorContainer = document.querySelector('.editor-body');
    if (!editorContainer) return;

    // 如果已存在编辑器，先销毁
    if (codeEditor) {
        // 保存当前代码
        const currentCode = codeEditor.getValue();
        if (currentCode) {
            StorageManager.cacheCode(currentLessonId, currentCode);
        }
        codeEditor.destroy();
    }

    // 尝试加载缓存的代码
    const cachedCode = StorageManager.getCodeCache(currentLessonId);
    const initialCode = cachedCode || template || '';

    // 创建编辑器
    codeEditor = new CodeEditor(editorContainer, {
        mode: 'python',
        theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'material-darker' : 'default'
    });

    codeEditor.setValue(initialCode);

    // 监听内容变化，自动保存
    codeEditor.on('change', debounce(() => {
        if (currentLessonId) {
            StorageManager.cacheCode(currentLessonId, codeEditor.getValue());
        }
    }, 1000));
}

/**
 * 渲染习题
 */
function renderExercises(exercises) {
    const container = document.getElementById('exercisesList');
    if (!container || !exercises) {
        document.getElementById('taskExercises').style.display = 'none';
        return;
    }

    document.getElementById('taskExercises').style.display = 'block';

    container.innerHTML = exercises.map(exercise => {
        const isCompleted = StorageManager.getProgress().completedExercises.includes(exercise.id);
        const isWrong = StorageManager.getWrongAnswers().some(w => w.exerciseId === exercise.id);

        return `
            <div class="exercise-item" data-id="${exercise.id}">
                <div class="exercise-header">
                    <span class="exercise-id">${exercise.id}</span>
                    ${isCompleted && !isWrong ? '<span class="badge badge-success">已答对</span>' : ''}
                    ${isWrong ? '<span class="badge badge-error">已答错</span>' : ''}
                </div>
                <p class="exercise-question">${exercise.question}</p>
                <div class="exercise-options">
                    ${exercise.options.map(opt => `
                        <div class="exercise-option" data-value="${opt.label}">
                            <span class="option-label">${opt.label}</span>
                            <span class="option-text">${opt.text}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="exercise-actions">
                    <button class="btn btn-sm btn-primary submit-btn">提交答案</button>
                    <button class="btn btn-sm btn-secondary solution-btn">查看解析</button>
                </div>
                <div class="exercise-result"></div>
            </div>
        `;
    }).join('');

    // 绑定习题事件
    bindExerciseEvents(exercises);
}

/**
 * 绑定习题事件
 */
function bindExerciseEvents(exercises) {
    document.querySelectorAll('.exercise-item').forEach(item => {
        const exerciseId = item.dataset.id;
        const exercise = exercises.find(e => e.id === exerciseId);
        if (!exercise) return;

        const options = item.querySelectorAll('.exercise-option');
        const submitBtn = item.querySelector('.submit-btn');
        const solutionBtn = item.querySelector('.solution-btn');
        const resultDiv = item.querySelector('.exercise-result');

        let selectedValue = null;

        // 选项点击
        options.forEach(opt => {
            opt.addEventListener('click', () => {
                if (submitBtn.disabled) return;
                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                selectedValue = opt.dataset.value;
            });
        });

        // 提交答案
        submitBtn.addEventListener('click', () => {
            if (!selectedValue) {
                showToast('请先选择一个答案', 'warning');
                return;
            }

            const isCorrect = selectedValue === exercise.answer;

            // 显示结果
            options.forEach(opt => {
                if (opt.dataset.value === exercise.answer) {
                    opt.classList.add('correct');
                } else if (opt.dataset.value === selectedValue && !isCorrect) {
                    opt.classList.add('wrong');
                }
            });

            if (isCorrect) {
                resultDiv.className = 'exercise-result correct';
                resultDiv.innerHTML = '✓ 回答正确！';
                StorageManager.completeExercise(exerciseId);
                StorageManager.removeWrongAnswer(exerciseId);
            } else {
                resultDiv.className = 'exercise-result wrong';
                resultDiv.innerHTML = '✗ 回答错误，请查看解析或重试。';
                StorageManager.addWrongAnswer({
                    exerciseId,
                    wrongAnswer: selectedValue,
                    question: exercise.question
                });
                renderWrongQuestions();
            }

            submitBtn.disabled = true;
            options.forEach(opt => opt.style.pointerEvents = 'none');
        });

        // 查看解析
        solutionBtn.addEventListener('click', () => {
            showSolution(exercise);
        });
    });
}

/**
 * 显示解题思路
 */
function showSolution(exercise) {
    const modal = document.getElementById('solutionModal');
    const textDiv = document.getElementById('solutionText');
    const codeDiv = document.getElementById('solutionCode');

    textDiv.innerHTML = parseMarkdown(exercise.solution.text);
    codeDiv.textContent = exercise.solution.code;

    modal.classList.add('active');

    // 关闭按钮
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    modal.querySelector('.modal-backdrop').addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

/**
 * 更新导航按钮
 */
function updateNavButtons(lessonId) {
    const { prev, next } = getAdjacentLessons(lessonId);

    const prevBtn = document.getElementById('prevTaskBtn');
    const nextBtn = document.getElementById('nextTaskBtn');

    if (prevBtn) {
        prevBtn.disabled = !prev;
        prevBtn.onclick = () => prev && loadLesson(prev);
    }

    if (nextBtn) {
        nextBtn.disabled = !next;
        nextBtn.onclick = () => next && loadLesson(next);
    }
}

/**
 * 更新总体进度
 */
function updateOverallProgress() {
    const progress = StorageManager.getProgress();
    const { totalLessons } = getCourseStats();
    const completed = progress.completedLessons.length;
    const percentage = Math.round((completed / totalLessons) * 100);

    const progressBar = document.getElementById('totalProgressBar');
    const progressText = document.getElementById('totalProgress');

    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    if (progressText) {
        progressText.textContent = percentage + '%';
    }
}

/**
 * 绑定术语解释
 */
function bindTermTooltip() {
    const tooltip = document.getElementById('tooltipPopup');
    const tooltipContent = document.getElementById('tooltipContent');

    const terms = {
        'GMV': '商品交易总额（Gross Merchandise Volume），指一定时期内平台上所有商品成交总额。',
        '客单价': '平均每单金额，计算方式为GMV/订单数。',
        '转化率': '下单用户占总访客的比例，反映流量变现能力。',
        '复购率': '重复购买用户占总用户的比例，反映用户粘性。',
        'UV': '独立访客数（Unique Visitor），一定时间内访问的不重复用户数。',
        'DataFrame': 'Pandas中的二维表格数据结构，类似于Excel中的工作表。',
        'Pandas': 'Python数据分析核心库，提供高效的数据结构和数据分析工具。'
    };

    document.querySelectorAll('.task-text .term').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const term = e.target.textContent;
            const definition = terms[term];
            if (definition) {
                tooltipContent.textContent = definition;
                tooltip.classList.add('active');

                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.bottom + 10) + 'px';
            }
        });

        el.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
}

/**
 * 绑定课程页事件
 */
function bindCourseEvents() {
    // 运行代码
    const runBtn = document.getElementById('runCodeBtn');
    if (runBtn) {
        runBtn.addEventListener('click', runCurrentCode);
    }

    // 格式化代码
    const formatBtn = document.getElementById('formatCodeBtn');
    if (formatBtn) {
        formatBtn.addEventListener('click', () => {
            if (codeEditor) {
                codeEditor.formatCode();
                showToast('代码已格式化', 'success');
            }
        });
    }

    // 清空编辑器
    const clearBtn = document.getElementById('clearCodeBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (codeEditor) {
                codeEditor.clear();
                showToast('编辑器已清空', 'success');
            }
        });
    }

    // 重置模板
    const resetBtn = document.getElementById('resetCodeBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const lesson = getLesson(currentLessonId);
            if (lesson && codeEditor) {
                codeEditor.reset(lesson.template);
                showToast('已重置为模板代码', 'success');
            }
        });
    }

    // 导入数据
    const importBtn = document.getElementById('importDataBtn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            showDataImportMenu();
        });
    }

    // 清空输出
    const clearOutputBtn = document.getElementById('clearOutputBtn');
    if (clearOutputBtn) {
        clearOutputBtn.addEventListener('click', () => {
            document.getElementById('outputBody').innerHTML =
                '<div class="output-placeholder">点击"运行代码"按钮查看结果...</div>';
        });
    }

    // 笔记保存
    const notesTextarea = document.getElementById('lessonNotes');
    if (notesTextarea) {
        notesTextarea.addEventListener('input', debounce(() => {
            StorageManager.saveNotes(currentLessonId, notesTextarea.value);
        }, 500));
    }

    // 侧边栏折叠
    const collapseBtn = document.getElementById('collapseSidebar');
    const courseSidebar = document.getElementById('courseSidebar');
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            courseSidebar.classList.toggle('collapsed');
        });
    }

    // 代码片段
    document.querySelectorAll('.snippet-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.dataset.code;
            if (codeEditor) {
                codeEditor.insertText(code);
                codeEditor.focus();
            }
        });
    });
}

/**
 * 运行当前编辑器代码
 */
async function runCurrentCode() {
    if (!codeEditor) return;

    const code = codeEditor.getValue();
    if (!code.trim()) {
        showToast('请先输入代码', 'warning');
        return;
    }

    const outputBody = document.getElementById('outputBody');
    const runBtn = document.getElementById('runCodeBtn');

    // 显示加载状态
    runBtn.disabled = true;
    outputBody.innerHTML = '<div class="loading-spinner"></div> 正在初始化Python环境...';

    // 初始化Pyodide
    if (!pyodideRunner) {
        pyodideRunner = getPyodideRunner();
    }

    try {
        await pyodideRunner.init();

        // 显示运行中
        outputBody.innerHTML = '<div class="loading-spinner"></div> 运行中...';

        // 运行代码
        const result = await pyodideRunner.run(code, {
            onProgress: (progress) => {
                if (progress.type === 'lag-warning') {
                    showLagWarning();
                }
            }
        });

        // 显示结果
        if (result.success) {
            if (result.output) {
                outputBody.innerHTML = `<pre class="output-success">${escapeHtml(result.output)}</pre>`;
            } else {
                outputBody.innerHTML = '<div class="output-placeholder">代码执行完成，无输出</div>';
            }
        } else {
            outputBody.innerHTML = `<pre class="output-error">${escapeHtml(result.error)}</pre>`;
        }

        // 标记课程完成（如果还没完成）
        StorageManager.completeLesson(currentLessonId);
        updateOverallProgress();
        updateCourseProgress();

    } catch (error) {
        outputBody.innerHTML = `<pre class="output-error">${escapeHtml(error.message)}</pre>`;
    } finally {
        runBtn.disabled = false;
    }
}

/**
 * 显示数据导入菜单
 */
function showDataImportMenu() {
    const menu = document.createElement('div');
    menu.className = 'data-import-menu';
    menu.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        z-index: 1000;
        min-width: 300px;
        box-shadow: var(--shadow-xl);
    `;

    menu.innerHTML = `
        <h4 style="margin-bottom: var(--space-4);">选择要导入的数据集</h4>
        <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <button class="btn btn-secondary" data-data="orders">📦 订单数据</button>
            <button class="btn btn-secondary" data-data="customers">👥 客户数据</button>
            <button class="btn btn-secondary" data-data="sales">📊 销售数据</button>
        </div>
        <button class="btn btn-ghost" style="margin-top: var(--space-4); width: 100%;" id="closeImportMenu">取消</button>
    `;

    document.body.appendChild(menu);

    // 点击选项导入数据
    menu.querySelectorAll('[data-data]').forEach(btn => {
        btn.addEventListener('click', () => {
            const dataName = btn.dataset.data;
            const dataCode = SAMPLE_DATA[dataName];
            if (dataCode && codeEditor) {
                codeEditor.setValue(dataCode);
                showToast(`已导入${btn.textContent.replace('📦 ', '').replace('👥 ', '').replace('📊 ', '')}`, 'success');
            }
            menu.remove();
        });
    });

    // 取消
    menu.querySelector('#closeImportMenu').addEventListener('click', () => {
        menu.remove();
    });

    // 点击背景关闭
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    `;
    backdrop.addEventListener('click', () => {
        menu.remove();
        backdrop.remove();
    });
    document.body.appendChild(backdrop);
}

/**
 * 显示卡顿警告
 */
function showLagWarning() {
    const modal = document.getElementById('lagModal');
    if (!modal) return;

    modal.classList.add('active');

    const continueBtn = document.getElementById('continueRunBtn');
    const cancelBtn = document.getElementById('cancelRunBtn');

    const closeModal = () => modal.classList.remove('active');

    continueBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
}

// ==================== 全局事件 ====================

/**
 * 绑定全局事件
 */
function bindGlobalEvents() {
    // 侧边栏切换
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar') || document.getElementById('courseSidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // 辅助侧边栏切换
    const helperToggle = document.getElementById('helperToggle');
    const helperContent = document.getElementById('helperContent');
    if (helperToggle && helperContent) {
        helperToggle.addEventListener('click', () => {
            helperContent.classList.toggle('active');
        });
    }

    // 模态框关闭
    document.querySelectorAll('.modal').forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        }
        if (backdrop) {
            backdrop.addEventListener('click', () => modal.classList.remove('active'));
        }
    });

    // Demo模态框
    const demoBtn = document.getElementById('demoBtn');
    const demoModal = document.getElementById('demoModal');
    if (demoBtn && demoModal) {
        demoBtn.addEventListener('click', () => {
            demoModal.classList.add('active');
        });
    }

    // 学习时间追踪
    trackStudyTime();
}

/**
 * 追踪学习时间
 */
function trackStudyTime() {
    const startTime = Date.now();
    const oneMinute = 60 * 1000;

    setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        // 每分钟保存一次学习时间
        if (elapsed > 0 && elapsed % 60 === 0) {
            StorageManager.addStudyTime(60);
        }
    }, oneMinute);

    // 页面离开时保存
    window.addEventListener('beforeunload', () => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        if (elapsed > 0) {
            StorageManager.addStudyTime(elapsed);
        }
    });
}

/**
 * 查看错题
 */
function reviewWrongAnswer(exerciseId) {
    // 跳转到对应的课程
    const lessonId = exerciseId.split('-').slice(0, 2).join('-');
    window.location.href = `course.html?lesson=${lessonId}`;
}

// ==================== 工具函数 ====================

/**
 * HTML转义
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
