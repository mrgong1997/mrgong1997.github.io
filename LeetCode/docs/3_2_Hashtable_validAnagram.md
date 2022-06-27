>


---

### 例1.[有效的字母异位词（242）-easy](https://leetcode.cn/problems/valid-anagram/)

#### 题目：
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

示例1：
```
输入: s = "anagram", t = "nagaram"
输出: true
```

示例2：
```
输入: s = "rat", t = "car"
输出: false
```

提示：

- 1 <= s.length, t.length <= 5 * 104
- s 和 t 仅包含小写字母

#### 思路：

定义一个长度为 26 且全为 0 的数组，每个元素代表字母出现的次数  
扫描 s 字符串，出现对应字符 +1；扫描 t 字符串，出现对应字符 -1；  
最后判断数组是否全为 0 即可 

#### 解法：

见代码。

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length!=t.length) return false;
    // 定义一个存放 26 字母的数组
    let res = new Array(26).fill(0);
    let base = "a".charCodeAt();
    //遍历s字符串，统计到数组对应序号
    for(const i of s){
        res[i.charCodeAt()-base]++;
    }
    for(const i of t){
        res[i.charCodeAt()-base]--;
    }
    for(const i of res){
        if(i) return false;
    }
    return true;
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