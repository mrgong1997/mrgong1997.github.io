>

### 1.对BFC的理解，如何创建一个 BFC

---

#### Answer：

块级格式化上下文（Block Formatting Context）：  
形成独立的渲染区域，容器里面的子元素不会影响到外面的元素   

创建 BFC 条件：
- float: 除 none 以外的值
- position: absolute / fixed  
- overflow: 除 visible 以外的值

（更多：根元素，display 设为 flex/inline-block 等）

使用场景：
- 解决 margin 重叠问题（两个块级元素在垂直方向上的外边距重叠）
- 解决子元素浮动父元素产生的高度塌陷问题（解决：父元素设置成 BFC，让父元素高度包含浮动的子元素）
- 防止某个元素被浮动元素覆盖
- 通过 BFC 创建两栏布局  

---

### 2.为什么要清除浮动？清除浮动的方式有哪些？

---

#### Answer：

清楚浮动-原因：  
- 子元素浮动父元素会产生高度塌陷问题
- 同级的非浮动元素会跟随其后
- 若浮动元素不是第一个元素，则之前的元素也要浮动，否则会影响页面结构

清楚浮动-方式：  
- 给父元素设置 overflow:hidden
- 在最后一个浮动元素添加一个样式为 clear:both 的 div
- 给父元素设置高度

---

### 3.position 有哪些属性？有什么区别？

---

#### Answer：
- static：默认值  
top/bottom/left/right失效
- relative：相对定位  
相对自己进行偏移，如：top:10px (向下偏移10px)
- absolute：绝对定位  
脱离文档流，相对显示设置了绝对或相对定位的父元素（默认为static）进行偏移
- fixed：固定定位  
固定出现浏览器的某个位置


---
