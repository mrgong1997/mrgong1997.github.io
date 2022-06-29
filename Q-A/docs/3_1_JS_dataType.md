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
1. typeof（只能判断原始类型,引用类型都被判定为 object ）  

```JavaScript
console.log(typeof "str");                //string
console.log(typeof 1);                    //number
console.log(typeof true);                 //boolean
console.log(typeof undefined);            //undefined
console.log(typeof null);                 //object (JS最初32位版本null和object类型标签相同所致)

console.log(typeof {});                   //object
```


2. instanceof （只能判断引用类型）   
底层原理为判定该对象是否能找到该构造函数的原型，即：  
判定 `arr.__proto__ == Array.prototype` 是否成立  

```JavaScript
console.log(2 instanceof Number);                // false
console.log(true instanceof Boolean);            // false 
console.log('str' instanceof String);            // false 
 
console.log([] instanceof Array);                // true
console.log(function(){} instanceof Function);   // true
console.log({} instanceof Object);               // true
```

3. constructor（都能判断）  

```JavaScript
console.log((2).constructor === Number);          // true
console.log((true).constructor === Boolean);      // true
console.log(('str').constructor === String);      // true

console.log(([]).constructor === Array);          // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object);         // true
```

4. Object.prototype.toString.call() （都能判断）    
通过调用 Object 对象的原型方法 toString 来判断:  

```JavaScript
Object.prototype.toString.call(2);        // [object Number]
Object.prototype.toString.call(true);     // [object Boolean]
Object.prototype.toString.call('str');    // [object String]
Object.prototype.toString.call(undefined);// [object Undefined]
Object.prototype.toString.call(null);     // [object Null]

Object.prototype.toString.call([]);       // [object Array]
Object.prototype.toString.call(function(){});// [object Function]
Object.prototype.toString.call({});       // [object Object]
```

---
### 3.判断一个对象为数组的方式有哪些？

---

#### Answer：
除了上面三个可以判定引用类型的方法`constructor`、`instanceof`、`Object.prototype.toString.call()`，还有：  

`Array.isArray([1,2])` ：ES5 新增方法  
`Array.prototype.isPrototypeOf([1,2])` ：判定 Array 是否在 该对象的原型链中  

---

### 4. null 和 undefined 区别 ？

---

#### Answer：
undefined ：代表变量未定义、赋值 / 变量提升  
null ：代表空对象，复制给可能会返回对象的变量作为初始化  
  
注意：  
```JavaScript
null == undefined;        //true 
null === undefined;       //false
```

---

### 5. " == " 和 " === " 的区别？以及 Object.is()  ？

---

#### Answer：
- " == "  

先判断左右两边数据类型是否相同，不同会先进行 **强制类型转换** ： 

若比较两个原始类型，则 String 和 Boolean 都会转换成 `Number`，再比较；（特例：null == undefined）  
若比较原始类型和引用类型，则会把`对象`转换成其`原始类型的值`，再比较；  
若比较两个引用类型，则会判断他们`是否指向同一个对象`；  
若存在有 NaN,则不相等。  

---

### 6. 为什么0.1+0.2 ! == 0.3 ？如何相等？

---

#### Answer：

---







>   参考链接：[「2021」高频前端面试题汇总之JavaScript篇（上） - 掘金](https://juejin.cn/post/6940945178899251230)

>   参考链接：[「2021」高频前端面试题汇总之JavaScript篇（下） - 掘金](https://juejin.cn/post/6941194115392634888)