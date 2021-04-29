# 性能优化

## 指标

先来看看所有可以用来衡量页面性能的指标

### 1. FP、FCP、LCP、TTI

**FP（`First Paint`，首次绘制）**：代表屏幕首次渲染像素的时间。比如 body、div 的背景色；

**FCP（`First Contentful Paint`，首次内容绘制）**：代表屏幕首席绘制内容（文字，背景图、非白色 canvans、svg）的时间；

> 这里举个例子：
>
> - 当 body 没有背景色，div 中也没有内容时，**不会**触发任何绘制
> - 当 body 有背景色，div 没有内容时，**只会**触发 FP
> - 当 div 有内容时，不管 body 是否有颜色，**都会**触发 FP、FCP
>
> FP 和 FCP 可能是相同的时间，也可能是先 FP 后 FCP。

**LCP（`Largest Contentful Paint`）** 表示可视区“内容”最大的可见元素开始出现在屏幕上的时间点。最大可见元素指：img、video、svg 中的 img、url() 加载的 img 、包含 text node 的块级元素或者 inline text 的子元素；

**TTI（`Time to Interactive`，“可交互时间”）** 表示网页第一次 **完全达到可交互状态** 的时间点。可交互状态指的是页面上的 UI 组件是可以交互的（可以响应按钮的点击或在文本框输入文字等），不仅如此，此时主线程已经达到“流畅”的程度，主线程的任务均不超过 50 毫秒。TTI 很重要，因为 TTI 可以让我们了解我们的产品需要多久可以真正达到“可用”的状态；

应用程序可能由于以下几个原因而无法响应用户输入：

- 使页面上的组件正常工作所需的 JavaScript 尚未加载。
- 有很长的任务阻塞主线程（如上一节所述）。

