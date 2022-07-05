>

### 1. new操作符的实现原理？

---

#### Answer：

- new 操作符有什么功能？
1. 通过`实例`可以访问`构造函数`的属性  
2. 通过`实例`可以访问`构造函数`的原型链的属性(方法)  
3. 构造函数的返回值：原始类型则忽略，对象则返回该对象  

- 手写 new 操作符：
```JavaScript
function mynew(Func, ...args) {
    // 1.创建一个新的空对象 {}
    const obj = {}
    // 2.通过原型链将对象的原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构造函数的 this 指向新对象 （将 args 作为参数执行构造函数里的内容，并且赋给 obj）
    let result = Func.apply(obj, args)
    // 4.对返回值进行判断
    return result instanceof Object ? result : obj
}
```

>   参考链接：[说说new操作符具体干了什么？ | 前端面试题整理](https://fanyouf.gitee.io/interview/javascript/new.html)

---

### 2. 数组有哪些原生方法？

---

#### Answer：   
- 尾部操作：pop()、push() [...arr,item] 
- 首部操作：shift()、unshift() [item,...arr]  
- 连接数组：concat()            <不影响原数组>
- 截取数组：slice(start,end)    <不影响原数组>
- 插入元素：splice()  
- 转字符串：toString()、join()  
- 重排序：reverse()、sort()  
- 迭代方法：  
a.map(func)（返回一个经函数处理的新数组）  
a.filter(func) （过滤出满足条件的元素）  
a.every(func) （检测数组元素是否都满足条件）  
a.some(func) （检测是否有一个满足条件的元素）  
- 归并方法：  
a.reduce(func) （从左至右根据函数累加）  
a.reduceRight(func) （从右至左根据函数累加）  

---
