>


---

### 例1.[ 反转字符串（344）-easy](https://leetcode.cn/problems/reverse-string/)

#### 题目：
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

示例1：
```
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

示例2：
```
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

提示：

- 1 <= s.length <= 10的5次方
- s[i] 都是 ASCII 码表中的可打印字符

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