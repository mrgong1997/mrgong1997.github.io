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
四个数组，A、B为一组，C、D为一组，通过 a+b=-(c+d) 恒成立来解决      
扫描A、B数组，统计元素的和 a+b 为 key，该和出现的次数为 value，存入 map  
扫描C、D数组，统计元素的和 -(c+d) 是否出现在 map 中，出现一次 count+value  

#### 解法：

见代码。

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    let map = new Map();
    let count = 0;
    //把A/B数组的元素和及该和出现次数放进 map
    for(const a of nums1){
        for(const b of nums2){
            const sum = a + b;
            map.set(sum,(map.get(sum)||0) + 1);
        }
    }
    //扫描 C/D数组，看map中是否存在-(c+d)的key，有就把这个value加上
    for(const c of nums3){
        for(const d of nums4){
            const sum = c + d;
            if(map.has(0-sum)){
                count += map.get(0-sum);
            }
            
        }
    }
    return count;
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