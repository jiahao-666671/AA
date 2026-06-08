# Python互动学习平台 - 技术架构文档

## 1. 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                        视图层 (HTML)                          │
│  ┌──────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │ 首页看板  │  │   课程学习页     │  │   公共组件       │   │
│  │ (index)  │  │   (course)      │  │  (sidebar/modal) │   │
│  └──────────┘  └──────────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                        样式层 (CSS)                          │
│  ┌──────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │   main.css   │  │  components   │  │   theme.css   │   │
│  │  (布局/排版)  │  │   (组件样式)   │  │  (主题变量)   │   │
│  └──────────────┘  └───────────────┘  └───────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                       逻辑层 (JS)                            │
│  ┌──────────┐  ┌───────────────┐  ┌────────────────────┐   │
│  │  app.js  │  │  pyodide.js   │  │    editor.js      │   │
│  │ (主入口) │  │ (Python运行)  │  │   (代码编辑器)    │   │
│  ├──────────┤  ├───────────────┤  ├────────────────────┤   │
│  │ storage.js│  │ course-data.js│  │    utils.js       │   │
│  │ (存储模块)│  │  (课程内容)   │  │   (工具函数)      │   │
│  └──────────┘  └───────────────┘  └────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                       数据层 (localStorage)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  theme | progress | wrongAnswers | notes | codeCache │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 2. 技术选型

| 技术 | 版本 | 用途 | 加载方式 |
|------|------|------|----------|
| Pyodide | 0.24.1 | 浏览器端运行Python | CDN懒加载 |
| CodeMirror | 5.65.16 | 代码编辑器 | CDN |
| Chart.js | 4.4.0 | 图表可视化 | CDN |
| Marked.js | 9.1.0 | Markdown渲染 | CDN |
| Google Fonts | - | 字体加载 | CDN |

## 3. 文件结构

```
/
├── index.html              # 首页看板
├── course.html             # 课程学习页
├── styles/
│   ├── main.css            # 主样式文件
│   ├── components.css      # 组件样式
│   └── theme.css           # 主题变量定义
├── scripts/
│   ├── app.js              # 主入口，页面初始化
│   ├── storage.js          # localStorage封装
│   ├── pyodide-runner.js   # Pyodide运行器
│   ├── editor.js           # CodeMirror编辑器封装
│   ├── course-data.js      # 课程内容数据
│   └── utils.js            # 工具函数
├── assets/
│   └── favicon.svg         # 网站图标
├── _redirects               # Cloudflare Pages重定向规则
└── README.md
```

## 4. 模块接口定义

### 4.1 storage.js - 存储模块
```javascript
// 导出函数
StorageManager.init()           // 初始化存储结构
StorageManager.get(key)          // 读取数据
StorageManager.set(key, value)   // 写入数据
StorageManager.exportJSON()      // 导出为JSON
StorageManager.importJSON(json)  // 从JSON导入
StorageManager.clear()           // 清除所有数据
```

### 4.2 pyodide-runner.js - Pyodide运行器
```javascript
// 导出类
class PyodideRunner {
  constructor(onProgress, onOutput)
  async init()                   // 初始化Pyodide
  async run(code)                // 执行Python代码
  async loadPackage(name)        // 加载包(如pandas)
  isReady()                      // 检查是否就绪
  interrupt()                    // 中断执行
}
```

### 4.3 editor.js - 编辑器组件
```javascript
// 导出类
class CodeEditor {
  constructor(container, options)
  getValue()                     // 获取编辑器内容
  setValue(code)                 // 设置编辑器内容
  formatCode()                   // 格式化代码
  clear()                        // 清空编辑器
  reset(template)                // 重置为模板代码
  resize(height)                 // 调整高度
  destroy()                      // 销毁编辑器
}
```

### 4.4 utils.js - 工具函数
```javascript
// 工具函数
formatTime(seconds)              // 格式化时间
showToast(message, type)         // 显示提示
copyToClipboard(text)            // 复制到剪贴板
debounce(fn, delay)              // 防抖
throttle(fn, delay)              // 节流
parseMarkdown(text)               // 解析Markdown
```

## 5. 页面路由

| 页面 | 文件 | 功能 |
|------|------|------|
| 首页 | index.html | 学习统计看板、快速入口 |
| 课程页 | course.html | 课程学习、习题练习 |

## 6. 主题系统

### 6.1 CSS变量定义
```css
:root {
  --color-primary: #4F46E5;
  --color-primary-hover: #4338CA;
  --color-secondary: #10B981;
  --color-bg: #F9FAFB;
  --color-surface: #FFFFFF;
  --color-text: #111827;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}

[data-theme="dark"] {
  --color-primary: #818CF8;
  --color-primary-hover: #6366F1;
  --color-secondary: #34D399;
  --color-bg: #111827;
  --color-surface: #1F2937;
  --color-text: #F9FAFB;
  --color-text-secondary: #9CA3AF;
  --color-border: #374151;
}
```

## 7. Pyodide预加载策略

1. 首屏不加载Pyodide，用户点击"运行"时才初始化
2. 预加载pandas包到indexedDB，减少每次加载时间
3. 首次运行显示进度条，后续运行使用缓存
4. 大数据运算(>5秒)弹出卡顿提醒

## 8. 响应式断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | <768px | 单栏上下布局 |
| Tablet | 768-1200px | 双栏，目录可折叠 |
| Desktop | >1200px | 三栏完整布局 |

## 9. localStorage数据模型

```javascript
// 完整数据结构
{
  "python-learning": {
    "version": "1.0",
    "theme": "light",
    "progress": {
      "completedLessons": [],   // 已完成课程ID数组
      "completedExercises": [],  // 已完成习题ID数组
      "currentLesson": null     // 当前课程ID
    },
    "wrongAnswers": [],         // 错题记录
    "notes": {},                // 笔记 {lessonId: content}
    "codeCache": {},            // 代码缓存 {lessonId: code}
    "stats": {
      "totalTime": 0,           // 累计学习时间(秒)
      "lastVisit": null,        // 上次访问时间戳
      "visitCount": 0           // 访问次数
    }
  }
}
```

## 10. 性能优化

1. CSS/JS文件压缩合并
2. 图片资源懒加载
3. Pyodide包缓存到IndexedDB
4. 代码编辑器按需加载
5. 课程数据按章节懒加载
