# Python学习平台 - 浏览器中的Python学习环境

基于 Pyodide 的交互式 Python 学习平台，无需安装任何软件，在浏览器中即可编写和运行 Python 代码。

## 功能特点

- 🚀 **即时运行** - 基于 Pyodide，浏览器中直接运行 Python，无需后端
- 📚 **三层课程体系** - 20+ 节零基础入门课程
- 📝 **40+ 道配套习题** - 基础语法、代码填空、改错题、数据处理、综合测评
- 💾 **本地存储** - 代码、进度、笔记、主题全部本地保存
- 📊 **数据可视化** - 使用 pandas 分析电商数据
- 🌓 **深色/浅色主题** - 眼睛友好
- 📱 **响应式设计** - 完美适配手机端
- 🎯 **错题本** - 自动记录错题，针对性复习

## 课程结构

### 入门层 - Python基础语法（12节）
1. Hello World - 你的第一个程序
2. 变量与数据类型
3. 字符串操作
4. 数字运算
5. 条件判断（if-else）
6. 循环语句（for）
7. 循环语句（while）
8. 函数基础
9. 列表操作
10. 字典操作
11. 字符串格式化
12. 异常处理入门

### 实底层 - Pandas数据分析（5节）
13. Pandas入门与Series
14. DataFrame基础操作
15. 数据筛选与查看
16. 统计计算入门
17. 简单电商数据分析

### 进阶层 - 综合应用（5节）
18. 数据清洗与处理
19. 分组聚合与统计
20. 多表合并与关联
21. 业务指标计算
22. 综合实战项目

## 快速开始

### 在线使用

访问 https://python-learning.pages.dev 或直接部署到 Cloudflare Pages。

### 本地运行

```bash
# 克隆项目
git clone <repo-url>
cd python-learning

# 使用Python启动简单HTTP服务器
python3 -m http.server 8080

# 或者使用Node.js
npx serve . -p 8080
```

然后在浏览器访问 http://localhost:8080/

### 部署到 Cloudflare Pages

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录
wrangler login

# 部署
wrangler pages deploy . --project-name=python-learning
```

## 项目结构

```
python-learning/
├── index.html          # 首页看板
├── course.html         # 课程页面
├── quiz.html           # 题库页面
├── README.md           # 项目说明
├── css/                # 样式文件
│   ├── main.css
│   ├── theme.css
│   ├── layout.css
│   └── components.css
├── js/                 # JavaScript逻辑
│   ├── storage.js      # localStorage管理
│   ├── pyodide-runner.js # Python运行环境
│   ├── editor-component.js # 代码编辑器
│   ├── chart-manager.js # 图表管理
│   ├── tooltip.js      # 术语弹窗
│   ├── toast.js        # 轻量提示
│   ├── main.js         # 首页逻辑
│   ├── course.js       # 课程逻辑
│   └── quiz.js         # 题库逻辑
├── data/               # 数据文件
│   └── courses.js      # 课程与题库数据
└── assets/             # 静态资源
```

## 技术栈

- **纯前端** - HTML5 + CSS3 + 原生 JavaScript
- **Python运行时** - Pyodide (WebAssembly)
- **代码编辑器** - CodeMirror
- **可视化图表** - Chart.js
- **本地存储** - localStorage

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 开发说明

### 添加新课程

编辑 `data/courses.js` 文件，在 COURSES 数组中添加新的章节和任务。

### 自定义主题

编辑 `css/theme.css` 中的 CSS 变量来自定义颜色方案。

## 数据存储说明

所有数据存储在浏览器本地 localStorage 中，包括：
- 用户编写的代码
- 学习进度
- 错题记录
- 笔记
- 主题偏好

可以通过首页的「导出进度」和「导入进度」功能备份和恢复数据。

## 致谢

- Pyodide 团队
- CodeMirror 项目
- Chart.js 项目
- 所有开源贡献者

## 许可证

MIT License
