/**
 * 课程数据 - 三层体系，共22节课程，44道配套习题
 * 包含：入门层12节、实底层5节、进阶层5节
 */

const COURSES = [
  // ========== 入门层 - Python基础语法 ==========
  {
    id: 'chapter-1',
    title: '入门层：Python基础语法',
    description: '从零开始学习Python基础，包含变量、数据类型、条件判断、循环、函数、列表、字典等内容',
    icon: '📚',
    tasks: [
      {
        id: 'lesson-1-1',
        title: '第1节：Hello World',
        content: `
<h2>Hello World - 你的第一个Python程序</h2>
<p>学习编程的传统方式，从打印 "Hello World" 开始。</p>

<h3>什么是print函数？</h3>
<p><span class="term-highlight" data-term="print">print()</span> 是Python中最常用的内置函数之一，它可以将内容输出到屏幕上。</p>

<h3>基本用法</h3>
<pre><code>print("Hello World")</code></pre>

<h3>尝试修改内容</h3>
<p>试着把引号里的内容改成你自己的名字，然后点击运行按钮看看效果！</p>

<h3>小提示</h3>
<ul>
  <li>字符串需要用引号包围（单引号或双引号都可以）</li>
  <li>注意使用英文输入法，不要用中文引号</li>
</ul>
        `,
        templateCode: '# 在下方打印 Hello World\nprint("Hello World")',
        solution: 'print("Hello World")',
        glossary: [
          { term: 'print', definition: 'Python内置函数，用于向标准输出设备（屏幕）打印文本。可以接受多个参数，用逗号分隔。' },
          { term: '字符串', definition: '用引号包围的一段文本，如"Hello World"，可以是单引号或双引号。' },
          { term: '函数', definition: '组织好的、可重复使用的代码块，用于执行特定功能。' }
        ]
      },
      {
        id: 'lesson-1-2',
        title: '第2节：变量与数据类型',
        content: `
<h2>变量与数据类型</h2>
<p>变量是存储数据的容器，Python有多种数据类型。</p>

<h3>基本数据类型</h3>
<ul>
  <li><strong>整数</strong>：如 1, 100, -5</li>
  <li><strong>浮点数</strong>：如 3.14, -0.5</li>
  <li><strong>字符串</strong>：如 "Hello", 'Python'</li>
  <li><strong>布尔值</strong>：True 或 False</li>
</ul>

<h3>变量赋值</h3>
<pre><code>name = "小明"
age = 20
height = 1.75
is_student = True</code></pre>

<h3>查看类型</h3>
<p>使用 type() 函数查看变量的数据类型。</p>
        `,
        templateCode: '# 创建变量并打印\nname = "小明"\nage = 20\nheight = 1.75\nis_student = True\n\nprint("姓名:", name)\nprint("年龄:", age)\nprint("身高:", height)\nprint("是否学生:", is_student)',
        solution: 'name = "小明"\nage = 20\nheight = 1.75\nis_student = True\nprint("姓名:", name)\nprint("年龄:", age)',
        glossary: [
          { term: '变量', definition: '存储数据的命名容器，可以在程序中随时修改其值。' },
          { term: 'int', definition: '整数类型，如1, 100, -5，没有小数部分。' },
          { term: 'float', definition: '浮点数类型，如3.14, 1.75，带有小数部分。' },
          { term: 'bool', definition: '布尔类型，只有True和False两个值。' }
        ]
      },
      {
        id: 'lesson-1-3',
        title: '第3节：字符串操作',
        content: `
<h2>字符串操作</h2>
<p>字符串是Python中最常用的数据类型之一，有很多有用的操作方法。</p>

<h3>字符串拼接</h3>
<pre><code>greeting = "Hello" + " " + "World"</code></pre>

<h3>字符串重复</h3>
<pre><code>stars = "*" * 10</code></pre>

<h3>常用方法</h3>
<ul>
  <li>len() - 获取字符串长度</li>
  <li>upper() - 转换为大写</li>
  <li>lower() - 转换为小写</li>
  <li>strip() - 去除首尾空格</li>
</ul>
        `,
        templateCode: '# 字符串操作练习\nname = "Python"\n\nprint("长度:", len(name))\nprint("大写:", name.upper())\nprint("小写:", name.lower())\nprint("拼接:", name + " " + "入门")',
        solution: 'name = "Python"\nprint("长度:", len(name))\nprint("大写:", name.upper())',
        glossary: [
          { term: '字符串方法', definition: '字符串自带的函数，可以通过 . 调用，如 .upper()' }
        ]
      },
      {
        id: 'lesson-1-4',
        title: '第4节：数字运算',
        content: `
<h2>数字运算</h2>
<p>Python 可以进行各种数学运算。</p>

<h3>基本运算符</h3>
<pre><code>+  加法
-  减法
*  乘法
/  除法
// 整除
%  取余
** 幂运算</code></pre>

<h3>运算示例</h3>
<pre><code>print(3 + 5)    # 8
print(10 - 3)   # 7
print(4 * 5)    # 20
print(10 / 2)   # 5.0
print(10 // 3)  # 3
print(10 % 3)   # 1
print(2 ** 3)   # 8</code></pre>
        `,
        templateCode: '# 数字运算练习\na = 15\nb = 4\n\nprint("加法:", a + b)\nprint("减法:", a - b)\nprint("乘法:", a * b)\nprint("除法:", a / b)\nprint("整除:", a // b)\nprint("取余:", a % b)\nprint("平方:", a ** 2)',
        solution: 'a = 15\nb = 4\nprint("加法:", a + b)\nprint("乘法:", a * b)',
        glossary: [
          { term: '运算符', definition: '用于执行数学或逻辑运算的符号。' },
          { term: '整除', definition: '只取商的整数部分，如 10 // 3 = 3' },
          { term: '取余', definition: '取除法的余数，如 10 % 3 = 1' }
        ]
      },
      {
        id: 'lesson-1-5',
        title: '第5节：条件判断',
        content: `
<h2>条件判断</h2>
<p>使用 if-elif-else 语句根据条件执行不同的代码。</p>

<h3>基本结构</h3>
<pre><code>if 条件1:
    # 条件1为真时执行
elif 条件2:
    # 条件2为真时执行
else:
    # 都不满足时执行</code></pre>

<h3>比较运算符</h3>
<pre><code>== 等于
!= 不等于
>  大于
<  小于
>= 大于等于
<= 小于等于</code></pre>

<h3>示例：判断成绩等级</h3>
<pre><code>score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"
print(grade)</code></pre>
        `,
        templateCode: '# 成绩等级判断\nscore = 75\n\nif score >= 90:\n    print("优秀")\nelif score >= 80:\n    print("良好")\nelif score >= 60:\n    print("及格")\nelse:\n    print("不及格")',
        solution: 'score = 75\nif score >= 90:\n    print("优秀")\nelif score >= 80:\n    print("良好")\nelse:\n    print("及格")',
        glossary: [
          { term: 'if', definition: '条件语句，根据条件是否为真来决定执行代码块。' },
          { term: 'elif', definition: 'else if的缩写，当前面条件不满足时检查这个条件。' },
          { term: 'else', definition: '条件语句的兜底分支，所有条件都不满足时执行。' }
        ]
      },
      {
        id: 'lesson-1-6',
        title: '第6节：for循环',
        content: `
<h2>for循环</h2>
<p>for循环用于遍历序列或重复执行代码块。</p>

<h3>基本用法</h3>
<pre><code>for i in range(1, 11):
    print(i)</code></pre>

<h3>range函数</h3>
<p>range(start, end) 生成从start到end-1的整数序列。</p>

<h3>遍历列表</h3>
<pre><code>fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(fruit)</code></pre>
        `,
        templateCode: '# for循环练习\n# 打印1-10的平方\nfor i in range(1, 11):\n    square = i ** 2\n    print(f"{i}的平方是 {square}")',
        solution: 'for i in range(1, 11):\n    square = i ** 2\n    print(f"{i}的平方是 {square}")',
        glossary: [
          { term: 'for', definition: 'for循环用于遍历序列中的每个元素，重复执行代码块。' },
          { term: 'range', definition: '生成整数序列的函数，常用于循环中。' }
        ]
      },
      {
        id: 'lesson-1-7',
        title: '第7节：while循环',
        content: `
<h2>while循环</h2>
<p>while循环在条件为真时持续执行代码块。</p>

<h3>基本用法</h3>
<pre><code>count = 1
while count <= 10:
    print(count)
    count += 1</code></pre>

<h3>break和continue</h3>
<ul>
  <li>break - 跳出整个循环</li>
  <li>continue - 跳过当前循环，进入下一次</li>
</ul>
        `,
        templateCode: '# while循环练习\ncount = 1\nsum_total = 0\n\nwhile count <= 10:\n    sum_total += count\n    count += 1\n\nprint("1-10的和:", sum_total)',
        solution: 'count = 1\nsum_total = 0\nwhile count <= 10:\n    sum_total += count\n    count += 1\nprint("1-10的和:", sum_total)',
        glossary: [
          { term: 'while', definition: 'while循环在条件为真时重复执行代码块。' },
          { term: 'break', definition: '立即跳出当前循环。' },
          { term: 'continue', definition: '跳过本次循环剩余部分，进入下一次循环。' }
        ]
      },
      {
        id: 'lesson-1-8',
        title: '第8节：函数基础',
        content: `
<h2>函数基础</h2>
<p>函数是组织好的、可重复使用的代码块。</p>

<h3>定义函数</h3>
<pre><code>def greet(name):
    return "你好, " + name</code></pre>

<h3>调用函数</h3>
<pre><code>message = greet("小明")
print(message)</code></pre>

<h3>函数参数与返回值</h3>
<p>函数可以有多个参数，也可以返回值。</p>
        `,
        templateCode: '# 函数练习\n# 定义一个加法函数\ndef add(a, b):\n    return a + b\n\n# 调用函数\nresult = add(3, 5)\nprint("3 + 5 =", result)',
        solution: 'def add(a, b):\n    return a + b\nresult = add(3, 5)\nprint("3 + 5 =", result)',
        glossary: [
          { term: 'def', definition: '定义函数的关键字。' },
          { term: '参数', definition: '传递给函数的输入值，放在括号里。' },
          { term: 'return', definition: '从函数返回值的关键字。' }
        ]
      },
      {
        id: 'lesson-1-9',
        title: '第9节：列表操作',
        content: `
<h2>列表操作</h2>
<p>列表是Python中最常用的数据结构之一，用于存储多个元素。</p>

<h3>创建列表</h3>
<pre><code>fruits = ["苹果", "香蕉", "橙子"]
numbers = [1, 2, 3, 4, 5]</code></pre>

<h3>常用操作</h3>
<ul>
  <li>len() - 获取长度</li>
  <li>append() - 添加元素</li>
  <li>pop() - 移除元素</li>
  <li>索引访问 - list[0]</li>
</ul>
        `,
        templateCode: '# 列表操作练习\nfruits = ["苹果", "香蕉", "橙子"]\n\nprint("列表:", fruits)\nprint("长度:", len(fruits))\nprint("第一个:", fruits[0])\n\n# 添加元素\nfruits.append("葡萄")\nprint("添加后:", fruits)',
        solution: 'fruits = ["苹果", "香蕉", "橙子"]\nfruits.append("葡萄")\nprint("添加后:", fruits)',
        glossary: [
          { term: '列表', definition: '有序的元素集合，可以存储不同类型的数据，用方括号 [] 表示。' },
          { term: '索引', definition: '列表中元素的位置，从0开始。' },
          { term: 'append', definition: '在列表末尾添加一个元素。' }
        ]
      },
      {
        id: 'lesson-1-10',
        title: '第10节：字典操作',
        content: `
<h2>字典操作</h2>
<p>字典是键值对的集合，通过键快速查找值。</p>

<h3>创建字典</h3>
<pre><code>person = {
    "name": "小明",
    "age": 20,
    "city": "北京"
}</code></pre>

<h3>访问值</h3>
<pre><code>print(person["name"])  # "小明"</code></pre>

<h3>常用操作</h3>
<ul>
  <li>get() - 安全获取值</li>
  <li>keys() - 获取所有键</li>
  <li>values() - 获取所有值</li>
</ul>
        `,
        templateCode: '# 字典操作练习\nstudent = {\n    "name": "小红",\n    "age": 18,\n    "grade": "高二",\n    "city": "上海"\n}\n\nprint("姓名:", student["name"])\nprint("年龄:", student["age"])\nprint("年级:", student["grade"])',
        solution: 'student = {\n    "name": "小红",\n    "age": 18,\n    "grade": "高二"\n}\nprint("姓名:", student["name"])\nprint("年龄:", student["age"])',
        glossary: [
          { term: '字典', definition: '键值对的集合，用花括号 {} 表示，通过键快速查找值。' },
          { term: '键', definition: '字典中用于查找值的标识符，必须唯一。' },
          { term: '值', definition: '字典中存储的数据，可以是任何类型。' }
        ]
      },
      {
        id: 'lesson-1-11',
        title: '第11节：字符串格式化',
        content: `
<h2>字符串格式化</h2>
<p>有几种方式可以格式化字符串。</p>

<h3>f-string方式（推荐）</h3>
<pre><code>name = "小明"
age = 20
print(f"我是{name}，今年{age}岁")</code></pre>

<h3>format方法</h3>
<pre><code>print("我是{}，今年{}岁".format(name, age))</code></pre>

<h3>%占位符</h3>
<pre><code>print("我是%s，今年%d岁" % (name, age))</code></pre>
        `,
        templateCode: '# 字符串格式化练习\nname = "小明"\nage = 20\ncity = "北京"\n\nprint(f"我是{name}，今年{age}岁，来自{city}")',
        solution: 'name = "小明"\nage = 20\ncity = "北京"\nprint(f"我是{name}，今年{age}岁，来自{city}")',
        glossary: [
          { term: 'f-string', definition: 'Python 3.6+ 引入的格式化字符串方式，简洁方便。' }
        ]
      },
      {
        id: 'lesson-1-12',
        title: '第12节：异常处理入门',
        content: `
<h2>异常处理入门</h2>
<p>使用 try-except 处理可能出错的代码。</p>

<h3>基本结构</h3>
<pre><code>try:
    # 可能出错的代码
    num = int(input("请输入数字"))
except ValueError:
    print("输入无效")
</code></pre>

<h3>常见异常类型</h3>
<ul>
  <li>ValueError - 值错误</li>
  <li>TypeError - 类型错误</li>
  <li>IndexError - 索引错误</li>
</ul>
        `,
        templateCode: '# 异常处理练习\ntry:\n    num1 = int(input("第一个数: "))\n    num2 = int(input("第二个数: "))\n    result = num1 / num2\n    print(f"结果: {result}")\nexcept ZeroDivisionError:\n    print("不能除以零")\nexcept ValueError:\n    print("请输入有效数字")',
        solution: 'try:\n    num1 = int(input("第一个数: "))\n    num2 = int(input("第二个数: "))\n    result = num1 / num2\n    print(f"结果: {result}")\nexcept ZeroDivisionError:\n    print("不能除以零")\nexcept ValueError:\n    print("请输入有效数字")',
        glossary: [
          { term: 'try', definition: '尝试执行代码块的关键字。' },
          { term: 'except', definition: '捕获并处理异常的关键字。' },
          { term: '异常', definition: '程序运行时发生的错误。' }
        ]
      }
    ],
    quizzes: [
      { id: 'quiz-1-1', title: 'Hello World输出', type: 'code', question: '请编写代码，打印 "Hello Python"', templateCode: '# 请输入代码', solution: 'print("Hello Python")', explanation: '使用print函数即可，注意引号。' },
      { id: 'quiz-1-2', title: '变量赋值', type: 'fill', question: '创建一个名为 age 的变量，赋值为 25', templateCode: '# 请输入代码', solution: 'age = 25', explanation: '变量赋值使用等号。' },
      { id: 'quiz-1-3', title: '字符串拼接', type: 'code', question: '将 "Hello" 和 "World" 拼接起来打印', templateCode: '# 请输入代码', solution: 'print("Hello" + " " + "World")', explanation: '使用 + 拼接字符串。' },
      { id: 'quiz-1-4', title: '计算圆面积', type: 'code', question: '计算半径为5的圆面积（π=3.14）', templateCode: '# 请输入代码', solution: 'radius = 5\narea = 3.14 * radius ** 2\nprint(area)', explanation: '面积公式 πr²' },
      { id: 'quiz-1-5', title: '判断奇偶', type: 'code', question: '判断数字7是奇数还是偶数', templateCode: '# 请输入代码', solution: 'num = 7\nif num % 2 == 0:\n    print("偶数")\nelse:\n    print("奇数")', explanation: '用取余判断。' }
    ]
  },

  {
    id: 'chapter-2',
    title: '入门层练习题',
    description: '巩固Python基础语法的配套习题',
    icon: '📝',
    tasks: [
      {
        id: 'lesson-2-1',
        title: '练习题1-5',
        content: '<h2>练习题组</h2><p>完成下面的练习题来巩固所学知识。</p>',
        templateCode: '# 请完成右侧的练习题',
        solution: '',
        glossary: []
      }
    ],
    quizzes: [
      { id: 'quiz-2-1', title: '打印1-10', type: 'code', question: '使用for循环打印1-10', templateCode: '', solution: 'for i in range(1, 11): print(i)', explanation: 'range生成序列' },
      { id: 'quiz-2-2', title: '求和函数', type: 'code', question: '写一个函数，计算两个数的和', templateCode: '', solution: 'def add(a, b): return a + b', explanation: '函数定义用def' },
      { id: 'quiz-2-3', title: '列表求和', type: 'code', question: '计算列表[1,2,3,4,5]的和', templateCode: '', solution: 'sum([1,2,3,4,5])', explanation: 'sum函数求和' },
      { id: 'quiz-2-4', title: '字典访问', type: 'code', question: '打印字典person中的name值', templateCode: 'person = {"name":"小明"}', solution: 'person = {"name":"小明"}\nprint(person["name"])', explanation: '通过键访问值' },
      { id: 'quiz-2-5', title: '字符统计', type: 'code', question: '统计字符串"hello"的长度', templateCode: '', solution: 'print(len("hello"))', explanation: 'len函数获取长度' },
      { id: 'quiz-2-6', title: '平方列表', type: 'code', question: '生成1-5的平方列表', templateCode: '', solution: 'print([i**2 for i in range(1,6)])', explanation: '列表推导式' }
    ]
  },

  // ========== 实底层 - Pandas数据分析 ==========
  {
    id: 'chapter-3',
    title: '实底层：Pandas数据分析',
    description: '学习数据分析工具Pandas，从入门到实战',
    icon: '📊',
    tasks: [
      {
        id: 'lesson-3-1',
        title: '第13节：Pandas入门与Series',
        content: `
<h2>Pandas入门与Series</h2>
<p>Pandas是Python中最流行的数据分析库。</p>

<h3>导入库</h3>
<pre><code>import pandas as pd
import numpy as np</code></pre>

<h3>创建Series</h3>
<pre><code>s = pd.Series([1, 3, 5, 7, 9])
print(s)</code></pre>

<h3>Series特点</h3>
<ul>
  <li>一维数组，类似列表</li>
  <li>有索引标签</li>
  <li>支持各种数学运算</li>
</ul>
        `,
        templateCode: 'import pandas as pd\n\n# 创建Series\ns = pd.Series([10, 20, 30, 40, 50])\nprint("Series:")\nprint(s)\nprint("\\n值:", s.values)\nprint("索引:", s.index)',
        solution: 'import pandas as pd\ns = pd.Series([10, 20, 30, 40, 50])\nprint(s)',
        glossary: [
          { term: 'pandas', definition: '强大的数据分析库，提供高效的数据结构。' },
          { term: 'Series', definition: '一维带标签的数据数组。' },
          { term: '索引', definition: 'Series或DataFrame中用于标识行的标签。' }
        ]
      },
      {
        id: 'lesson-3-2',
        title: '第14节：DataFrame基础操作',
        content: `
<h2>DataFrame基础操作</h2>
<p>DataFrame是Pandas的核心数据结构，类似Excel表格。</p>

<h3>创建DataFrame</h3>
<pre><code>df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [20, 19, 21],
    "城市": ["北京", "上海", "广州"]
})</code></pre>

<h3>查看数据</h3>
<ul>
  <li>df.head() - 前几行</li>
  <li>df.tail() - 后几行</li>
  <li>df.info() - 信息</li>
  <li>df.describe() - 统计</li>
</ul>
        `,
        templateCode: 'import pandas as pd\n\n# 创建DataFrame\ndata = {\n    "产品": ["手机", "电脑", "平板"],\n    "价格": [3999, 6999, 2499],\n    "销量": [100, 50, 80]\n}\ndf = pd.DataFrame(data)\nprint(df)',
        solution: 'import pandas as pd\ndata = {"产品":["手机","电脑","平板"], "价格":[3999,6999,2499]}\ndf = pd.DataFrame(data)\nprint(df)',
        glossary: [
          { term: 'DataFrame', definition: '二维表格型数据结构，有行和列。' },
          { term: 'head', definition: '查看前N行，默认5行。' },
          { term: 'describe', definition: '生成统计描述信息。' }
        ]
      },
      {
        id: 'lesson-3-3',
        title: '第15节：数据筛选与查看',
        content: `
<h2>数据筛选与查看</h2>
<p>学习如何选择和过滤DataFrame中的数据。</p>

<h3>选择列</h3>
<pre><code>df["产品"]           # 单列
df[["产品", "价格"]]  # 多列</code></pre>

<h3>筛选行</h3>
<pre><code>df[df["价格"] > 3000]  # 条件筛选</code></pre>

<h3>示例</h3>
<p>筛选价格大于3000的产品。</p>
        `,
        templateCode: 'import pandas as pd\n\ndata = {\n    "产品": ["手机", "电脑", "平板", "耳机"],\n    "价格": [3999, 6999, 2499, 499],\n    "销量": [100, 50, 80, 200]\n}\ndf = pd.DataFrame(data)\n\nprint("所有数据:")\nprint(df)\nprint("\\n价格大于3000:")\nprint(df[df["价格"] > 3000])',
        solution: 'import pandas as pd\ndata = {"产品":["手机","电脑","平板"], "价格":[3999,6999,2499]}\ndf = pd.DataFrame(data)\nprint(df[df["价格"] > 3000])',
        glossary: [
          { term: '布尔索引', definition: '用布尔值筛选数据。' },
          { term: '列选择', definition: '通过列名选择DataFrame的列。' }
        ]
      },
      {
        id: 'lesson-3-4',
        title: '第16节：统计计算入门',
        content: `
<h2>统计计算入门</h2>
<p>Pandas提供丰富的统计计算函数。</p>

<h3>常用统计函数</h3>
<pre><code>df["价格"].sum()      # 总和
df["价格"].mean()     # 平均值
df["价格"].max()      # 最大值
df["价格"].min()      # 最小值
df["价格"].count()    # 计数</code></pre>

<h3>示例</h3>
<p>计算销售总额和平均价格。</p>
        `,
        templateCode: 'import pandas as pd\n\ndata = {\n    "产品": ["手机", "电脑", "平板", "耳机"],\n    "价格": [3999, 6999, 2499, 499],\n    "销量": [100, 50, 80, 200]\n}\ndf = pd.DataFrame(data)\n\ndf["销售额"] = df["价格"] * df["销量"]\n\nprint("平均价格:", df["价格"].mean())\nprint("总销量:", df["销量"].sum())\nprint("总销售额:", df["销售额"].sum())',
        solution: 'import pandas as pd\ndata = {"产品":["手机","电脑"], "价格":[3999,6999], "销量":[100,50]}\ndf = pd.DataFrame(data)\ndf["销售额"] = df["价格"] * df["销量"]\nprint("总销售额:", df["销售额"].sum())',
        glossary: [
          { term: 'sum', definition: '计算总和。' },
          { term: 'mean', definition: '计算平均值。' },
          { term: 'max', definition: '找最大值。' }
        ]
      },
      {
        id: 'lesson-3-5',
        title: '第17节：简单电商数据分析',
        content: `
<h2>简单电商数据分析</h2>
<p>让我们用前面学的知识做一次简单的电商数据分析。</p>

<h3>业务指标</h3>
<ul>
  <li>GMV - 成交总额</li>
  <li>客单价 - 平均每单金额</li>
  <li>销量 - 商品总销量</li>
</ul>

<h3>分析步骤</h3>
<ol>
  <li>加载数据</li>
  <li>数据清洗</li>
  <li>计算指标</li>
  <li>分析结果</li>
</ol>
        `,
        templateCode: 'import pandas as pd\nimport numpy as np\n\n# 生成电商数据\nnp.random.seed(42)\nn = 200\norders = pd.DataFrame({\n    "订单ID": range(1, n+1),\n    "商品ID": np.random.randint(1, 11, n),\n    "数量": np.random.randint(1, 5, n),\n    "单价": np.random.uniform(100, 2000, n).round(2),\n    "地区": np.random.choice(["华东","华南","华北","华中"], n)\n})\norders["总金额"] = orders["数量"] * orders["单价"]\n\n# 计算指标\nprint("订单数:", len(orders))\nprint("GMV:", orders["总金额"].sum().round(2))\nprint("客单价:", orders["总金额"].mean().round(2))\nprint("\\n地区销售:")\nprint(orders.groupby("地区")["总金额"].sum().sort_values(ascending=False))',
        solution: 'import pandas as pd\nimport numpy as np\nnp.random.seed(42)\norders = pd.DataFrame({\n    "地区": np.random.choice(["华东","华南","华北"], 100),\n    "总金额": np.random.uniform(100, 2000, 100)\n})\nprint("GMV:", orders["总金额"].sum())',
        glossary: [
          { term: 'GMV', definition: '商品交易总额，是电商核心指标。' },
          { term: '客单价', definition: '平均每单金额，GMV/订单数。' },
          { term: 'groupby', definition: '按列分组，进行聚合运算。' }
        ]
      }
    ],
    quizzes: [
      { id: 'quiz-3-1', title: '创建DataFrame', type: 'code', question: '创建一个简单的DataFrame，包含姓名和年龄', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"姓名":["小明","小红"], "年龄":[20,19]})\nprint(df)', explanation: 'DataFrame可以从字典创建' },
      { id: 'quiz-3-2', title: '计算总和', type: 'code', question: '计算列["销量"]的总和', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"销量":[10,20,30]})\nprint(df["销量"].sum())', explanation: '用sum方法求和' },
      { id: 'quiz-3-3', title: '筛选数据', type: 'code', question: '筛选销量>100的行', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"销量":[80, 120, 150]})\nprint(df[df["销量"]>100])', explanation: '布尔索引筛选' },
      { id: 'quiz-3-4', title: '计算平均值', type: 'code', question: '计算价格列的平均值', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"价格":[10,20,30]})\nprint(df["价格"].mean())', explanation: 'mean方法计算平均值' },
      { id: 'quiz-3-5', title: '排序数据', type: 'code', question: '按销售额降序排序', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"产品":["A","B"], "销售额":[100,200]})\nprint(df.sort_values("销售额", ascending=False))', explanation: 'sort_values排序' }
    ]
  },

  {
    id: 'chapter-4',
    title: '实底层练习题',
    description: 'Pandas数据处理配套习题',
    icon: '💻',
    tasks: [],
    quizzes: [
      { id: 'quiz-4-1', title: '添加新列', type: 'code', question: '给df添加一列"总金额"=数量*单价', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"数量":[2,3], "单价":[10,20]})\ndf["总金额"] = df["数量"] * df["单价"]\nprint(df)', explanation: '可以直接赋值新列' },
      { id: 'quiz-4-2', title: '分组统计', type: 'code', question: '按地区分组，统计总金额', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"地区":["华东","华东","华南"], "金额":[100,200,150]})\nprint(df.groupby("地区")["金额"].sum())', explanation: 'groupby分组聚合' },
      { id: 'quiz-4-3', title: '查看前5行', type: 'code', question: '打印DataFrame的前3行', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"a":[1,2,3,4,5]})\nprint(df.head(3))', explanation: 'head方法查看前N行' },
      { id: 'quiz-4-4', title: '查找最大值', type: 'code', question: '找出销售最高的金额', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"销售":[100,200,300]})\nprint(df["销售"].max())', explanation: 'max找最大值' },
      { id: 'quiz-4-5', title: '值计数', type: 'code', question: '统计每个地区出现的次数', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"地区":["华东","华南","华东"]})\nprint(df["地区"].value_counts())', explanation: 'value_counts计数' },
      { id: 'quiz-4-6', title: '排序', type: 'code', question: '按价格升序排序', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"价格":[300,100,200]})\nprint(df.sort_values("价格"))', explanation: '默认升序排序' }
    ]
  },

  // ========== 进阶层 - 综合应用 ==========
  {
    id: 'chapter-5',
    title: '进阶层：综合应用',
    description: '数据清洗、分组聚合、多表合并、业务指标、综合项目',
    icon: '🚀',
    tasks: [
      {
        id: 'lesson-5-1',
        title: '第18节：数据清洗与处理',
        content: `
<h2>数据清洗与处理</h2>
<p>真实世界的数据往往有各种问题，需要清洗。</p>

<h3>处理缺失值</h3>
<pre><code>df.isnull().sum()           # 查看缺失数量
df.dropna()                 # 删除缺失值
df.fillna(0)                # 填充0
df.fillna(df.mean())        # 填充平均值</code></pre>

<h3>处理重复值</h3>
<pre><code>df.duplicated().sum()       # 查看重复数
df.drop_duplicates()        # 删除重复</code></pre>

<h3>检测异常值</h3>
<pre><code># IQR方法
Q1 = df["价格"].quantile(0.25)
Q3 = df["价格"].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
df = df[(df["价格"] >= lower) & (df["价格"] <= upper)]</code></pre>
        `,
        templateCode: 'import pandas as pd\nimport numpy as np\n\n# 创建有问题的数据\ndata = {\n    "产品": ["手机", np.nan, "平板", "耳机", "手机"],\n    "价格": [3999, 6999, np.nan, 499, 3999],\n    "销量": [100, 50, 80, 200, 100]\n}\ndf = pd.DataFrame(data)\n\nprint("原始数据:")\nprint(df)\nprint("\\n缺失值统计:")\nprint(df.isnull().sum())\nprint("\\n重复行数:", df.duplicated().sum())\n\n# 清洗数据\ndf_clean = df.dropna().drop_duplicates()\nprint("\\n清洗后:")\nprint(df_clean)',
        solution: 'import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({"价格":[100, np.nan, 300]})\ndf_clean = df.fillna(df.mean())\nprint(df_clean)',
        glossary: [
          { term: '缺失值', definition: '数据中为空或NaN的值。' },
          { term: '重复值', definition: '完全相同的行。' },
          { term: '异常值', definition: '显著偏离正常范围的值。' }
        ]
      },
      {
        id: 'lesson-5-2',
        title: '第19节：分组聚合与统计',
        content: `
<h2>分组聚合与统计</h2>
<p>groupby是数据分析中最强大的功能之一。</p>

<h3>简单分组</h3>
<pre><code>df.groupby("地区")["销售额"].sum()</code></pre>

<h3>多个聚合</h3>
<pre><code>df.groupby("地区").agg({
    "销售额": ["sum", "mean", "count"],
    "订单数": "sum"
})</code></pre>

<h3>多重分组</h3>
<pre><code>df.groupby(["地区", "月份"])["销售额"].sum()</code></pre>
        `,
        templateCode: 'import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\ndata = {\n    "地区": np.random.choice(["华东","华南","华北"], 100),\n    "产品": np.random.choice(["手机","电脑","平板"], 100),\n    "销售额": np.random.uniform(1000, 5000, 100).round(2)\n}\ndf = pd.DataFrame(data)\n\nprint("按地区统计:")\nby_region = df.groupby("地区")["销售额"].agg(["sum", "mean", "count"])\nby_region.columns = ["总销售额", "平均", "订单数"]\nprint(by_region)\nprint("\\n按地区和产品统计:")\nby_region_prod = df.groupby(["地区", "产品"])["销售额"].sum().unstack()\nprint(by_region_prod)',
        solution: 'import pandas as pd\nimport numpy as np\nnp.random.seed(42)\ndf = pd.DataFrame({"地区":np.random.choice(["华东","华南"],50), "销售额":np.random.uniform(1000,5000,50)})\nprint(df.groupby("地区")["销售额"].sum())',
        glossary: [
          { term: 'agg', definition: '可以同时应用多个聚合函数。' },
          { term: 'unstack', definition: '将行索引转为列，便于查看。' }
        ]
      },
      {
        id: 'lesson-5-3',
        title: '第20节：多表合并与关联',
        content: `
<h2>多表合并与关联</h2>
<p>实际数据经常分布在多个表中，需要合并分析。</p>

<h3>concat拼接</h3>
<pre><code>pd.concat([df1, df2], axis=0)  # 行拼接
pd.concat([df1, df2], axis=1)  # 列拼接</code></pre>

<h3>merge合并</h3>
<pre><code>pd.merge(orders, products, on="产品ID")</code></pre>

<h3>合并方式</h3>
<ul>
  <li>inner（默认）- 只保留匹配的</li>
  <li>left - 保留左表全部</li>
  <li>right - 保留右表全部</li>
  <li>outer - 保留两边全部</li>
</ul>
        `,
        templateCode: 'import pandas as pd\n\n# 订单表\norders = pd.DataFrame({\n    "订单ID": [1, 2, 3],\n    "产品ID": [101, 102, 101],\n    "数量": [2, 1, 3]\n})\n\n# 产品表\nproducts = pd.DataFrame({\n    "产品ID": [101, 102, 103],\n    "产品名称": ["手机", "电脑", "平板"],\n    "单价": [3999, 6999, 2499]\n})\n\nprint("订单表:")\nprint(orders)\nprint("\\n产品表:")\nprint(products)\n\n# 合并\nmerged = pd.merge(orders, products, on="产品ID")\nmerged["总金额"] = merged["数量"] * merged["单价"]\nprint("\\n合并后:")\nprint(merged)',
        solution: 'import pandas as pd\norders = pd.DataFrame({"产品ID":[101,102], "数量":[2,1]})\nproducts = pd.DataFrame({"产品ID":[101,102], "产品":["手机","电脑"]})\nmerged = pd.merge(orders, products, on="产品ID")\nprint(merged)',
        glossary: [
          { term: 'concat', definition: '沿行或列方向拼接对象。' },
          { term: 'merge', definition: '类似SQL的join，通过键合并DataFrame。' },
          { term: 'inner join', definition: '内连接，只保留两边都有的。' }
        ]
      },
      {
        id: 'lesson-5-4',
        title: '第21节：业务指标计算',
        content: `
<h2>业务指标计算</h2>
<p>电商业务常用指标计算实践。</p>

<h3>核心指标</h3>
<ul>
  <li>GMV = 成交总额</li>
  <li>客单价 = GMV / 订单数</li>
  <li>件单价 = GMV / 商品件数</li>
  <li>转化率 = 下单用户 / 访客</li>
  <li>复购率 = 复购用户 / 总用户</li>
</ul>

<h3>用户分层</h3>
<p>按购买金额将用户分为高中低三档。</p>
        `,
        templateCode: 'import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\n\n# 模拟订单数据\nn_orders = 500\norders = pd.DataFrame({\n    "用户ID": np.random.randint(1, 201, n_orders),\n    "订单日期": pd.date_range("2024-01-01", periods=n_orders, freq="H"),\n    "金额": np.random.uniform(50, 5000, n_orders).round(2)\n})\n\n# 用户指标\nuser_stats = orders.groupby("用户ID").agg(\n    订单数=("金额", "count"),\n    总消费=("金额", "sum"),\n    最近下单=("订单日期", "max")\n).reset_index()\n\n# 用户分层\nuser_stats["层级"] = pd.cut(user_stats["总消费"],\n                            bins=[0, 1000, 5000, float("inf")],\n                            labels=["低消费", "中消费", "高消费"])\n\nprint("GMV:", orders["金额"].sum().round(2))\nprint("订单数:", len(orders))\nprint("客单价:", orders["金额"].mean().round(2))\nprint("用户数:", user_stats["用户ID"].nunique())\nprint("\\n用户分层:")\nprint(user_stats["层级"].value_counts())',
        solution: 'import pandas as pd\nimport numpy as np\norders = pd.DataFrame({"用户ID":np.random.randint(1,101,200), "金额":np.random.uniform(50,1000,200)})\nprint("GMV:", orders["金额"].sum())',
        glossary: [
          { term: '复购率', definition: '重复购买的用户比例。' },
          { term: 'RFM', definition: 'Recency最近购买、Frequency频率、Monetary金额，经典的用户分层模型。' },
          { term: 'cut', definition: '将连续值切分为离散区间。' }
        ]
      },
      {
        id: 'lesson-5-5',
        title: '第22节：综合实战项目',
        content: `
<h2>综合实战项目：电商数据分析</h2>
<p>把前面所有的知识结合起来，做一次完整的数据分析。</p>

<h3>项目流程</h3>
<ol>
  <li>数据获取与加载</li>
  <li>数据清洗与预处理</li>
  <li>探索性数据分析</li>
  <li>指标计算</li>
  <li>分析报告</li>
</ol>

<h3>分析方向</h3>
<ul>
  <li>销售趋势分析</li>
  <li>商品销量排行</li>
  <li>地区销售对比</li>
  <li>用户行为分析</li>
</ul>
        `,
        templateCode: 'import pandas as pd\nimport numpy as np\n\n# 完整电商数据模拟\nnp.random.seed(42)\n\n# 日期范围\ndates = pd.date_range("2024-01-01", "2024-06-30", freq="D")\n\n# 订单数据\norders = []\nfor date in dates:\n    daily_orders = np.random.poisson(20)\n    for _ in range(daily_orders):\n        orders.append({\n            "日期": date,\n            "产品ID": np.random.randint(1, 21),\n            "类别": np.random.choice(["电子","服装","食品","家居","美妆"]),\n            "地区": np.random.choice(["华东","华南","华北","华中","西南"]),\n            "数量": np.random.randint(1, 5),\n            "单价": np.random.uniform(20, 3000).round(2)\n        })\n\ndf = pd.DataFrame(orders)\ndf["金额"] = df["数量"] * df["单价"]\ndf["月份"] = df["日期"].dt.to_period("M")\n\nprint("="*50)\nprint("电商数据分析报告")\nprint("="*50)\nprint(f"\\n1. 销售概况")\nprint(f"   总GMV: {df["金额"].sum().round(2)}")\nprint(f"   总订单: {len(df)}")\nprint(f"   客单价: {df["金额"].mean().round(2)}")\n\nprint(f"\\n2. 类别销售TOP5")\ncategory_sales = df.groupby("类别")["金额"].sum().sort_values(ascending=False)\nprint(category_sales.head())\n\nprint(f"\\n3. 地区销售")\nregion_sales = df.groupby("地区")["金额"].sum().sort_values(ascending=False)\nprint(region_sales)',
        solution: 'import pandas as pd\nimport numpy as np\nprint("数据分析项目演示")',
        glossary: [
          { term: 'EDA', definition: '探索性数据分析，通过图表和统计了解数据。' },
          { term: '数据洞察', definition: '从数据中发现有价值的业务信息。' }
        ]
      }
    ],
    quizzes: [
      { id: 'quiz-5-1', title: '填充缺失值', type: 'code', question: '用平均值填充price列的缺失值', templateCode: '', solution: 'import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({"price":[100, np.nan, 300]})\ndf["price"] = df["price"].fillna(df["price"].mean())\nprint(df)', explanation: 'fillna填充' },
      { id: 'quiz-5-2', title: '多聚合', type: 'code', question: '分组求总和和平均值', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"组":["A","A","B"], "值":[10,20,30]})\nprint(df.groupby("组")["值"].agg(["sum", "mean"]))', explanation: 'agg多聚合' },
      { id: 'quiz-5-3', title: '表合并', type: 'code', question: '合并两张表', templateCode: '', solution: 'import pandas as pd\nleft = pd.DataFrame({"id":[1,2], "n":[10,20]})\nright = pd.DataFrame({"id":[1,2], "n2":[30,40]})\nprint(pd.merge(left, right, on="id"))', explanation: 'merge合并' },
      { id: 'quiz-5-4', title: '时间聚合', type: 'code', question: '按月份统计销售额', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"日期":pd.date_range("2024-01-01", periods=100), "销售额":range(100)})\ndf["月"] = df["日期"].dt.to_period("M")\nprint(df.groupby("月")["销售额"].sum())', explanation: 'dt日期属性' },
      { id: 'quiz-5-5', title: '排序TOP', type: 'code', question: '找销售额TOP3产品', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"产品":["A","B","C","D"], "销售额":[100,300,200,400]})\nprint(df.sort_values("销售额", ascending=False).head(3))', explanation: '排序+head' },
      { id: 'quiz-5-6', title: '计算率', type: 'code', question: '计算A类产品占比', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"类别":["A","A","B","C"], "销售额":[10,20,30,40]})\ntotal = df["销售额"].sum()\na_share = df[df["类别"]=="A"]["销售额"].sum()/total\nprint(f"A占比: {a_share:.2%}")', explanation: '条件求和/总和' }
    ]
  },

  // ========== 总题库，包含基础练习 ==========
  {
    id: 'chapter-6',
    title: '基础题库',
    description: '大量基础题目，从易到难，巩固所学',
    icon: '🎯',
    tasks: [],
    quizzes: [
      { id: 'quiz-6-1', title: '打印数字', type: 'code', question: '打印 1 到 5', templateCode: '', solution: 'for i in range(1, 6): print(i)', explanation: 'range生成序列' },
      { id: 'quiz-6-2', title: '求平方', type: 'code', question: '求4的平方', templateCode: '', solution: 'print(4 ** 2)', explanation: '** 幂运算' },
      { id: 'quiz-6-3', title: '字符串反转', type: 'code', question: '反转字符串"hello"', templateCode: '', solution: 's = "hello"\nprint(s[::-1])', explanation: '切片反转' },
      { id: 'quiz-6-4', title: '列表最大值', type: 'code', question: '找列表[3,1,4,2]的最大值', templateCode: '', solution: 'print(max([3,1,4,2]))', explanation: 'max函数' },
      { id: 'quiz-6-5', title: '求和', type: 'code', question: '求1到100的和', templateCode: '', solution: 'print(sum(range(1,101)))', explanation: 'sum+range' },
      { id: 'quiz-6-6', title: '判断闰年', type: 'code', question: '判断2024年是否是闰年', templateCode: '', solution: 'year=2024\nif year%400==0 or (year%4==0 and year%100!=0):\n    print("闰年")\nelse:\n    print("不是")', explanation: '闰年判断规则' },
      { id: 'quiz-6-7', title: '统计字符次数', type: 'code', question: '统计"hello world"中"l"出现的次数', templateCode: '', solution: 'print("hello world".count("l"))', explanation: 'count方法' },
      { id: 'quiz-6-8', title: '阶乘', type: 'code', question: '求5的阶乘', templateCode: '', solution: 'result=1\nfor i in range(1,6): result*=i\nprint(result)', explanation: '阶乘定义' },
      { id: 'quiz-6-9', title: '斐波那契', type: 'code', question: '打印前10个斐波那契数', templateCode: '', solution: 'a,b=0,1\nfor _ in range(10): print(a, end=" "); a,b = b,a+b', explanation: '斐波那契数列' },
      { id: 'quiz-6-10', title: '素数判断', type: 'code', question: '判断17是否是素数', templateCode: '', solution: 'num=17\nis_prime=True\nfor i in range(2,int(num**0.5)+1):\n    if num%i==0:\n        is_prime=False\n        break\nprint(is_prime)', explanation: '素数只能被1和自身整除' },
      { id: 'quiz-6-11', title: 'Pandas创建列', type: 'code', question: '创建一个长度为5的列，值为0', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"col":[0]*5})\nprint(df)', explanation: '[0]*5创建列表' },
      { id: 'quiz-6-12', title: '列重命名', type: 'code', question: '把列名从a改名为A', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"a":[1,2,3]})\ndf = df.rename(columns={"a":"A"})\nprint(df)', explanation: 'rename方法' },
      { id: 'quiz-6-13', title: '删除列', type: 'code', question: '删除列"old"', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"old":[1,2], "new":[3,4]})\ndf = df.drop("old", axis=1)\nprint(df)', explanation: 'drop方法' },
      { id: 'quiz-6-14', title: '应用函数', type: 'code', question: '给价格列乘以1.1涨价10%', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"价格":[100,200]})\ndf["价格"] = df["价格"] * 1.1\nprint(df)', explanation: '广播运算' },
      { id: 'quiz-6-15', title: '透视表', type: 'code', question: '创建简单的透视表', templateCode: '', solution: 'import pandas as pd\ndf = pd.DataFrame({"地区":["华东","华东","华南"], "产品":["A","B","A"], "销量":[10,20,15]})\npt = df.pivot_table(index="地区", columns="产品", values="销量", aggfunc="sum")\nprint(pt)', explanation: 'pivot_table透视' }
    ]
  }
];

window.COURSES = COURSES;
