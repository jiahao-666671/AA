/**
 * 课程内容数据
 * 包含入门、实操、进阶三层课程
 */

/**
 * 电商数据集
 */
const SAMPLE_DATA = {
    orders: `import pandas as pd

# 电商订单数据
data = {
    'order_id': ['DD001', 'DD002', 'DD003', 'DD004', 'DD005', 'DD006', 'DD007', 'DD008'],
    'customer_id': ['KH001', 'KH002', 'KH001', 'KH003', 'KH002', 'KH004', 'KH003', 'KH005'],
    'product': ['手机', '电脑', '平板', '耳机', '手机', '键盘', '鼠标', '显示器'],
    'category': ['数码', '数码', '数码', '配件', '数码', '配件', '配件', '外设'],
    'quantity': [1, 1, 2, 3, 1, 2, 5, 1],
    'unit_price': [2999, 5999, 1999, 299, 2999, 199, 59, 1299],
    'order_date': ['2024-01-01', '2024-01-01', '2024-01-02', '2024-01-02', '2024-01-03', '2024-01-03', '2024-01-04', '2024-01-04']
}
df = pd.DataFrame(data)
df['total'] = df['quantity'] * df['unit_price']
df['order_date'] = pd.to_datetime(df['order_date'])
print("订单数据：")
print(df)
print(f"\\n总订单数: {len(df)}")`,

    customers: `import pandas as pd

# 客户数据
data = {
    'customer_id': ['KH001', 'KH002', 'KH003', 'KH004', 'KH005'],
    'name': ['张三', '李四', '王五', '赵六', '钱七'],
    'age': [28, 35, 42, 25, 38],
    'city': ['北京', '上海', '广州', '深圳', '杭州'],
    'register_date': ['2023-01-15', '2023-03-20', '2023-06-10', '2023-08-05', '2023-11-12']
}
df = pd.DataFrame(data)
df['register_date'] = pd.to_datetime(df['register_date'])
print("客户数据：")
print(df)
print(f"\\n总客户数: {len(df)}")`,

    sales: `import pandas as pd
import numpy as np

# 销售数据
np.random.seed(42)
data = {
    'date': pd.date_range('2024-01-01', periods=30),
    'sales': np.random.randint(1000, 5000, 30),
    'visitors': np.random.randint(5000, 10000, 30)
}
df = pd.DataFrame(data)
df['conversion_rate'] = (df['sales'] / df['visitors'] * 100).round(2)
print("销售数据：")
print(df.head(10))
print(f"\\n平均转化率: {df['conversion_rate'].mean():.2f}%")`
};

/**
 * 课程章节数据
 */
