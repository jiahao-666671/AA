# Python互动学习平台 - 产品需求文档

## 1. 产品概述

一个基于Pyodide的静态Python互动学习网站，用户可直接在浏览器中编写和运行Python代码。平台采用卡片式任务结构，将文字讲解、内嵌编辑器、运行结果整合在同一页面，无需跳转即可完成学习闭环。

**核心价值**：零配置、即开即用的Python学习环境，搭配结构化课程和即时反馈的习题系统。
**目标用户**：编程初学者、电商从业者、数据分析爱好者

## 2. 功能模块

### 2.1 首页看板
- 读取本地存储数据，展示学习统计
- 完成章节数、做题总数、平均得分、累计学习时长
- 可视化图表（进度环形图、得分柱状图）
- 快速继续学习入口

### 2.2 课程学习模块
- **左侧目录**：可折叠课程目录（入门/实操/进阶三层）
- **中间区域**：任务卡片，包含文字讲解 + 内嵌代码编辑器 + 运行结果面板
- **右侧编辑器**：语法高亮、代码格式化、运行、清空、重置模板
- **数据导入**：每任务内置一键导入电商数据集按钮
- **名词解释**：鼠标hover专业名词弹出解释弹窗

### 2.3 题库系统
- 章节配套习题，做完自动记录对错
- 错题单独归类展示
- 测评模块自动计算得分
- 每题可查看解题思路与参考代码

### 2.4 辅助侧边栏
- 实时笔记输入框（localStorage持久化）
- 电商GMV/客单价等指标速查表
- Pandas常用代码片段一键复制

### 2.5 存储系统
- localStorage持久存储：用户代码、学习进度、错题、笔记、主题配置
- 进度导出JSON功能
- 导入读取功能

### 2.6 主题系统
- 浅色/深色模式切换
- 主题选择本地保存

## 3. 核心流程

### 3.1 学习流程
```
选择课程 → 查看任务讲解 → 在编辑器写代码 → 运行查看结果 → 完成习题 → 进入下一任务
```

### 3.2 练习流程
```
进入习题 → 作答 → 提交 → 记录对错 → 查看解析 → 归类错题
```

### 3.3 数据流程
```
用户操作 → localStorage读写 → 页面状态更新 → 视图同步
```

## 4. 界面设计

### 4.1 设计风格
- **美学方向**：专业技术文档风格，简洁但不冷淡，参考Notion/Docify
- **配色方案**：
  - 浅色主题：主色#4F46E5(靛蓝)、背景#F9FAFB、强调#10B981
  - 深色主题：主色#818CF8、背景#111827、强调#34D399
- **字体**：Display - "ZCOOL XiaoWei" (中文标题)，Body - "Inter" / "Noto Sans SC" (正文)
- **布局**：三栏式（左侧目录350px、中间自适应、右侧编辑器450px）
- **动效**：淡入滑移、hover微交互、加载骨架屏

### 4.2 响应式策略
- **桌面端(>1200px)**：三栏布局
- **平板端(768-1200px)**：左右双栏，目录可折叠
- **移动端(<768px)**：单栏上下布局，底部悬浮导航

### 4.3 组件状态
- 按钮：default/hover/active/disabled
- 卡片：default/hover/active
- 输入框：default/focus/error
- 主题切换：平滑过渡0.3s

## 5. 技术实现

### 5.1 技术栈
- **前端**：原生HTML5 + CSS3 + JavaScript ES6+
- **Python运行**：Pyodide (CDN加载)
- **编辑器**：CodeMirror 6 (轻量、语法高亮)
- **图表**：Chart.js (本地存储数据可视化)
- **存储**：localStorage

### 5.2 CDN依赖
```
- Pyodide: https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js
- CodeMirror: https://cdn.jsdelivr.net/npm/codemirror@5.65.16/
- Chart.js: https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js
- Google Fonts: Inter, Noto Sans SC
```

### 5.3 文件结构
```
/
├── index.html          # 首页
├── course.html         # 课程学习页
├── styles/
│   ├── main.css        # 主样式
│   ├── theme.css       # 主题变量
│   └── components.css  # 组件样式
├── scripts/
│   ├── app.js          # 主入口
│   ├── storage.js      # 存储模块
│   ├── pyodide-runner.js  # Pyodide运行器
│   ├── editor.js       # 编辑器组件
│   ├── course-data.js  # 课程内容数据
│   └── utils.js        # 工具函数
└── README.md
```

## 6. 课程内容结构

### 6.1 入门层
1. Python基础语法
2. 数据类型与变量
3. 条件与循环
4. 函数入门

### 6.2 实操层
1. 列表与字典操作
2. 文件读取基础
3. Pandas数据处理入门
4. 数据清洗与转换

### 6.3 进阶层
1. 数据聚合与分组
2. 多表关联与合并
3. 数据可视化
4. 电商业务分析实战

## 7. 数据模型

### 7.1 localStorage结构
```javascript
{
  "python-learning": {
    "theme": "light" | "dark",
    "progress": {
      "completedLessons": ["1-1", "1-2", ...],
      "completedExercises": ["1-1-1", ...]
    },
    "wrongAnswers": [
      { "exerciseId": "1-1-1", "wrongAnswer": "...", "timestamp": 123456 }
    ],
    "notes": { "lesson-1-1": "笔记内容..." },
    "codeCache": { "lesson-1-1": "上次保存的代码..." },
    "stats": {
      "totalTime": 3600,  // 秒
      "lastVisit": 123456
    }
  }
}
```

### 7.2 导出JSON格式
```javascript
{
  "exportTime": "2024-01-01T00:00:00Z",
  "version": "1.0",
  "data": { /* localStorage内容 */ }
}
```
