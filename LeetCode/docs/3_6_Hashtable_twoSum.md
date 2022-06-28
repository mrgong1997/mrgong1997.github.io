>


---

### 例1.[两数之和（1）-easy](https://leetcode.cn/problems/two-sum/)

#### 题目：
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例1：
```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

示例2：
```
输入：nums = [3,3], target = 6
输出：[0,1]
```

提示：

- 2 <= nums.length <= 104
- -10的9次方 <= nums[i] <= 10的9次方
- -10的9次方 <= target <= 10的9次方
- 只会存在一个有效答案  
进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？

#### 思路：
创建一个 map 分别存放数组的`值`和`下标`  
扫描数组，如果 map 中已存在配对的元素（target-nums[i]），则返回结果；  
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
    // 键值对形式{数值:下标}
    let map = new Map();
    for(let i = 0;i < nums.length;i++){
        //这里先判断有没有配对元素，没有再加入 map
        //防止可能将当前元素作为配对元素
        if(map.has(target-nums[i])){
            return [i,map.get(target-nums[i])];
        }
        map.set(nums[i],i);
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