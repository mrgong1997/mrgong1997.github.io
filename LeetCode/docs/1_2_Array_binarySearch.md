>


---

### 例1.[二分查找（704）-easy](https://leetcode.cn/problems/binary-search/)

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

##### 二分法前提：  
- 有序数组

#### 解法：
**左闭右闭区间版本解法，即左右边界都是可以取到的值，left==right是有意义的值** 流程：
1. 初始化左右区间以及mid；
2. 定义循环条件（加等）；
3. 设定中间值固定写法；
4. 三个if，左右区间+1/-1（不加等）；


#### 代码：

（版本一）左闭右闭区间 [left, right]:
<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // 1.定义左闭右闭区间（mid,left,right都指数组下标）
    let right = nums.length-1;
    let left = 0;
    let mid = Math.floor(right/2);
    // 2.写循环条件***加等***
    while(left <= right){
        // 3.中间值固定写法（Math.floor：向下取整） 
        mid = left + Math.floor((right - left)/2);
        // 4.三种情况，两种把左右区间+1/-1，条件***不加等***
        if(target < nums[mid]){
            right = mid - 1;
        }
        else if (target > nums[mid]){
            left = mid + 1;
        }
        else{
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


---


### 例2.[非递减数组找元素起始位置（34）-medium](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

#### 题目：
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

进阶：

你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？ 

示例1：
```
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
```

示例2：
```
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
```

提示：

- 0 <= nums.length <= 105
- -109 <= nums[i] <= 109
- nums 是一个非递减数组
- -109 <= target <= 109


#### 思路：

先用二分法找到target下标；然后扩散累加/累减下标边界即可。

#### 解法：
见代码


#### 代码：

（版本一）左闭右闭区间 [left, right]:
<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let right = nums.length-1;
    let left = 0;
    let mid = Math.floor(right/2);
    //1.先排除不在数组范围的数字
    if(target < nums[left] || target > nums[right]){
        return [-1,-1];
    }
    // 2.二分法找mid
    while(left <= right){
        mid = left + Math.floor((right - left)/2);
        if(target < nums[mid]){
            right = mid - 1;
        }
        else if (target > nums[mid]){
            left = mid + 1;
        }
        else{
            break;
        }
    }
    //3.分条件讨论，若没找到target：
    if(left > right){
        return [-1,-1];
    }
    //若target只有一个：
    else if(left == right){
        return[mid,mid];
    }
    //若target不只一个：
    else{
        left = right = mid;
        //左边界：直接看上一个数等于target不，循环
        while(left>=0){
            if(nums[left-1]==target){
                left = left - 1;
            }
            else{
                break;
            }
        }
        //右边界：直接看下一个数等于target不，循环
        while(right<=nums.length-1){
            if(nums[right+1]==target){
                right = right + 1;
            }
            else {
                break;
            }
        }
        //左右边界就是开始和结束位置
        return [left,right];
    }
    
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



### 例3.[x 的平方根（69）-easy](https://leetcode.cn/problems/sqrtx/)

#### 题目：
给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

示例1：
```
输入：x = 4
输出：2
```

示例2：
```
输入：x = 8
输出：2
解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
```

提示：

- 0 <= x <= 231 - 1


#### 思路：

- 左边界1，右边界为x/2,mid为一半。最后返回right即可。
- 注意0和1为特殊情况

#### 解法：  
见代码

#### 代码：

（版本一）左闭右闭区间 [left, right]:
<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    //0.排除特殊情况0和1，因为这里的mid不能为0
    if( x == 0 || x == 1 ){
        return x;
    }
    //1.初始化左右区间及mid
    let left = 1;
    let right = Math.floor(x/2);
    let mid = left + Math.floor((right-left)/2);
    //2.定义循环条件（加等）
    while(left<=right){
        // 3.中间值固定写法（Math.floor：向下取整） 
        mid = left + Math.floor((right - left)/2);
        // 4.三种情况，两种把左右区间+1/-1，条件***不加等***

        //这里写 x/mid < mid 而不是 x < mid*mid防止数据溢出 
        if(x < mid*mid){
            right = mid - 1;
        }
        else if (x > mid*mid){
            left = mid + 1;
        }
        else{
            return mid;
        }
    }
    return right;
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


>   参考链接：[二分查找-代码随想录](https://programmercarl.com/0704.%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE.html)(参考链接)
