>


---

### 例1.[有序数组的平方（977）-easy](https://leetcode.cn/problems/squares-of-a-sorted-array/)

#### 题目：
给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例1：
```
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
```

示例2：
```
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

提示：

- 1 <= nums.length <= 10的4次方
- -10的4次方 <= nums[i] <= 10的4次方
- nums 已按 非递减顺序 排序

#### 思路：

这道题是类排序题，排序方法类似于归并排序，用双指针来做（注意不是快慢指针法，双指针范围更大）

#### 解法：
定义两个指针分别指向数组首尾，哪个数值大就放入新数组中，然后往中间移动那个取过值的指针。

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    //类似归并排序，定义两个指针求解（非快慢指针）
    //先计算出平方后的数组
    let a=[];
    for(let i = 0;i<nums.length;i++){
        nums[i]=nums[i]*nums[i];
    }
    i=nums.length-1;
    //两个指针分别指向数组首尾，然后往中间逼近
    for(let j = 0;j<=i;){
        if(nums[j]>=nums[i]){
            a.push(nums[j]);
            j++;
        }
        else{
            a.push(nums[i]);
            i--;
        }
    }
    return a.reverse();
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