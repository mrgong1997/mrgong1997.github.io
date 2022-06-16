> 滑动窗口  
> 1. 场景   
> - 用于求满足条件的连续子数组
> 2. 要素：
> - 窗口滑动分右边界（快指针移动）和左边界（慢指针移动）
> - 快指针停止移动的条件一般为遍历完数组，**慢指针何时移动？移动到什么位置?**

---

### 例1.[长度最小的子数组（209）-medium](https://leetcode.cn/problems/minimum-size-subarray-sum/)

#### 题目：
给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

示例1：
```
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

示例2：
```
输入：target = 4, nums = [1,4,4]
输出：1
```

示例3：
```
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

提示：

- 1 <= target <= 10的9次方
- 1 <= nums.length <= 10的5次方
- 1 <= nums[i] <= 10的5次方

#### 思路：

这道题任务是查找满足条件的最小连续子数组，知道用滑动窗口定义快慢指针，但感觉变量很多，不清楚何处更新 sum 和 Len 以及何时移动快指针，何时移动慢指针

#### 解法：
- 首先理清思路，快慢指针肯定是用快指针遍历数组，循环结束条件为其结束；  
- 快指针每遍历一个位置，就给 sum 加上这个值，直到 sum 满足条件；
- 满足条件的 sum 开始进入另一循环（慢指针移动直到 sum 不满足条件），每次都会得到 Len ；
- 最后快指针遍历到末尾，慢指针开始收缩直到不满足要求，快指针超出范围跳出循环，程序结束；
#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let i = j = Sum = 0;
    //先把数组长度设到最大
    let minLen = nums.length + 1;
    for(;i<nums.length;i++){
        Sum = Sum + nums[i];
        while(Sum >= target){
            //注意这里小心最小长度值被覆盖不要写成minLen = i-j+1;
            minLen = minLen > i - j + 1 ? i - j + 1 : minLen;
            Sum = Sum - nums[j];
            j++;
        }
    }
    //一般没找到的情况都可用三目运算符的形式返回
    return minLen == nums.length+1 ? 0 : minLen; 
};
```

#### **Java**

```
System.out.println("Hello World");
```

#### **Python**

```
print('Hello World')
```

<!-- tabs:end -->

---


### 例2.[水果成篮（904）-medium](https://leetcode.cn/problems/fruit-into-baskets/)

#### 题目：
你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果**种类**。

你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：

- 你只有**两个**篮子，并且每个篮子只能装**单一类型** 的水果。每个篮子能够装的水果总量没有限制。
- 你可以选择任意一棵树开始采摘，你必须从**每棵**树（包括开始采摘的树）上**恰好摘一个水果** 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到下一棵树，并继续采摘。
- 一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。

给你一个整数数组 fruits ，返回你可以收集的水果的**最大**数目。

示例1：
```
输入：fruits = [1,2,1]
输出：3
解释：可以采摘全部 3 棵树。
```

示例2：
```
输入：fruits = [0,1,2,2]
输出：3
解释：可以采摘 [1,2,2] 这三棵树。
如果从第一棵树开始采摘，则只能采摘 [0,1] 这两棵树。
```

示例3：
```
输入：fruits = [1,2,3,2,2]
输出：4
解释：可以采摘 [2,3,2,2] 这四棵树。
如果从第一棵树开始采摘，则只能采摘 [1,2] 这两棵树。
```
示例4：
```
输入：fruits = [3,3,3,1,2,1,1,2,3,3,4]
输出：5
解释：可以采摘 [1,2,1,1,2] 这五棵树。
```

提示：

- 1 <= fruits.length <= 10的5次方
- 0 <= fruits[i] < fruits.length

#### 思路：
这道题感觉翻译有点勉强，其实任务就是**找出数组中只包含两种数值的连续子数组的最大长度**。难点在于判定慢指针移动和停止移动的条件

#### 解法：



#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    let i = j = maxLen = 0;
    let eleA = fruits[i];
    let eleB = -1;
    for (; i < fruits.length; i++) {
        if (fruits[i] != eleA && eleB == -1) {
            eleB = fruits[i];
            maxLen = Math.max(i - j + 1, maxLen);
        } 
        else if (fruits[i] == eleA || fruits[i] == eleB) {
            maxLen = Math.max(i - j + 1, maxLen);
        } else {
        //若当前元素和两个元素都不等，则快指针先暂停，慢指针开始移动
        //这里有个技巧找到慢指针需要移动到的位置:
        //由于快指针当前元素和上个元素肯定是不等的，因此先把慢指针移动到快指针上个位置进行左篮子赋值，
        //再慢慢往左找到第一个出现不等于两个篮子种类的元素位置，慢指针停止移动。
            j = i - 1;
            eleA = fruits[j];
            eleB = fruits[i];
            while (fruits[j] == eleA || fruits[j] == eleB) {
                j--;
            }
            j = j + 1;
            maxLen = Math.max(i - j + 1, maxLen);
        }
    }
    return maxLen;
};
```

#### **Java**

```
System.out.println("Hello World");
```

#### **Python**

```
print('Hello World')
```

<!-- tabs:end -->

---

### 例3.[最小覆盖子串（76）-hard](https://leetcode.cn/problems/minimum-window-substring/)

#### 题目：
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：

- 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
- 如果 s 中存在这样的子串，我们保证它是唯一的答案。

示例1：
```
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
```

示例2：
```
输入：s = "a", t = "a"
输出："a"
```

示例3：
```
输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
```

提示：

- 1 <= s.length, t.length <= 10的5次方
- s 和 t 由英文字母组成

#### 思路：
这道题有点难，慢指针实在不好处理，先埋个坑。

#### 解法：


#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript

```

#### **Java**

```
System.out.println("Hello World");
```

#### **Python**

```
print('Hello World')
```

<!-- tabs:end -->

---