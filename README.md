# Python互动学习平台

基于Pyodide的静态Python学习网站，无需后端，可直接在浏览器中运行Python代码。

## 功能特性

- **即开即用**：无需安装任何软件，打开浏览器即可编程
- **内置Pyodide**：支持pandas、numpy等数据分析库
- **互动式学习**：卡片式任务结构，边学边练
- **课程体系**：入门/实操/进阶三层课程设计
- **电商实战**：配套真实电商数据集
- **进度追踪**：localStorage持久化存储学习进度
- **错题本**：自动记录错题，便于复习
- **主题切换**：支持浅色/深色模式

## 技术栈

- 原生HTML5 + CSS3 + JavaScript ES6+
- Pyodide 0.24.1 (浏览器端Python)
- CodeMirror 5 (代码编辑器)
- Chart.js 4 (数据可视化)
- localStorage (数据持久化)

## 快速开始

### 本地运行

```bash
# 使用任意静态服务器
python -m http.server 8000

# 或使用Node.js
npx serve .

# 或使用VS Code的Live Server插件
```

然后访问 http://localhost:8000

### 部署到Cloudflare Pages

1. Fork此仓库到你的GitHub
2. 登录Cloudflare Pages
3. 连接到你的GitHub仓库
4. 设置构建命令为空（纯静态）
5. 部署完成

## 项目结构

```
/
├── index.html              # 首页
├── course.html             # 课程页
├── styles/
│   ├── theme.css           # 主题变量
│   ├── components.css      # 组件样式
│   └── main.css            # 主样式
├── scripts/
│   ├── app.js              # 主应用逻辑
│   ├── storage.js          # 存储模块
│   ├── pyodide-runner.js   # Pyodide运行器
│   ├── editor.js           # 编辑器组件
│   ├── course-data.js      # 课程内容
│   └── utils.js            # 工具函数
└── README.md
```

## 课程内容

### 入门层
1. Python基础语法
2. 数据类型与变量
3. 条件与循环
4. 函数入门

### 实操层
1. 列表与字典进阶
2. Pandas数据处理入门
3. 数据清洗与转换
4. 文件读取与导出

### 进阶层
1. 数据聚合与分组
2. 多表关联与合并
3. 数据可视化
4. 电商业务分析实战

## 数据导出/导入

在首页侧边栏可导出学习进度为JSON文件，也可导入之前的备份。

## License

MIT
