>

### 1.常见的CSS布局单位

---

#### Answer：

- px ：一般指的是 CSS像素
- % ：一般指的是相对于父元素
- em/rem ：em 相对于父元素，rem 相对于根元素 （默认 font-size 为16px）
- vw/vh ：相对于视图窗口的宽度/高度，视窗宽度高度都为 100

---

### 2.实现水平垂直居中

---

#### Answer：

法一：**flex 布局**(最简单)

```
.parent {
    display: flex;
    justify-content:center;
    align-items:center;
}
```

法二：**绝对定位之 margin：auto**（适合父元素有宽高情况）

```
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto; // 四个方向设为0，并将 margin 占据所有可用空间
}

```

法三：**绝对定位之 margin-top/left 设为负**（适合已知子元素宽高）

```
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;     /* 自身 height 的一半 */
    margin-left: -50px;    /* 自身 width 的一半 */
}

```

---

### 3.实现两栏布局（左栏固定右栏自适应）

---

#### Answer：
- flex 布局
- 绝对定位之 margin-left
- 绝对定位之 left
- 浮动之 margin-left
- 浮动之 overflow

法一：**flex 布局**：左边宽度设为200px，右边 flex：1

```
.parent {
  display: flex;
  height: 100px;
}
.left {
  width: 200px;
  background: tomato;
}
.right {
  flex: 1;
  background: gold;
}

```
法二：**绝对定位之 margin-left**：左边绝对定位，右边 margin-left：200px

```
.parent {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100px;
  background: tomato;
}
.right {
  margin-left: 200px;
  background: gold;
}

```

法三：**绝对定位之 left**：右边绝对定位且 left：200px

```
.parent {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100px;
  background: tomato;
}
.right {
  margin-left: 200px;
  background: gold;
}
```

法四：**浮动之 margin-left**：左边左浮动，右边 margin-left：200px且宽度为 auto

```
.parent {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100px;
  background: tomato;
}
.right {
  margin-left: 200px;
  background: gold;
}
```

法五：**浮动之 overflow**：左边左浮动，右边 overflow: hidden，通过触发 BFC，使两侧不重叠而且实现

自适应

```
.parent {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100px;
  background: tomato;
}
.right {
  margin-left: 200px;
  background: gold;
}
```
---

### 4.实现三栏布局（左右固定中间自适应）

---

#### Answer：
- flex 布局
- 绝对定位之 margin
- 浮动之 margin

法一：**flex 布局**：左右宽度固定， 中间 flex:1

```
.parent {
  display: flex;
  height: 100px;
}

.left {
  width: 100px;
  background: tomato;
}

.right {
  width: 100px;
  background: gold;
}

.center {
  flex: 1;
  background: lightgreen;
}

```
法二：**绝对定位之 margin**：左右设为绝对，中间设置对应 margin

```
.parent {
  position: relative;
  height: 100px;
}

.left {
  position: absolute;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
  background: lightgreen;
}

```
法三：**浮动之 margin**：左栏浮动到左边，右栏浮动到右边，中间设置对应 margin（需要注意的是 center 元素需要放到其他元素后）

```
.parent {
  height: 100px;
}

.left {
  float: left;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: right;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  height: 100px;
  margin-left: 100px;
  margin-right: 200px;
  background: lightgreen;
}

```

---

### 5.对 flex 布局的理解

---

#### Answer：

##### 父元素属性：通过设置父元素属性来控制子元素排列

- **flex-direction**  
主轴方向(按行排列还是按列排)
- **justify-content**  
子元素在主轴上的排列方式    
flex-start（从头排列）/ center（主轴上居中对齐）/ space-around（均匀分布）/ space-between（先两边再均匀分布）  
- **align-items**  
单行子元素在测轴上的排列方式   
flex-start（从头排列）/ center（测轴上居中对齐）/ stretch（默认值，拉伸，但若子元素设置了高度则不会拉伸）  
- **flex-wrap**  
是否换行,默认不换行,一条主轴排下去，且子元素宽度被挤小  
- **align-content**  
多行（单行下设置这个没用）子元素在测轴的排列方式  
flex-start（从头排列） / center（测轴上居中对齐） / stretch（拉伸）/ space-around（均匀分布）/ space-between（先两边后均匀分布）  

##### 子元素属性：
- **flex**  （三个属性的缩写）   
flex-grow / flex-shrink / flex-basis:  0  1  auto（默认）   
< 占剩余空间的份数，占亏损空间的份数，占主轴空间大小（以此计算剩余空间）>











>   参考链接：[「2021」高频前端面试题汇总之CSS篇 - 掘金](https://juejin.cn/post/6905539198107942919)