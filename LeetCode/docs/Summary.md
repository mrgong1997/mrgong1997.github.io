# Summary

#### 1.Notice

- 先看输入输出
- 注意输入的取值范围，通过 if 排除特殊的输入情况：如 0、1 等
- 防止数据溢出（可通过等式变换）

#### 2.Skills

Array： 
- arrary.toString() ：将数组转换成由逗号分隔的字符串（JavaScript 中一旦字符串被创建就不能被改变，只能转成数组操作）
- arrary.reverse() ：反转数组 
- const arr = new Array(3).fill(0):定义并初始化3行的全为0的一维数组
- const arr = new Array(5).fill(0).map(v => new Array(3).fill(0))：定义并初始化5行3列的全为0的二维数组 
- Array.from(Object)：通过给定对象创建一个数组 （如 Array.from(set)）

Set：
- set.has(ele): 集合是否存在该元素

Number：
- Math.floor():向下取整  

String：
- string1.include(string2): 字符串1是否包含字符串2，返回 bool 类型
- string.replace("a","b"): 把字符串的第一个字符`a`替换成`b`
- string.charCodeAt(index): 获得对应索引字符的 Unicode 编码

Other：
- 短路求值   
&&
```JavaScript
if(value) isTrue();
//等价于
value && isTrue();
```
||
```JavaScript
if(!value) isFalse();
//等价于
value || isFalse();
```
#### 3.Thinking

- 算法中写循环时，多关注起点和终点，以及递进的操作，多用**左闭右开**的原则

