>


---

### 例1.[四数相加 II（454）-medium](https://leetcode.cn/problems/4sum-ii/)

#### 题目：
给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：

- 0 <= i, j, k, l < n
- nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

示例1：
```
输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出：2
解释：
两个元组如下：
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
```

示例2：
```
输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
输出：1
```

提示：

- n == nums1.length
- n == nums2.length
- n == nums3.length
- n == nums4.length
- 1 <= n <= 200
- -2的28次方 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2的28次方

#### 思路：
遍历该数组来创建元素为 {数值(key):下标(value)} 的 map   
如果 map 中已存在配对的元素（target-nums[i]），则返回结果；  
没有配对元素就将该元素加入 map

#### 解法：

见代码。

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // map键值对{数值:下标}
    let map = {};
    for(let i = 0;i < nums.length;i++){
        //这里先判断有没有配对元素，没有再加入 map
        //防止可能将当前元素作为配对元素
        if(map[target-nums[i]]!=undefined){
            return [i,map[target-nums[i]]];
        }
        map[nums[i]] = i;
    }
    return [];
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