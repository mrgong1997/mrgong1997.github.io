# Overview

> 该文档用于记录刷LeetCode总结的问题,在线访问地址：https://mrgong1997.github.io/LeetCode/#/

## 一.说明

- 文档分为不同的章节（如数组），每个章节包含不同的专题（如数组-二分法），具体见导航栏  
- 一个专题存储为一个 md 文件，专题下有多道典型题以及解答  
样例如下：

<!-- 问题用三级标题，答案用四级标题 -->
<!-- *****************COPY************************ -->

---

### 例1.[二分查找（704）](https://leetcode.cn/problems/binary-search/)

#### 题目：
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。  

示例1：
```
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```

示例2：
```
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```

提示：

- 你可以假设 nums 中的所有元素是不重复的。
- n 将在 [1, 10000]之间。
- nums 的每个元素都将在 [-9999, 9999]之间。

#### 思路：

红烧鱼（参考回答 - 普通文本）
1. 鸭腿饭
2. 香辣鸭
3. 肉沫茄子（参考回答 - 列表文本） 

#### 解法：

![红烧鱼](imgs/fish.png)（参考回答 - 图片）  

#### 代码：

（版本一）左闭右闭区间 [left, right]:
<!-- tabs:start -->

#### **JavaScript**

```javascript
var search = function(nums, target) {
    // right是数组最后一个数的下标，num[right]在查找范围内，是左闭右闭区间
    let left = 0, right = nums.length - 1;
    // 当left=right时，由于nums[right]在查找范围内，所以要包括此情况
    while (left <= right) {
        let mid = left + Math.floor((right - left)/2);
        // 如果中间数大于目标值，要把中间数排除查找范围，所以右边界更新为mid-1；如果右边界更新为mid，那中间数还在下次查找范围内
        if (nums[mid] > target) {
            right = mid - 1;  // 去左面闭区间寻找
        } else if (nums[mid] < target) {
            left = mid + 1;   // 去右面闭区间寻找
        } else {
            return mid;
        }
    }
    return -1;
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

>   参考链接：[二分查找-代码随想录](https://programmercarl.com/0704.%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE.html)(参考链接)
<!-- *****************COPY************************ -->
---

## 二.思维导图

![Overview](imgs/overview.jpg)