![Performance metrics during page load](https://markoskon.com/static/abfea44d7a0539d58a69c8f2774870f7/6e6b4/perf-metrics-load-timeline.png)

> 引用自 [Performance notes](https://markoskon.com/performance/#1-first-paint-fp)

对于 FP 和 FCP，可以用以下代码来进行跟踪分析

```html
<head>
  <!-- Register the PerformanceObserver to track paint timing. -->
  <script>
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        // `name` will be either 'first-paint' or 'first-contentful-paint'.
        const { entryType, name, startTime, duration } = entry
        console.log('类型', entryType)
        console.log('具体指标', name)
        console.log('开始时间', startTime)
        console.log('duration', duration)
      }
    })
    observer.observe({ entryTypes: ['paint'] })
  </script>
</head>
```

### Speed Index

`Speed Index` 是指可视页面加载的视觉进度，计算内容绘制速度的总分。为此，首先需要能够计算在页面加载期间，各个时间点“完成”了多少部分。

Lighthouse 使用[Speedline Node.js 模块](https://github.com/paulirish/speedline)生成 Speed Index 得分。

> https://web.dev/speed-index/#what-speed-index-measures

以下几个方式可以提高的 Speed Index 得分

- [最小化主线程工作](https://web.dev/mainthread-work-breakdown)
- [减少 JavaScript 执行时间](https://web.dev/bootup-time)
- [确保文本在 Webfont 加载期间保持可见](https://web.dev/font-display)

### Total Blocking Time

衡量从 FCP 到 TTI 之间主线程被阻塞时长的总和。

主线程执行的任务分为长任务和短任务。规定持续时间超过 50ms 的任务为长任务，低于 50ms 的任务为短任务。长任务中超过 50ms 的时间被认为是“阻塞”的，因此，TBT 是所有长任务中阻塞时间的总和。

### Cumulative Layout Shift

Cumulative Layout Shift (累计布局偏移) 有助于量化页面元素意外移动造成的用户视觉上的影响，能有效提高用户的观感体验。

> https://web.dev/cls/

## Lighthouse

Lighthouse 是一种开源的自动化工具，用于提高网页质量。你可以在任何网页上运行它。它能够针对性能、可访问性、渐进式 Web 应用等进行审核。它识别和修复影响你网站性能、可访问性和用户体验的常见问题。

![Lighthouse 参数](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20210428152318.jpeg)

> 指标计算器：https://googlechrome.github.io/lighthouse/scorecalc/#FCP=567&SI=988&LCP=1239&TTI=2498&TBT=127&CLS=0.03&FCI=2228&FMP=829&device=desktop&version=7.0.0

在 Lighthouse 中，我们可以看到整个网页的整体评分和各个指标的评分，以及影响得分地方，以便修改。

## Performance

### network

![performance network](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20210427143540.png)

一个请求的完整路径：

`Send Request` -> `Request Start` -> `Receive Response` -> `Receive Data` -> `Finish Loading`

1. `Send Request`: 表示准备给这个外链对应的服务器发送请求；
2. `Request Start`: 表示开始发送请求；
3. `Receive Response`: 表示接收响应，这里是表示告诉浏览器可以开始从网络接收数据了；
4. `Receive Data`: 表示开始接收数据；
5. `Finish Loading`: 表示已经完成下载数据；

我们结合 Network 的来看：

![network timing](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20210427104141)

1. `Send Request` -> `Request Start`: 相当于 `stalled` + `DNSL Lookup` + `inital connection` + `SSL`
2. `Request Start` -> `Receive Response`: 相当于 `request sent` + `waiting(TTFB)`
3. `Receive Response` -> `Receive Data`: 相当于 `Content Dwonload`
4. `Receive Data` -> `Finish Loading`：在上图就没有了，应该是解析文件的过程

### Main

![页面加载事件](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20210427153417.png)

## 性能优化方式

> 在 《高性能网站建设指南》一书中，已经将性能优化的准则进行了描述，可以直接参考。

在性能优化时，我们可以参照上面的性能指标来制定合理的优化方案。

### 加快 FP、FCP 和 TTI

使用缓存

1. 页面缓存
2. 图片缓存
3. 第三方 js 缓存
4. http 缓存

精简 JS

移除无效脚本

> 去除 core.js 打包

延后非首屏渲染使用的 JS，比如使用 `async`、`defer` 、或放在 `html` 底部

`serviceworker` `precache` 阶段增加 cdn 名单

`css link` 使用 `dns-prefetch`

### 优化 Cumulative Layout Shift

影响 CLS 因素

- 为图片、广告位、`iframes` 等设置尺寸
- 不要动态注入渲染内容
- 网页字体导致 FOIT/TOUT
- **动画优化**：坚持使用 `transform` 和 `opacity` 属性更改来实现动画，CSS[`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)属性使您可以为元素设置动画，而不会触发布局转换。
  - 不用更改`height`和`width`属性，请使用`transform: scale()`。
  - 左右移动的元件，避免改变`top`，`right`，`bottom`，或`left`属性，并使用`transform: translate()`来代替。

> 参考：
>
> [Optimize Cumulative Layout Shift](https://web.dev/optimize-cls/) > [Stick to Compositor-Only Properties and Manage Layer Count](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)

### 优化 LCP

- 服务器响应时间慢

  - 优化服务器；
  - 使用 CDN，缩短用户访问 HTML 页面的时间；
  - 缓存静态 HTML，使用 nginx 或云服务的缓存；
  - 使用 [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 拦截请求，仅当内容更新的时候更新被缓存的页面内容；
  - 使用 `rel="preconnect"` 和 `rel="dns-prefetch"` 来加速第三方服务的加载

    ```html
    <link rel="preconnect" href="https://example.com" />
    ```

- 优化 CSS 的加载和执行

  - `Minify` 化 css 的文件内容，加快网络请求的速度；
  - 将非首屏渲染需要的 css 提取出来，延后加载；

    - 可以使用 `Chrome DevTools` 中的 [`Coverage`](https://developers.google.com/web/tools/chrome-devtools/coverage) 功能来查找所有未使用的 CSS。

  - 对于初始呈现不需要的任何 CSS，请使用 [`loadCSS`](https://github.com/filamentgroup/loadCSS/blob/master/README.md) 来异步加载文件，这可以利用`rel="preload"`和`onload`；

    ```html
    <link rel="preload" href="stylesheet.css" as="style" onload="this.rel='stylesheet'" />
    ```

  - 将最重要的 css 直接内联在 html 中，减少网络请求；
    - [Critical](https://github.com/addyosmani/critical)，[CriticalCSS](https://github.com/filamentgroup/criticalCSS)和[Penthouse](https://github.com/pocketjoso/penthouse)都是提取和内嵌 CSS 的软件包
    - [Critters](https://github.com/GoogleChromeLabs/critters)是一个 `webpack` 插件，可以内嵌关键 CSS 并延迟加载其余的

- 优化 `JavaScript` 的加载和执行
  - `Minify` 化 `css` 的文件内容
  - 将 JS 放在 `body` 底部引入；
  - 将第三方与首屏渲染无关的 js 使用 `async` 标签；
- 优化静态资源加载时间
  - 优化和压缩图像
    - 使用 `webp` 格式
    - 使用 `cdn`
  - 预载重要资源
    - 使用 `<link rel="preload">` 来预加载关键资源；

> 参考： [Optimize Largest Contentful Paint](https://web.dev/optimize-lcp/)

## 参考

- [前端性能优化之性能指标](https://juejin.cn/post/6844904200044806157#comment)
- https://markoskon.com/performance/#1-first-paint-fp
- [性能优化：什么是 CLS 以及如何优化它](https://juejin.cn/post/6904518037563506701#heading-4)
- [从 JS 的阻塞角度谈谈浏览器渲染原理](https://yinode.tech/post/201901/%E4%BB%8Ejs%E7%9A%84%E9%98%BB%E5%A1%9E%E8%A7%92%E5%BA%A6%E8%B0%88%E8%B0%88%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E5%8E%9F%E7%90%86/)
