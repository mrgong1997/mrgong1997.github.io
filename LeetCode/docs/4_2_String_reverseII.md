>


---

### 例1.[ 反转字符串 II（541）-easy](https://leetcode.cn/problems/reverse-string-ii/)

#### 题目：
给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。

如果剩余字符少于 k 个，则将剩余字符全部反转。
如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。


示例1：
```
输入：s = "abcdefg", k = 2
输出："bacdfeg"
```

示例2：
```
输入：s = "abcd", k = 2
输出："bacd"
```

提示：

- 1 <= s.length <= 10的4次方
- s 仅由小写英文组成
- 1 <= k <= 10的4次方

#### 思路：
由于不能使用额外空间，因此使用双指针（指向起始和末尾）挨个交换数值，  
相对翻转链表，翻转字符串更为简单，本质上还是翻转数组。  

#### 解法：

见代码。

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0,right = s.length-1;
    while(left<right){
        //使用解构赋值交换变量，不用定义 temp
        [s[left],s[right]] = [s[right],s[left]]
        left++;
        right--;
    }
    return s;
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