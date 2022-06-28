>


---

### 例1.[两个数组的交集（349）-easy](https://leetcode.cn/problems/intersection-of-two-arrays/)

#### 题目：
给定两个数组 nums1 和 nums2 ，返回它们的交集。输出结果中的每个元素一定是唯一的。我们可以不考虑输出结果的顺序 。

示例1：
```
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
```

示例2：
```
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
解释：[4,9] 也是可通过的
```

提示：

- 1 <= nums1.length, nums2.length <= 1000
- 0 <= nums1[i], nums2[i] <= 1000

#### 思路：
为了得到两数组的交集且交集中的元素唯一，  
将一个数组转化成集合，把另一个数组中存在于该集合中的元素收集起来即可。  

#### 解法：

见代码。

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    //借助 Set 集合来给数组去重

    //使 nums1 为长的那个数组(这段可以不要)
    if(nums1.length < nums2.length){
        const temp = nums1;
        nums1 = nums2;
        nums2 = temp;
    }
    let nums1Set = new Set(nums1);
    let resSet = new Set();
    for(let i = nums2.length;i>=0;i--){
        //如果集合中存在nums2中的该元素则添加
        nums1Set.has(nums2[i]) && resSet.add(nums2[i]);
    }
    return Array.from(resSet);
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