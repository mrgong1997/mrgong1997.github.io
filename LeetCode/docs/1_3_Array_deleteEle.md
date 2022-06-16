>


---

### 例1.[移除元素（27）-easy](https://leetcode.cn/problems/remove-element/)

#### 题目：
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

- 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

- 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

**说明**:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:


```java
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

示例1：
```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
```

示例2：
```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```

提示：

- 0 <= nums.length <= 100
- 0 <= nums[i] <= 50
- 0 <= val <= 100

#### 思路：

移除等于某数值的元素 = 把这些元素移到数组末尾 = 把其他元素移到前面

#### 解法：
快慢指针法：快指针用于判断，慢指针用于收集  
1. 定义一个指针 i，用来从左到右遍历整个数组;一个指针 j，用来标记新数组长度；  
2. 指针 i 和 j 指向第一个元素，指针 i 从左到右遍历，若nums[i]不等于 val 就把该元素赋值给 nums[j],然后 j+1


#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    //快指针用于判断，慢指针用于收集
    //1.先定义慢指针
    let j = 0;
    //2.然后定义快指针并遍历数组
    for(let i = 0;i<nums.length;i++){
        if(nums[i] != val){
            //3.把快指针合格的元素交给慢指针
            nums[j] = nums[i];
            j = j + 1;
        }
    }
    return j;
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

### 例2.[比较含退格的字符串（844）-easy](https://leetcode.cn/problems/backspace-string-compare/)

#### 题目：
给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。

- 注意：如果对空文本输入退格字符，文本继续为空。

示例1：
```
输入：s = "ab#c", t = "ad#c"
输出：true
解释：s 和 t 都会变成 "ac"。
```

示例2：
```
输入：s = "ab##", t = "c#d#"
输出：true
解释：s 和 t 都会变成 ""。
```

示例3：
```
输入：s = "a#c", t = "b"
输出：false
解释：s 会变成 "c"，但 t 仍然是 "b"。
```

提示：

- 01 <= s.length, t.length <= 200
- s 和 t 只含有小写字母以及字符 '#'

#### 思路：
- 这道题其实是移除元素的变种，本质上还是移除元素，因此仍然用**快慢指针法**。
- 区别是这里是字符串，js的字符串不能替换，因此用栈来存放j
- 思路是只要当前字符不是#就进栈，是#就出栈

#### 解法：
定义两个栈分别用来存放 s 和 t 的最终字符，然后判断两栈是否等

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
      //注意JavaScript中一旦字符串被创建就不能被改变，只能用新的字符串或数组存放
    let stack1 = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] != "#") {
            stack1.push(s[i])
        } else {
        stack1.pop();
        }
    }
    let stack2 = [];
    for (let i = 0; i < t.length; i++) {
        if (t[i] != "#") {
            stack2.push(t[i])
        } else {
        stack2.pop();
        }
    }
    //toString()方法可以将数组转换成字符串
    return stack1.toString() == stack2.toString();
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
