>


---

### 例1.[快乐数（202）-easy](https://leetcode.cn/problems/happy-number/)

#### 题目：
编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」 定义为：

对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。
如果 n 是 快乐数 就返回 true ；不是，则返回 false 。

示例1：
```
输入：n = 19
输出：true
解释：
1平方 + 9平方 = 82
8平方 + 2平方 = 68
6平方 + 8平方 = 100
1平方 + 0平方 + 0平方 = 1
```

示例2：
```
输入：n = 2
输出：false
```

提示：

- 1 <= n <= 2的31次方 - 1

#### 思路：
第一，如何拿到任意数各个位的数值：（除十取余法）  
每次对 10 取余拿到该值，再将 n 除以 10 重新赋值并向下取整，直到 n = 0  
这样就拿到了从个位->十位->百位...的数值了  
第二，创建一个集合，把出现过的值都放进去，如果发现已经有该值，则退出循环（不是快乐数）

#### 解法：

见代码。

#### 代码：

<!-- tabs:start -->

#### **JavaScript**

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
//封装得到对应数平方和的函数
var getSum = function(n){
    let sum = 0;
    while(n){
        sum = sum + (n%10)**2;
        n = Math.floor(n/10);
    }
    return sum;
}
var isHappy = function(n) {
    let resSet = new Set();
    // 先把 n 加进去，然后给 n 赋新值，看新 n 是否存在集合中，已经有了就可以退出循环了
    //（思考这样写的逻辑，注意是判定是否出现重复值而不是判定是否会回到最初的 n）
    while(n!=1 && !resSet.has(n)){
        resSet.add(n);
        n = getSum(n);
    }
    return n==1;
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