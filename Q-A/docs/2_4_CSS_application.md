>

### 1.如何解决 1px 问题？

---

#### Answer：
1px 问题：  
在一些高分屏上，移动端存在像素密度 window.devicePixelRatio = 设备的物理像素 / CSS像素，因此设置 1px 的 CSS 像素实际会用 2 个物理像素来渲染，会变得很粗。  

解决思路：
- 思路一：先在 JS 中拿到 devicePixelRatio，然后`通过 JSX 语法传给 data-device 属性`，最后`在属性选择器中命中`属性为该值的情况：

```
<div id="container" data-device={{window.devicePixelRatio}}></div>
```

```
#container[data-device="2"] {
  border:0.5px solid #333
}
```
缺点：不兼容安卓系统
- 思路二：利用伪元素绝对定位放大后缩小（可行性高）  
目标元素设为相对定位，伪元素设为绝对定位，border值设为 1px，把`伪元素宽高设置成 200% 进行放大`，再通过 `scale(0.5) 进行缩小`，使伪元素的宽高和目标元素对齐，border 正好缩小为 1px 的 1/2.

```
#container[data-device="2"] {
    position: relative;
}
#container[data-device="2"]::after{
      position:absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      content:"";
      transform: scale(0.5);
      transform-origin: left top;
      box-sizing: border-box;
      border: 1px solid #333;
    }
}
```
- 思路三：直接在 viewport 里面设置缩放比例（会导致文字图片等内容会被缩小）
```
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
```

---

### 2.实现一个三角形

---

#### Answer：
将盒子宽高设置为 0，再将某个方向（如 border-top）边框设为可见，其他方向设为透明：  
```
.triangle {
    width: 0;
    height: 0;
    border: 100px solid transparent;
    border-top: 100px solid red;
}
```

---
### 3.实现一个扇形

---

#### Answer：

同三角形，加个 border-radius 即可

```
.sector {
    width: 0;
    height: 0;
    border: 100px solid transparent;
    border-top: 100px solid red;
    border-radius: 100px;
}
```

---

### 4.设置小于 12px 的字体

---

#### Answer：
背景：设置字体大小为 12px 以下时，显示的都是 12px 大小。  
解决方法：  
- 通过 transform的缩放属性 `transform:scale(0.5)`（注意：若是行内元素需要转化成块级元素）
- 将 12px 的字体做成图片。


---