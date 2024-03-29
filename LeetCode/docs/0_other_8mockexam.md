# 字节校园·单月模拟笔试 8月场排名赛

> 活动链接：https://bytedancecampus1.feishu.cn/docx/doxcnvb9PPT6AQEqrXt9gwgXinh  
> 总共4道题，前两道一题20分，后两道一题30分。   
> 笔试平台为牛客网，ACM模式，而非 LeetCode 上的核心代码模式。


---

### 1. 数组去重 

#### 题目：为提升用户刷抖音的体验，需要过滤掉重复的视频。
输入两行数据：第一行为视频个数，第二行为处理前的视频库，编号单调递增。  
要求输出一行数据，为处理后的视频库。

示例：
```
输入: 
6
1 1 2 3 3 4
  
输出: 
1 2 3 4
```

#### 解法：


#### 代码：
<!-- tabs:start -->
#### **JavaScript**

```javascript

```

<!-- tabs:end -->
---

### 2. 检测敏感词 

#### 题目：对敏感词进行过滤，检测出是否含有打乱过的敏感词。
输入两个字符 M N ，M 为敏感词，N 为要检测的内容数量。  
输出每一行是否命中敏感词。

示例：
```
输入: 
bytedance 4
hello,bytedance
btoyttytdance
byhellotedance
byeeyekey
  
输出: 
YES
NO
YES
NO

注意：需要判定内容中包含乱序的敏感字符的情况，不考虑通过率只有50%
```

#### 解法：
字母异位词 + 滑动窗口

#### 代码：
<!-- tabs:start -->
#### **JavaScript**

```javascript

```

<!-- tabs:end -->
---

### 3. 行为模拟 

#### 题目：小字通过浏览文档发现知识点来提高熟练度，给出相关信息需要输出指定时刻小字的熟练度。
描述：小字 N 秒浏览文档，最初熟练度为 0 ，小字会在某时刻发现知识点，分为两种知识点：固定知识点，熟练度 +1 ；发散知识点，每发现一个，会从发现的下一秒开始熟练度逐秒 +1，不同发散知识点可叠加。   
已知小字发现 M 个知识点信息，以及 P 次观察时刻，求每次观察时小字的熟练度。   
    
输入：第一行三个整数，N ，M ，P    
接下来的 M 行描述小字发现的知识点信息，每行包含两个整数 a，b . a = 1 时，为固定知识点；a = 2 时，为发散知识点，b 是小字发现该知识点的时刻。   
接下来的 P 行，每行包含一个整数 Pi ，它们的顺序表达了观察小字的时间点。   
输出：包含 P 行,每行一个整数,表示每个 Pi 时刻观察小字时的熟练度。   
    
示例1：
```
输入: 
10 5 6
1 2
2 3
2 5
1 7
2 10
1
3
4
6
9
10
  
输出: 
0
1
2
5
12
14
```

示例2：
```
输入: 
10000000000 1 2
2 1
1
10000000000
  
输出: 
0
9999999999
```

#### 解法：


#### 代码：
<!-- tabs:start -->
#### **JavaScript**

```javascript

```

<!-- tabs:end -->
---


### 4. 强密码检验器 

#### 题目：检验现有密码是否为强密码。  
某网站注册需要设置成强密码，需要包含以下条件：  
    
1. 密码长度在 6~20 位之间（包含6和20）
2. 密码必须包含 1 个大写字母，1 个小写字母，1 个数字和 1 个有效符号（ , . ! ? ; ）
3. 任意相邻字符不能相同   
     
小明需要对现有密码进行 增 / 删 / 改 ，如果已经满足条件则输出 0 ;    
不满足则输出需要多少个步骤才能满足条件（增 / 删 / 改 1 个字符算一个步骤）     
   
示例：

```
输入: 
a!jjjdqiejdwj1
  
输出: 
1

解释：缺少大写字母，只需把 jjj 中第二个 j 改成任意大写字母即可
```
   
#### 解法：
该题来源于力扣 [420. 强密码检验器 - hard](https://leetcode.cn/problems/strong-password-checker/) ，略微有所改动。

#### 代码：
<!-- tabs:start -->
#### **JavaScript**

```javascript

```

<!-- tabs:end -->
---