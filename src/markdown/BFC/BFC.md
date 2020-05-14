# BFC

## 官方说明

我们先来看一下 `BFC` 的官方说明：

> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.
>
> In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the ['margin'](https://www.w3.org/TR/CSS2/box.html#propdef-margin) properties. Vertical margins between adjacent block-level boxes in a block formatting context [collapse](https://www.w3.org/TR/CSS2/box.html#collapsing-margins).
>
> In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box's _line boxes_ may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself [_may_ become narrower](https://www.w3.org/TR/CSS2/visuren.html#bfc-next-to-float) due to the floats).

翻译如下：

> 浮动元素、绝对定位元素、不是 block box 的 block containers（比如 inline-blocks、table-cells 和 table-captions ）和 overflow 属性不是 visible 的 block box，这些元素会为自己的 content 构建新的块级格式化上下文（block formatting content）。
>
> 在块级格式化上下文，所有的 block box 是从包含块的顶部从一行接一行垂直排列的。两个相邻元素的垂直方向距离是由 margin 属性确定的。在 BFC 中，相邻的两个 block box 垂直方向的 margin 会发生折叠（崩塌）。
>
> 在一个 BFC 中，每一个 box 的左边会紧贴着包含块的左边（对于从右到左的格式来说，则触碰到右边缘），即使存在浮动也是如此，除非这个盒子创建一个新的块级格式化上下文。

说明中提到了 block box 和 containing block 等概念，想要理解 BFC，我们就要理解这些概念。

## 视觉格式化模型（visual formatting model）

在 HTML 中常常使用的概念是元素，而在 CSS 中，布局的基本单位是盒，盒总是矩形的，盒模型正是 css 布局的基础。

> [CSS 基础框盒模型介绍](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

一个 HTML 元素往往会生成一个盒子，根据元素类型的不同，生成的可能是块级盒（`block-level box`），也可能是行内级盒（`inline-level box`）。

### 块级元素和块级盒

块级元素：当一个元素的`display` 为 `block`、`table`、`list-item` 时，那么这个元素就是一个块级元素。元素是否是块级元素仅是元素本身的属性，并不直接用于格式化上下文的创建或布局。

一个`display` 为 `block`、`table`、`list-item` 的元素会生成一个`块级盒子（block-level box）`。块级盒子会参与到 BFC 中的，也就是说参与到 BFC 的不是块级元素，而是块级元素生成的块级盒子。**块级盒子可以用来描述元素跟它的父元素与兄弟元素之间的表现。**

一个`display` 为 `block`、`inline-block`、`list-item` 的非替换元素会生成一个块级容器盒子（`block container box`）。块级容器盒子只有两种行为：1. 仅包含块级盒；2. 建立仅包含行内级盒子的行内格式化上下文。**块级容器盒子可以用来描述元素跟它的后代之间的影响。**

所以当一个非替换元素的 display 属性为 `block`、`table` 时，那么这个元素生成的盒子既是块级盒子也是块级容器盒子，我们称这样的盒子为块盒子（`block box`）。

#### 匿名块盒子（`Anonymous block boxes`）

> 为了更好的理解匿名块盒子，我们使用 [MDN 上的例子](<[https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model#%E5%8C%BF%E5%90%8D%E5%9D%97%E7%9B%92%E5%AD%90](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model#匿名块盒子)>)。

HTML 如下，且不设置任何额外的 CSS。

```html
<div>
  Some inline text
  <p>followed by a paragraph</p>
  followed by more inline text.
</div>
```

我们可以看到这段代码包含了一下一些元素：一个 `div` 元素，文字 `Some inline text` ，一个 `p` 元素和文字 `followed by more inline text.` 。我们知道一个 `div` 元素会生成一个块容器盒子（也是块级盒子和块盒子）， 块容器盒子要么仅包含块级盒子，要么 建立仅包含行内级盒子的行内格式化上下文。也就是说一个块容器盒子中不能同时包含块级盒子和行内盒子。

但是上述文字就是一盒行内元素，但是代码中的两段没有标签包含的文字其实就是行内元素（会生成行内盒子）。这就与规范相违背了，所以为了解决这个问题，当一个块容器盒子中同时包含块级盒子和行内盒子的时候，CSS 会自动为行内盒子生成一个匿名块盒子。

![=anonymous_block-level_boxes](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/=anonymous_block-level_boxes.png)

CSS 选择器不能作用于匿名盒子，所以它不能被样式表赋予样式。也就是说，此时所有可继承的 CSS 属性值都为 `inherit` ，而所有不可继承的 CSS 属性值都为 `initial`。

另一种会创建匿名块盒子的情况是一个行内盒子中包含一或多个块盒子。此时，包含块盒子的盒子会拆分为两个行内盒子，分别位于块盒子的前面和后面。块盒子前面的所有行内盒子会被一个匿名块盒子包裹，块盒子后面的行内盒子也是一样。因此，块盒子将成为这两个匿名块盒子的兄弟盒子。

如果有多个块盒子，而它们中间又没有行内元素，则会在这些盒子的前面和后面创建两个匿名块盒子。

> 例子详见 [创建匿名块盒子实例 2](<[https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model#%E7%A4%BA%E4%BE%8B_2](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model#示例_2)>)。

> 行内元素和行内盒子就略过不述了。参考资料里面有详细介绍。

## BFC

我们先来看看格式化上下文（`Formatting Context`），格式化上下文决定了文档的渲染方式（即子元素将如何定位，以及和其他元素的关系和相互作用）。normal flow 中的盒子都属于格式化上下文，不同的盒子使用不同的格式化上下文来布局，块级盒子参与（`participate in`）块格式化上下文（BFC）中，行内级盒子参与行内格式化上下文（IFC）中。

> 我们可以认为 normal flow 就是由块格式化上下文和行内格式化上下文决定的。

### 生成 BFC

产生 BFC 的方式很多：

1. 根元素（`<html>`）
2. 浮动元素（`float` 不为 `none`）
3. 绝对定位元素（`position` 为 `absolute` 或 `fixed`）
4. `display` 为以下值：`flow-root`、`inline-blck`、`table-cell`、`table-caption`、`table`、`table-row`、 `table-row-group`、`table-header-group`、`table-footer-group`；
5. `overflow` 不为 `visible`；
6. [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content`或 `paint` 的元素
7. 弹性元素（`display`为 `flex` 或 `inline-flex`元素的直接子元素）
8. 网格元素（`display`为 `grid` 或 `inline-grid` 元素的直接子元素）
9. 多列容器（元素的 `column-count`或 `column-width`不为 `auto`，包括 `column-count` 为 `1`）
10. `column-span` 为 `all` 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）。

> 这里值得注意的是根元素会产生 BFC，所以我们平时所用的流式布局中块级元素的布局方式其实就是 BFC 规定的布局方式。

### 布局规则

从 BFC 的官方说明，我们可以总结出以下规则：

1. BFC 内部的块级盒子是从包含块的顶部从一行接一行垂直排列的；

2. 相邻的块级元素的垂直方向的外边距会发生折叠，大小由两个 margin 值中最大值决定；

3. BFC 的高度会包含内部的浮动元素，除非这个盒子创建一个新的块级格式化上下文。

   > 在正常情况下，一个元素成为浮动元素后，它会创建一个 BFC，所以其高度不会被计算到其父组件中，除非我们重新为其父组件创建一个 BFC。

4. 同级 BFC 之间不会相互影响，也不会发生 margin 折叠的情况。不同 BFC 之前的元素也不会相互影响。

### 例子

例子很多请参照： [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context#Specifications)

## 参考

1. [视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)
2. [9.2 Controlling box generation](https://www.w3.org/TR/CSS22/visuren.html#box-gen)
3. [CSS 中各种布局的背后(\*FC)](https://zhuanlan.zhihu.com/p/34177963)