const COURSE_DATA = {
    // ========== 入门层 ==========
    1: {
        title: 'Python基础',
        level: '入门',
        lessons: [
            {
                id: '1-1',
                title: 'Python基础语法',
                content: `# Python基础语法

Python是一门简洁易学的编程语言，让我们从最基本的语法开始。

## 第一个程序

\`\`\`python
print("Hello, World!")
\`\`\`

运行后会输出：Hello, World!

## 变量与赋值

在Python中，变量不需要声明类型，直接赋值即可：

\`\`\`python
name = "张三"    # 字符串
age = 25         # 整数
height = 1.75    # 浮点数
is_student = True  # 布尔值
\`\`\`

## 基础运算

\`\`\`python
a = 10
b = 3

print(a + b)   # 加法: 13
print(a - b)   # 减法: 7
print(a * b)   # 乘法: 30
print(a / b)   # 除法: 3.333...
print(a // b)  # 整除: 3
print(a % b)   # 取余: 1
print(a ** b)  # 幂运算: 1000
\`\`\`

## 字符串操作

\`\`\`python
name = "Python"
print(name.upper())      # 转大写: PYTHON
print(name.lower())      # 转小写: python
print(name[0])           # 索引: P
print(name[0:3])         # 切片: Pyt
\`\`\`

## 试一试

在下方编辑器中修改代码，尝试输出你自己的介绍！`,
                template: `# 在下面编写你的代码
name = "张三"
age = 25

print(f"大家好，我叫{name}，今年{age}岁")
print("很高兴认识大家！")`,
                exercises: [
                    {
                        id: '1-1-1',
                        question: '下面哪个选项是正确的Python变量命名？',
                        options: [
                            { label: 'A', text: '2name = "张三"' },
                            { label: 'B', text: 'my-name = "张三"' },
                            { label: 'C', text: 'my_name = "张三"' },
                            { label: 'D', text: 'class = "张三"' }
                        ],
                        answer: 'C',
                        solution: {
                            text: 'Python变量命名规则：\n1. 必须以字母或下划线开头\n2. 不能使用Python关键字（如class、if、for等）\n3. 只能包含字母、数字和下划线\n4. 区分大小写',
                            code: '# 正确的变量命名示例\nmy_name = "张三"  # ✓\n_name = "李四"    # ✓\nname2 = "王五"    # ✓\n\n# 错误的命名示例\n# 2name = "张三"  # ✗ 不能以数字开头\n# my-name = "张三"  # ✗ 不能包含连字符\n# class = "张三"  # ✗ 不能使用关键字'
                        }
                    },
                    {
                        id: '1-1-2',
                        question: '表达式 print(10 // 3) 的输出结果是？',
                        options: [
                            { label: 'A', text: '3.33' },
                            { label: 'B', text: '3' },
                            { label: 'C', text: '4' },
                            { label: 'D', text: '1' }
                        ],
                        answer: 'B',
                        solution: {
                            text: '// 是Python的整除运算符，返回商的整数部分。\n10除以3等于3.33...，整除结果为3。',
                            code: 'result = 10 // 3\nprint(result)  # 输出: 3'
                        }
                    }
                ]
            },
            {
                id: '1-2',
                title: '数据类型与变量',
                content: `# 数据类型与变量

Python中有多种数据类型，每种类型都有其特定的用途。

## 常用数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| int | 整数 | 10, -5, 0 |
| float | 浮点数 | 3.14, -0.5 |
| str | 字符串 | "Hello" |
| bool | 布尔值 | True, False |
| list | 列表 | [1, 2, 3] |
| dict | 字典 | {"name": "张三"} |

## 列表操作

\`\`\`python
fruits = ["苹果", "香蕉", "橙子"]

# 访问元素
print(fruits[0])    # 苹果
print(fruits[-1])   # 橙子（最后一个）

# 添加元素
fruits.append("葡萄")  # 追加到末尾
fruits.insert(0, "草莓")  # 插入到指定位置

# 删除元素
fruits.remove("香蕉")  # 移除指定元素
popped = fruits.pop()  # 移除最后一个并返回
\`\`\`

## 字典操作

\`\`\`python
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 访问
print(person["name"])       # 张三
print(person.get("age"))    # 25

# 修改
person["age"] = 26

# 添加
person["email"] = "zhang@example.com"

# 删除
del person["city"]
\`\`\`

## 类型转换

\`\`\`python
# 字符串转整数
num = int("123")  # 123

# 整数转字符串
s = str(123)  # "123"

# 转浮点数
f = float("3.14")  # 3.14
\`\`\``,
                template: `# 数据类型练习
# 创建一个包含个人信息的字典

person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 添加职业信息
person["job"] = "数据分析师"

# 打印字典
print("个人信息：")
for key, value in person.items():
    print(f"  {key}: {value}")`,
                exercises: [
                    {
                        id: '1-2-1',
                        question: '如何正确获取列表 fruits = ["苹果", "香蕉", "橙子"] 的最后一个元素？',
                        options: [
                            { label: 'A', text: 'fruits[0]' },
                            { label: 'B', text: 'fruits[3]' },
                            { label: 'C', text: 'fruits[-1]' },
                            { label: 'D', text: 'fruits[last]' }
                        ],
                        answer: 'C',
                        solution: {
                            text: '在Python中，负数索引从-1开始，表示最后一个元素。\n所以fruits[-1]获取的是"橙子"。',
                            code: 'fruits = ["苹果", "香蕉", "橙子"]\nprint(fruits[-1])  # 输出: 橙子'
                        }
                    }
                ]
            },
            {
                id: '1-3',
                title: '条件与循环',
                content: `# 条件与循环

控制程序执行流程是编程的基础。

## 条件语句

\`\`\`python
age = 18

if age >= 18:
    print("已成年")
elif age >= 12:
    print("青少年")
else:
    print("儿童")
\`\`\`

## 比较运算符

| 运算符 | 说明 |
|--------|------|
| == | 等于 |
| != | 不等于 |
| > | 大于 |
| < | 小于 |
| >= | 大于等于 |
| <= | 小于等于 |

## 循环语句

### for循环

\`\`\`python
# 遍历列表
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(fruit)

# 范围循环
for i in range(5):  # 0到4
    print(i)

# 带索引的遍历
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

### while循环

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## 循环控制

- **break**: 跳出循环
- **continue**: 跳过当前迭代

\`\`\`python
for i in range(10):
    if i == 3:
        continue  # 跳过3
    if i == 7:
        break  # 遇到7时退出循环
    print(i)
\`\`\``,
                template: `# 条件与循环练习
# 计算1到100的偶数和

total = 0

for i in range(1, 101):
    if i % 2 == 0:
        total += i

print(f"1到100的偶数和是: {total}")

# 再来一个：找出列表中的最大值
numbers = [23, 45, 12, 67, 89, 34, 56]
max_num = numbers[0]

for num in numbers:
    if num > max_num:
        max_num = num

print(f"列表中的最大值是: {max_num}")`,
                exercises: [
                    {
                        id: '1-3-1',
                        question: '以下代码的输出是什么？\n\nfor i in range(3):\n    print(i)\nelse:\n    print("完成")',
                        options: [
                            { label: 'A', text: '0 1 2 完成' },
                            { label: 'B', text: '0 1 2 3 完成' },
                            { label: 'C', text: '1 2 3 完成' },
                            { label: 'D', text: '完成' }
                        ],
                        answer: 'A',
                        solution: {
                            text: 'range(3)生成0, 1, 2三个数。for循环正常结束后会执行else子句。',
                            code: 'for i in range(3):\n    print(i)\nelse:\n    print("完成")\n# 输出:\n# 0\n# 1\n# 2\n# 完成'
                        }
                    }
                ]
            },
            {
                id: '1-4',
                title: '函数入门',
                content: `# 函数入门

函数是组织代码的基本单元，可以提高代码的复用性。

## 定义函数

\`\`\`python
def greet(name):
    """问候函数"""
    return f"你好，{name}！"

# 调用函数
message = greet("张三")
print(message)  # 你好，张三！
\`\`\`

## 参数默认值

\`\`\`python
def greet(name, greeting="你好"):
    return f"{greeting}，{name}！"

print(greet("张三"))           # 你好，张三！
print(greet("李四", "早上好"))  # 早上好，李四！
\`\`\`

## 返回多个值

\`\`\`python
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

min_val, max_val, total = get_stats([1, 2, 3, 4, 5])
print(f"最小值: {min_val}, 最大值: {max_val}, 总和: {total}")
\`\`\`

## 匿名函数（lambda）

\`\`\`python
# 简单的lambda函数
square = lambda x: x ** 2
print(square(5))  # 25

# 配合列表使用
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]
\`\`\``,
                template: `# 函数练习
# 定义一个计算购物车总价的函数

def calculate_total(cart):
    """
    计算购物车总价
    cart: 字典列表，每个字典包含name和price
    """
    total = 0
    for item in cart:
        total += item['price'] * item['quantity']
    return total

# 购物车数据
cart = [
    {"name": "手机", "price": 2999, "quantity": 1},
    {"name": "耳机", "price": 299, "quantity": 2},
    {"name": "数据线", "price": 59, "quantity": 3}
]

total = calculate_total(cart)
print(f"购物车总价: ¥{total}")`,
                exercises: [
                    {
                        id: '1-4-1',
                        question: '以下lambda函数哪个可以正确计算两个数的和？',
                        options: [
                            { label: 'A', text: 'sum = lambda x, y: x + y' },
                            { label: 'B', text: 'sum = lambda x, y: x, y' },
                            { label: 'C', text: 'sum = lambda x, y: return x + y' },
                            { label: 'D', text: 'sum = lambda (x, y): x + y' }
                        ],
                        answer: 'A',
                        solution: {
                            text: 'lambda函数的语法是 lambda 参数: 表达式。\n表达式自动作为返回值，不需要return关键字。',
                            code: 'sum = lambda x, y: x + y\nresult = sum(3, 5)\nprint(result)  # 输出: 8'
                        }
                    }
                ]
            }
        ]
    },

    // ========== 实操层 ==========
    2: {
        title: '数据处理实战',
        level: '实操',
        lessons: [
            {
                id: '2-1',
                title: '列表与字典进阶',
                content: `# 列表与字典进阶操作

进一步学习Python数据结构的强大操作。

## 列表推导式

\`\`\`python
# 传统方式
squares = []
for i in range(10):
    squares.append(i ** 2)

# 列表推导式
squares = [i ** 2 for i in range(10)]

# 带条件
even_squares = [i ** 2 for i in range(10) if i % 2 == 0]
\`\`\`

## 字典推导式

\`\`\`python
# 快速创建字典
keys = ['a', 'b', 'c']
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
# {'a': 1, 'b': 2, 'c': 3}

# 交换键值对
d = {'a': 1, 'b': 2}
reversed_d = {v: k for k, v in d.items()}
# {1: 'a', 2: 'b'}
\`\`\`

## 常用内置函数

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

len(numbers)     # 长度: 8
sorted(numbers)  # 排序: [1, 1, 2, 3, 4, 5, 6, 9]
sum(numbers)     # 求和: 31
max(numbers)     # 最大值: 9
min(numbers)     # 最小值: 1
enumerate(numbers)  # 枚举
zip(numbers, ['a', 'b'])  # 打包
\`\`\``,
                template: `# 列表和字典练习
# 使用列表推导式生成数据

# 1. 生成1-10的平方列表
squares = [i**2 for i in range(1, 11)]
print(f"平方列表: {squares}")

# 2. 筛选出偶数的平方
even_squares = [i**2 for i in range(1, 11) if i % 2 == 0]
print(f"偶数平方: {even_squares}")

# 3. 使用字典统计词频
text = "python java python javascript python java"
words = text.split()
word_count = {word: words.count(word) for word in set(words)}
print(f"词频统计: {word_count}")`,
                exercises: [
                    {
                        id: '2-1-1',
                        question: '以下哪个列表推导式可以生成[1, 4, 9, 16, 25]？',
                        options: [
                            { label: 'A', text: '[i*i for i in range(1, 5)]' },
                            { label: 'B', text: '[i*i for i in range(1, 6)]' },
                            { label: 'C', text: '[i**2 for i in [1,2,3,4,5]] if i<6]' },
                            { label: 'D', text: '[i*i for i in [1,2,3,4,5]]' }
                        ],
                        answer: 'D',
                        solution: {
                            text: '[i*i for i in [1,2,3,4,5]]生成[1,4,9,16,25]，其中1*1=1, 2*2=4, 3*3=9, 4*4=16, 5*5=25。',
                            code: 'result = [i*i for i in [1,2,3,4,5]]\nprint(result)  # [1, 4, 9, 16, 25]'
                        }
                    }
                ]
            },
            {
                id: '2-2',
                title: 'Pandas数据处理入门',
                content: `# Pandas数据处理入门

Pandas是Python数据分析的核心库。

## 创建DataFrame

\`\`\`python
import pandas as pd

# 从字典创建
df = pd.DataFrame({
    'name': ['张三', '李四', '王五'],
    'age': [25, 30, 35],
    'city': ['北京', '上海', '广州']
})

# 查看数据
print(df.head())      # 前几行
print(df.info())      # 数据信息
print(df.describe())  # 统计描述
\`\`\`

## 基本操作

\`\`\`python
# 选择列
df['name']        # 单列
df[['name', 'age']]  # 多列

# 选择行
df.iloc[0]        # 按索引
df.loc[0]         # 按标签

# 条件筛选
df[df['age'] > 25]

# 添加列
df['birth_year'] = 2024 - df['age']
\`\`\`

## 数据统计

\`\`\`python
df['age'].mean()    # 平均值
df['age'].sum()     # 总和
df['age'].value_counts()  # 值统计
\`\`\``,
                template: `# Pandas入门练习
import pandas as pd

# 创建数据
data = {
    'product': ['手机', '电脑', '平板', '耳机', '键盘'],
    'price': [2999, 5999, 1999, 299, 199],
    'sales': [120, 85, 60, 200, 150]
}
df = pd.DataFrame(data)

# 计算销售额
df['revenue'] = df['price'] * df['sales']

# 查看数据
print("产品数据：")
print(df)

# 统计
print(f"\\n平均价格: {df['price'].mean():.2f}")
print(f"最高销售额: {df['revenue'].max()}")
print(f"总销售额: {df['revenue'].sum()}")`,
                exercises: [
                    {
                        id: '2-2-1',
                        question: '如何选择price列大于1000的所有产品？',
                        options: [
                            { label: 'A', text: 'df[price > 1000]' },
                            { label: 'B', text: 'df[df.price > 1000]' },
                            { label: 'C', text: 'df.select(price > 1000)' },
                            { label: 'D', text: 'df.filter(price > 1000)' }
                        ],
                        answer: 'B',
                        solution: {
                            text: '在Pandas中筛选数据需要放在DataFrame索引内，使用df[条件]的语法。',
                            code: 'import pandas as pd\ndf = pd.DataFrame({\n    "product": ["手机", "电脑", "平板"],\n    "price": [2999, 5999, 1999]\n})\n# 正确写法\nprint(df[df["price"] > 1000])'
                        }
                    }
                ]
            },
            {
                id: '2-3',
                title: '数据清洗与转换',
                content: `# 数据清洗与转换

数据分析中最重要的环节之一。

## 缺失值处理

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'A': [1, 2, np.nan, 4],
    'B': [5, np.nan, np.nan, 8],
    'C': [9, 10, 11, 12]
})

# 检测缺失值
df.isnull()        # 返回布尔DataFrame
df.isnull().sum()  # 每列缺失值数量

# 处理缺失值
df.fillna(0)               # 用0填充
df.fillna(df.mean())       # 用均值填充
df.dropna()               # 删除有缺失值的行
df.dropna(thresh=2)        # 至少有两个非空值才保留
\`\`\`

## 数据类型转换

\`\`\`python
# 转换类型
df['A'] = df['A'].astype(int)
df['date'] = pd.to_datetime(df['date'])

# 字符串处理
df['name'] = df['name'].str.lower()     # 转小写
df['name'] = df['name'].str.strip()    # 去除空格
df['name'] = df['name'].str.replace('old', 'new')  # 替换
\`\`\`

## 数据重塑

\`\`\`python
# 重命名列
df.rename(columns={'A': 'new_A', 'B': 'new_B'})

# 设置索引
df.set_index('name')

# 重置索引
df.reset_index()
\`\`\``,
                template: `# 数据清洗练习
import pandas as pd
import numpy as np

# 创建有缺失值的数据
data = {
    'name': ['产品A', '产品B', '产品C', '产品D'],
    'price': [2999, np.nan, 1999, 3999],
    'stock': [100, 200, np.nan, 150],
    'rating': [4.5, 4.2, np.nan, 4.8]
}
df = pd.DataFrame(data)

print("原始数据：")
print(df)

# 用均值填充数值列的缺失值
for col in ['price', 'stock', 'rating']:
    df[col] = df[col].fillna(df[col].mean())

print("\\n清洗后数据：")
print(df)

# 添加新列
df['status'] = df['price'].apply(
    lambda x: '高价' if x > 3000 else '中价' if x > 2000 else '低价'
)
print("\\n带状态分类的数据：")
print(df)`,
                exercises: [
                    {
                        id: '2-3-1',
                        question: 'df.fillna(0)的作用是什么？',
                        options: [
                            { label: 'A', text: '删除所有缺失值' },
                            { label: 'B', text: '用0填充所有缺失值' },
                            { label: 'C', text: '将0转换为缺失值' },
                            { label: 'D', text: '查找所有0值' }
                        ],
                        answer: 'B',
                        solution: {
                            text: 'fillna()函数用于填充缺失值，传入0表示用0来填充。',
                            code: 'import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({"A": [1, np.nan, 3]})\nprint(df.fillna(0))'
                        }
                    }
                ]
            },
            {
                id: '2-4',
                title: '文件读取与导出',
                content: `# 文件读取与导出

学习如何读取和保存数据文件。

## 读取CSV文件

\`\`\`python
import pandas as pd

# 基本读取
df = pd.read_csv('data.csv')

# 指定编码
df = pd.read_csv('data.csv', encoding='utf-8')

# 指定分隔符
df = pd.read_csv('data.csv', sep='\\t')

# 读取前10行
df = pd.read_csv('data.csv', nrows=10)

# 处理缺失值
df = pd.read_csv('data.csv', na_values=['NA', 'null', ''])
\`\`\`

## 读取Excel文件

\`\`\`python
# 读取所有sheet
df_dict = pd.read_excel('data.xlsx')

# 读取指定sheet
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# 读取指定列
df = pd.read_excel('data.xlsx', usecols=['A', 'C', 'E'])
\`\`\`

## 导出数据

\`\`\`python
# 导出CSV
df.to_csv('output.csv', index=False)

# 导出Excel
df.to_excel('output.xlsx', index=False)

# 导出JSON
df.to_json('output.json', orient='records', force_ascii=False)
\`\`\``,
                template: `# 文件操作练习
import pandas as pd

# 模拟从文件读取数据（实际使用时用pd.read_csv）
data = {
    'date': ['2024-01-01', '2024-01-02', '2024-01-03'],
    'sales': [1000, 1500, 1200],
    'customers': [50, 75, 60]
}
df = pd.DataFrame(data)

print("数据预览：")
print(df)

# 计算统计
df['avg_per_customer'] = df['sales'] / df['customers']

# 导出为CSV格式的字符串（演示用）
csv_output = df.to_csv(index=False)
print("\\n导出的CSV：")
print(csv_output)

# 导出为JSON格式
json_output = df.to_json(orient='records', force_ascii=False)
print("\\n导出的JSON：")
print(json_output)`,
                exercises: [
                    {
                        id: '2-4-1',
                        question: '导出CSV时，index=False的作用是什么？',
                        options: [
                            { label: 'A', text: '不导出索引列' },
                            { label: 'B', text: '不导出表头' },
                            { label: 'C', text: '删除第一列' },
                            { label: 'D', text: '使用旧版格式' }
                        ],
                        answer: 'A',
                        solution: {
                            text: '默认情况下to_csv()会导出pandas自动创建的索引列（0,1,2...）。\n设置index=False可以避免导出这个多余的索引列。',
                            code: 'import pandas as pd\ndf = pd.DataFrame({"A": [1, 2, 3]})\n# 不包含索引\nprint(df.to_csv(index=False))\n# 包含索引\nprint(df.to_csv())'
                        }
                    }
                ]
            }
        ]
    },

    // ========== 进阶层 ==========
    3: {
        title: '电商分析进阶',
        level: '进阶',
        lessons: [
            {
                id: '3-1',
                title: '数据聚合与分组',
                content: `# 数据聚合与分组

掌握groupby进行高效数据分析。

## groupby基础

\`\`\`python
import pandas as pd

# 模拟电商订单数据
df = pd.DataFrame({
    'category': ['数码', '数码', '服装', '服装', '食品', '食品'],
    'product': ['手机', '电脑', 'T恤', '裤子', '面包', '牛奶'],
    'sales': [10000, 15000, 5000, 6000, 2000, 3000],
    'quantity': [10, 5, 50, 30, 100, 50]
})

# 按类目分组
grouped = df.groupby('category')

# 分组统计
print(grouped['sales'].sum())     # 每组销售额总和
print(grouped['sales'].mean())    # 每组平均值
print(grouped['sales'].agg(['sum', 'mean', 'max']))  # 多种统计
\`\`\`

## 多列分组

\`\`\`python
# 按类目和商品分组
grouped = df.groupby(['category', 'product'])
print(grouped['sales'].sum())
\`\`\`

## 透视表

\`\`\`python
# 创建透视表
pivot = df.pivot_table(
    values='sales',
    index='category',
    aggfunc='sum'
)
print(pivot)
\`\`\``,
                template: `# 分组聚合练习
import pandas as pd

# 电商销售数据
df = pd.DataFrame({
    'month': ['1月', '1月', '2月', '2月', '3月', '3月'],
    'category': ['手机', '电脑', '手机', '电脑', '手机', '电脑'],
    'sales': [15000, 20000, 18000, 22000, 20000, 25000],
    'profit': [3000, 4000, 3600, 4400, 4000, 5000]
})

print("原始数据：")
print(df)

# 按月份分组统计
print("\\n按月份统计：")
monthly = df.groupby('month').agg({
    'sales': 'sum',
    'profit': 'sum'
})
print(monthly)

# 按类目分组统计
print("\\n按类目统计：")
by_category = df.groupby('category').agg({
    'sales': 'sum',
    'profit': 'sum'
})
print(by_category)

# 计算利润率
by_category['profit_rate'] = (by_category['profit'] / by_category['sales'] * 100).round(2)
print("\\n利润率：")
print(by_category)`,
                exercises: [
                    {
                        id: '3-1-1',
                        question: '哪个方法可以同时计算分组后的总和和平均值？',
                        options: [
                            { label: 'A', text: 'grouped["sales"].sum().mean()' },
                            { label: 'B', text: 'grouped["sales"].agg(["sum", "mean"])' },
                            { label: 'C', text: 'grouped["sales"].sum + mean()' },
                            { label: 'D', text: 'grouped.sum(["sales", "mean"])' }
                        ],
                        answer: 'B',
                        solution: {
                            text: 'agg()方法可以接受一个列表，对分组数据同时应用多种聚合函数。',
                            code: 'import pandas as pd\ndf = pd.DataFrame({"A": [1,2,3,4], "B": [10,20,30,40]})\nprint(df.groupby(df["A"] > 2)["B"].agg(["sum", "mean"]))'
                        }
                    }
                ]
            },
            {
                id: '3-2',
                title: '多表关联与合并',
                content: `# 多表关联与合并

学习如何连接多个数据表。

## concat合并

\`\`\`python
import pandas as pd

df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})

# 纵向合并
result = pd.concat([df1, df2], ignore_index=True)
\`\`\`

## merge合并

\`\`\`python
# 订单表
orders = pd.DataFrame({
    'order_id': ['DD001', 'DD002', 'DD003'],
    'customer_id': ['KH001', 'KH002', 'KH001'],
    'amount': [100, 200, 150]
})

# 客户表
customers = pd.DataFrame({
    'customer_id': ['KH001', 'KH002', 'KH003'],
    'name': ['张三', '李四', '王五'],
    'city': ['北京', '上海', '广州']
})

# 合并
result = pd.merge(orders, customers, on='customer_id')
print(result)
\`\`\`

## 合并类型

| 类型 | 说明 |
|------|------|
| inner | 只保留两者都有的键 |
| left | 保留左表所有键 |
| right | 保留右表所有键 |
| outer | 保留所有键 |

\`\`\`python
# 左连接
pd.merge(df1, df2, on='key', how='left')
\`\`\``,
                template: `# 表合并练习
import pandas as pd

# 订单表
orders = pd.DataFrame({
    'order_id': ['DD001', 'DD002', 'DD003', 'DD004'],
    'customer_id': ['KH001', 'KH002', 'KH003', 'KH001'],
    'product': ['手机', '电脑', '平板', '耳机'],
    'amount': [2999, 5999, 1999, 299]
})

# 客户表
customers = pd.DataFrame({
    'customer_id': ['KH001', 'KH002', 'KH003'],
    'name': ['张三', '李四', '王五'],
    'city': ['北京', '上海', '广州']
})

print("订单表：")
print(orders)

print("\\n客户表：")
print(customers)

# 合并表
result = pd.merge(orders, customers, on='customer_id', how='left')
print("\\n合并后：")
print(result)

# 计算每个客户的消费总额
customer_stats = result.groupby(['customer_id', 'name']).agg({
    'amount': 'sum',
    'order_id': 'count'
}).rename(columns={'order_id': 'order_count'})
print("\\n客户消费统计：")
print(customer_stats)`,
                exercises: [
                    {
                        id: '3-2-1',
                        question: 'pd.merge(df1, df2, on="id", how="left") 是哪种连接？',
                        options: [
                            { label: 'A', text: '内连接，只保留两边都有的id' },
                            { label: 'B', text: '左连接，保留df1的所有id' },
                            { label: 'C', text: '右连接，保留df2的所有id' },
                            { label: 'D', text: '全连接，保留所有id' }
                        ],
                        answer: 'B',
                        solution: {
                            text: 'how="left"表示左连接，以左表(df1)为基础，保留左表所有键，右表没有匹配的行用NaN填充。',
                            code: 'import pandas as pd\ndf1 = pd.DataFrame({"id": [1,2,3], "A": ["a","b","c"]})\ndf2 = pd.DataFrame({"id": [2,3,4], "B": ["x","y","z"]})\nprint(pd.merge(df1, df2, on="id", how="left"))'
                        }
                    }
                ]
            },
            {
                id: '3-3',
                title: '数据可视化',
                content: `# 数据可视化

用图表展示数据分析结果。

## matplotlib基础

\`\`\`python
import matplotlib.pyplot as plt

# 简单折线图
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.title('标题')
plt.xlabel('X轴')
plt.ylabel('Y轴')
plt.show()
\`\`\`

## 图表类型

### 柱状图
\`\`\`python
categories = ['手机', '电脑', '平板']
sales = [10000, 15000, 8000]

plt.bar(categories, sales)
plt.title('产品销量')
plt.show()
\`\`\`

### 饼图
\`\`\`python
sizes = [30, 40, 30]
labels = ['A类', 'B类', 'C类']

plt.pie(sizes, labels=labels, autopct='%1.1f%%')
plt.show()
\`\`\`

## 在Jupyter中使用

在Pyodide中，我们需要使用特殊方式：

\`\`\`python
# 将图表转为HTML
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# 创建图表
plt.plot([1, 2, 3], [4, 5, 6])
plt.title('示例')

# 获取HTML
from io import StringIO
buffer = StringIO()
plt.savefig(buffer, format='svg')
print(buffer.getvalue())
\`\`\``,
                template: `# 数据可视化练习
import pandas as pd

# 创建销售数据
df = pd.DataFrame({
    'month': ['1月', '2月', '3月', '4月', '5月', '6月'],
    'sales': [12000, 15000, 18000, 16000, 20000, 22000],
    'profit': [3000, 4000, 4500, 4000, 5000, 5500]
})

print("销售数据：")
print(df)

# 计算月环比增长率
df['growth'] = df['sales'].pct_change() * 100
print("\\n带增长率的数据：")
print(df.round(2))

# 计算累计销售
df['cumsum'] = df['sales'].cumsum()
print("\\n累计销售：")
print(df[['month', 'sales', 'cumsum']])

print("\\n图表数据准备完成，请在实际环境中渲染图表")`,
                exercises: [
                    {
                        id: '3-3-1',
                        question: '如何计算销售额的环比增长率？',
                        options: [
                            { label: 'A', text: 'df["sales"].pct_change()' },
                            { label: 'B', text: 'df["sales"].diff()' },
                            { label: 'C', text: 'df["sales"].rank()' },
                            { label: 'D', text: 'df["sales"].percentile()' }
                        ],
                        answer: 'A',
                        solution: {
                            text: 'pct_change()计算当前值与前一个值的百分比变化，即环比增长率。',
                            code: 'import pandas as pd\ndf = pd.DataFrame({"sales": [100, 120, 150]})\nprint(df["sales"].pct_change() * 100)  # 环比增长率%'
                        }
                    }
                ]
            },
            {
                id: '3-4',
                title: '电商业务分析实战',
                content: `# 电商业务分析实战

综合运用所学知识，完成一个完整的电商数据分析案例。

## 分析指标

电商数据分析常见的核心指标：

| 指标 | 说明 | 计算方式 |
|------|------|----------|
| GMV | 商品交易总额 | sum(订单金额) |
| 客单价 | 平均每单金额 | GMV / 订单数 |
| 转化率 | 下单用户/访客 | 下单用户 / 访客 |
| 复购率 | 重复购买占比 | 复购用户 / 总用户 |

## 分析流程

1. **数据加载与清洗**
2. **指标计算**
3. **维度拆解**
4. **可视化展示**
5. **结论建议**

## 案例分析

\`\`\`python
import pandas as pd

# 模拟数据
orders = pd.DataFrame({
    'order_id': range(1, 101),
    'customer_id': [f'C{i%20}' for i in range(100)],
    'amount': [99, 199, 299, 399, 599][:-20] * 20,
    'date': pd.date_range('2024-01-01', periods=100)
})

# 计算GMV
gmv = orders['amount'].sum()

# 计算客单价
avg_order_value = orders['amount'].mean()

# 计算复购率
repeat_customers = orders.groupby('customer_id').size()
repeat_rate = (repeat_customers > 1).sum() / len(repeat_customers)

print(f"GMV: {gmv}")
print(f"客单价: {avg_order_value:.2f}")
print(f"复购率: {repeat_rate*100:.1f}%")
\`\`\``,
                template: `# 电商分析实战
import pandas as pd
import numpy as np

# 模拟电商数据集
np.random.seed(42)

# 生成订单数据
dates = pd.date_range('2024-01-01', periods=90)
orders = pd.DataFrame({
    'order_id': [f'DD{i:04d}' for i in range(1, 101)],
    'customer_id': [f'KH{np.random.randint(1, 31):02d}' for _ in range(100)],
    'category': np.random.choice(['手机', '电脑', '服装', '食品'], 100),
    'amount': np.random.choice([99, 199, 299, 399, 599, 999], 100, p=[0.2, 0.25, 0.2, 0.15, 0.15, 0.05]),
    'date': np.random.choice(dates, 100)
})

print("=" * 50)
print("电商数据分析报告")
print("=" * 50)

# 1. GMV分析
gmv = orders['amount'].sum()
order_count = len(orders)
print(f"\\n【GMV概览】")
print(f"总GMV: ¥{gmv:,}")
print(f"订单数: {order_count}")
print(f"客单价: ¥{gmv/order_count:.2f}")

# 2. 类目分析
print(f"\\n【类目销售排行】")
category_stats = orders.groupby('category').agg({
    'amount': 'sum',
    'order_id': 'count'
}).rename(columns={'order_id': 'order_count'})
category_stats['avg_amount'] = category_stats['amount'] / category_stats['order_count']
category_stats = category_stats.sort_values('amount', ascending=False)
print(category_stats)

# 3. 客户分析
print(f"\\n【客户分析】")
customer_stats = orders.groupby('customer_id').agg({
    'amount': ['sum', 'count']
}).round(2)
customer_stats.columns = ['total_amount', 'order_count']
top_customers = customer_stats.sort_values('total_amount', ascending=False).head(5)
print(f"消费TOP5客户：")
print(top_customers)

# 4. 日期分析
print(f"\\n【月度趋势】")
orders['month'] = orders['date'].dt.month
monthly = orders.groupby('month')['amount'].sum()
print(monthly)

print("\\n" + "=" * 50)
print("分析完成")
print("=" * 50)`,
                exercises: [
                    {
                        id: '3-4-1',
                        question: '客单价的正确计算方式是？',
                        options: [
                            { label: 'A', text: '总订单数 / GMV' },
                            { label: 'B', text: 'GMV / 总订单数' },
                            { label: 'C', text: 'GMV × 总订单数' },
                            { label: 'D', text: '总用户数 / GMV' }
                        ],
                        answer: 'B',
                        solution: {
                            text: '客单价 = GMV(商品交易总额) / 总订单数，表示平均每个订单的金额。',
                            code: 'gmv = 100000\norder_count = 50\navg_order_value = gmv / order_count\nprint(f"客单价: {avg_order_value}")  # 输出: 2000'
                        }
                    },
                    {
                        id: '3-4-2',
                        question: '复购率是指什么？',
                        options: [
                            { label: 'A', text: '有过购买的用户占总用户的比例' },
                            { label: 'B', text: '购买多次的用户占总用户的比例' },
                            { label: 'C', text: '新用户占总用户的比例' },
                            { label: 'D', text: '流失用户占总用户的比例' }
                        ],
                        answer: 'B',
                        solution: {
                            text: '复购率 = 购买多次的用户数 / 总用户数，表示有重复购买行为的用户占比。',
                            code: '# 复购率计算示例\ncustomers = ["A", "B", "C", "A", "B"]\n# A购买2次，B购买2次，C购买1次\nrepeat_users = 2  # A和B\ntotal_users = 3  # A、B、C\nrepeat_rate = repeat_users / total_users\nprint(f"复购率: {repeat_rate*100:.1f}%")  # 66.7%'
                        }
                    }
                ]
            }
        ]
    }
};

