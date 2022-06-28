>
<!-- 5.16-5.22（一周） -->
### 1.JavaScript 有哪些数据类型，它们的区别？

---

#### Answer：
1. 种类：原始（5+2）+ 引用（1）

原始数据类型：（存储在栈中）   
- String Number Boolean null undefined + symbol(es6) bigInt(es10)  

引用数据类型：（存储在堆中）   
- Object（包含 function Date Array Set Map 等）

2. 区别：
- 原始数据类型：栈内存中一块连续的存储空间，占据空间小、大小固定。赋值操作（ b = a ）如图：  
![栈内存](imgs/3_1_1.png)

- 引用数据类型：在堆内存中存放对象，还会在栈内存中存放指向该对象的地址，占据空间大、大小不固定。赋值操作（ obj2 = obj1 ），属于浅拷贝，更改 obj2 会改变 obj1 ，如图：  
![堆内存](imgs/3_1_2.png)

---

### 2.数据类型检测的方式有哪些？

---

#### Answer：
1. typeof  



2. instanceof  



3. constructor  



---







>   参考链接：[「2021」高频前端面试题汇总之JavaScript篇（上） - 掘金](https://juejin.cn/post/6940945178899251230)

>   参考链接：[「2021」高频前端面试题汇总之JavaScript篇（下） - 掘金](https://juejin.cn/post/6941194115392634888)