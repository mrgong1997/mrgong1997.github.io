>


---

### 例1.[赎金信（383）-easy](https://leetcode.cn/problems/ransom-note/)

#### 题目：
给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。

如果可以，返回 true ；否则返回 false 。

magazine 中的每个字符只能在 ransomNote 中使用一次。

示例1：
```
输入：ransomNote = "a", magazine = "b"
输出：false
```

示例2：
```
输入：ransomNote = "aa", magazine = "ab"
输出：false
```

示例3：
```
输入：ransomNote = "aa", magazine = "aab"
输出：true
```

提示：

- 1 <= ransomNote.length, magazine.length <= 10的5次方
- ransomNote 和 magazine 由小写英文字母组成

#### 思路：
和字母异位词类似，只要将出现过的字母放进“桶”里计数，再扫描目标字符串取出字母，最后对“桶”进行判定即可。

#### 解法：

见代码。

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    //和字母异位词类似，最后判定条件不同
    let res = new Array(26).fill(0);
    const base = "a".charCodeAt();
    for(const m of magazine){
        res[m.charCodeAt()-base]++;
    }
    for(const r of ransomNote){
        res[r.charCodeAt()-base]--;
    }
    for(const item of res){
        if(item < 0) return false;
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