/**
 * 获取所有课程数据
 * @returns {Object} 课程数据
 */
function getAllCourses() {
    return COURSE_DATA;
}

/**
 * 根据课程ID获取课程数据
 * @param {string} courseId - 课程ID (如 "1-1")
 * @returns {Object|null} 课程数据
 */
function getLesson(courseId) {
    const [chapter, lesson] = courseId.split('-').map(Number);

    if (COURSE_DATA[chapter]?.lessons[lesson - 1]) {
        return COURSE_DATA[chapter].lessons[lesson - 1];
    }
    return null;
}

/**
 * 获取课程章节信息
 * @param {number} chapterNum - 章节号
 * @returns {Object|null}
 */
function getChapter(chapterNum) {
    return COURSE_DATA[chapterNum] || null;
}

/**
 * 获取所有课程ID列表
 * @returns {Array}
 */
function getAllLessonIds() {
    const ids = [];
    for (const chapter in COURSE_DATA) {
        COURSE_DATA[chapter].lessons.forEach(lesson => {
            ids.push(lesson.id);
        });
    }
    return ids;
}

/**
 * 获取上一课和下一课
 * @param {string} currentId - 当前课程ID
 * @returns {Object} {prev, next}
 */
function getAdjacentLessons(currentId) {
    const ids = getAllLessonIds();
    const currentIndex = ids.indexOf(currentId);

    return {
        prev: currentIndex > 0 ? ids[currentIndex - 1] : null,
        next: currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null
    };
}

/**
 * 获取课程统计数据
 * @returns {Object}
 */
function getCourseStats() {
    let totalLessons = 0;
    let totalExercises = 0;

    for (const chapter in COURSE_DATA) {
        const lessons = COURSE_DATA[chapter].lessons;
        totalLessons += lessons.length;
        lessons.forEach(lesson => {
            totalExercises += lesson.exercises?.length || 0;
        });
    }

    return {
        totalLessons,
        totalExercises,
        chapters: Object.keys(COURSE_DATA).length
    };
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        COURSE_DATA,
        SAMPLE_DATA,
        getAllCourses,
        getLesson,
        getChapter,
        getAllLessonIds,
        getAdjacentLessons,
        getCourseStats
    };
}
