# Vue SSR 学习指南（小白向）

> 本文首先介绍了 SSR 的一些概念，然后提供了一个简单地基于 webpack 的 SSR Demo，并且详细地说明了可能遇到的 `Uncaught SyntaxError: Unexpected token <` 错误及其解决方案。

## 概念

> 本章内容参考：[React 中同构（SSR）原理脉络梳理](https://zhuanlan.zhihu.com/p/47044039)

### 1. 客户端渲染

客户端渲染应该是我们最熟悉的，像基于 Vue/React 等 UI 库开发的 SPA 应用就是客户端渲染的典型代表。在客户端渲染时，首先浏览器会向服务器发送网页请求，服务器返回 `index.html`，而这个 html 通常只有一个 `<div id="app"></div>` 标签，所以浏览器必然会历经一个白屏时间，然后浏览器加载并执行 js （Vue 或是 React）生成 UI 界面，并把执行结果插入到指定标签上（即在网页上渲染出 Vue/React 生成的 UI）。

### 2. 服务端渲染

服务端渲染就是指当客户端向服务器发送页面请求的时候，服务端会把完整页面的 html 代码发送回来，而不是发送一个仅包含空标签的 html，客户端只需要根据这份 html 即可把完整的页面渲染出来，无需 js 额外的操作。

> 服务端并不是一个新的东西，其实在前端工程化出来之前，早期的 J2EE 和 SSM 框架还是前后端不分离的，这类项目基于 JSP 等模板提供前端页面，浏览器向服务器发送请求的时候，服务器就是返回完整的 html 页面，然后浏览器加载并渲染即可，这就是服务端渲染。

那随着前端工程化的发展，人们发现客户端渲染带来了很多优点：

1. 前后端分离，极大地降低了项目的复杂度，清晰明确了开发职责；
2. React、Vue 等框架极大地提升了前端开发体验，而且也提升了用户体验和丰富的前端效果；
3. 页面懒加载；
4. 前端路由：用户在切换页面的时候无需向后端发送页面请求，极大地提高了用户体验；
5. 节约了服务器成本：省电省钱，JS 支持 CDN 部署，且部署极其简单，只需要服务器支持静态文件即可；

所以客户端渲染开始代替服务端渲染成为了近些年来的前端开发选择。

### 3. 同构（SSR）

但是，前面我们提到当浏览器进行客户端渲染时，一开始浏览器仅会返回一个包含空标签的简单模板，需要加载 JS，并等待 JS 执行完以提供完整的页面 UI。这就会带来一些问题：

1. 首页白屏问题（即首屏性能）：如果 JS 很大，那么用户必然会历经很长的白屏时间才能看到页面；
2. SEO 问题；

所以为了解决这些问题，人们提出了同构的概念，同构实际上是客户端渲染和服务器端渲染的一个整合，使用服务端渲染来解决首页白屏问题和 SEO 问题的同时，又保持了客户端渲染的优势。整体流程如下：

首先，服务端会执行一次我们的代码，生成完整的 HTML 页面，返回给浏览器，浏览器就可以通过它快速地渲染出来完整界面，然后等待 JS 加载完成后，Vue/React 再执行一次生成 UI 界面，并接管之后的页面交互。

![SSR](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/SSR.jpg)

> 图来源于：[React 中同构（SSR）原理脉络梳理](https://zhuanlan.zhihu.com/p/47044039)

## 基本用法

参考：这部分官网写的就够看了：[《Vue-SSR 基本用法》](https://ssr.vuejs.org/zh/guide/#安装)

## 同构 Demo

### 项目源码结构

我们的项目源码基本上如上所示

```
├── config
│   ├── webpack.base.config.js		# 基础的通用配置
│   ├── webpack.client.config.js	# 客户端渲染配置
│   └── webpack.server.config.js	# 服务端渲染配置
├── src
│   ├── App.vue
│   ├── app.js					# 通用 entry(universal entry)
│   ├── entry-client.js # 仅运行于浏览器
│   └── entry-server.js # 仅运行于服务器
├── index.template.html	# html 模板
├── package.json
└── server.js						# node 启动的 ssr
```

#### `index.template.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <!-- 使用双花括号(double-mustache)进行 HTML 转义插值(HTML-escaped interpolation) -->
    <title>{{ title }}</title>
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```

这里需要注意的是， body 中无需 `<div id="app"></div>` 这样的空标签锚点，它被移到了 `App.vue`，文件中了，取而代之的是 `<!--vue-ssr-outlet-->` 这个注释，它相当于服务端渲染的锚点，如果没有这个注释，程序就会报错。

#### `App.vue`

```vue
<template>
  <div id="app">
    <p>Hello Vue SSR</p>
  </div>
</template>
<script>
export default {}
</script>
```

这是一个简单的 Vue 单文件组件

#### `app.js`

```js
import Vue from 'vue'
import App from './App.vue'

export default function createApp() {
  const app = new Vue({
    render: h => h(App)
  })

  return { app }
}
```

这里之所以返回一个工厂函数而不是一个 Vue 实例是因为：

> 官方解释：
>
> 当编写纯客户端 (client-only) 代码时，我们习惯于每次在新的上下文中对代码进行取值。但是，Node.js 服务器是一个长期运行的进程。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享。
>
> 如基本示例所示，我们**为每个请求创建一个新的根 Vue 实例**。这与每个用户在自己的浏览器中使用新应用程序的实例类似。如果我们在多个请求之间使用一个共享的实例，很容易导致交叉请求状态污染 (cross-request state pollution)。
>
> 因此，我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例：

#### `entry-client.js`

```js
import createApp from './app'
const { app } = createApp()

app.$mount('#app')
```

#### `entry-server.js`

```js
import createApp from './app'

export default context => {
  const { app } = createApp()
  return app
}
```

### 配置 `webpack`

#### 1. 通用配置

需要安装的`npm`包：

```shell
npm install --save koa koa-static vue vue-server-renderer
```

以上这些`npm`包是整个项目生命周期中都会用到的。而下面的这些仅仅在打包的时候使用：

```shell
npm install -D css-loader html-webpack-plugin vue-loader vue-style-loader vue-template-compiler webpack webpack-cli webpack-merge webpack-dev-server
```

本文提供了一个简要的 `Vue-SSR` 的配置，具体如下：

```js
// webpack.base.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const reslove = file => path.resolve(__dirname + '/' + file)

module.exports = {
  entry: './src/index.js',
  output: {
    path: reslove('../dist/'),
    filename: '[name].app.js',
    chunkFilename: '[name].app.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: reslove('../index.template.html')
    })
  ]
}
```

因为是 vue 项目，所以我们需要安装 `vue-loader`、`vue-style-loader` 来识别 `vue` 单文件组件，并使用`html-webpack-plugin` 插件来将生成的主文件注入到 html 模板文件中。同时我们还需要在 plugins 中配置 `new VueLoaderPlugin()`。

#### 2. 客户端配置

首先安装 `vue-server-renderer` ，该 npm 包提供了 SSR 所需的 API 和 webpack 插件。

```shell
npm install vue-server-renderer
```

`webpack.client.config.js` 文件如下：

```js
// webpack.client.config.js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  // 修改入口为 entry-client.js
  entry: './src/entry-client.js',
  devtool: 'inline-source-map',
  // 此插件在输出目录中 生成 `vue-ssr-client-manifest.json`。
  plugins: [new VueSSRClientPlugin()]
})
```

`vue-ssr-client-manifest.json` 包含了 webpack 整个构建过程中的所有信息，从而可以让 `bundle renderer` 自动推导需要在 `HTML` 模板中注入的内容。

#### 3. 服务端配置

```js
// webpack.server.config.js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  // 修改入口文件为 entry-server.js
  entry: './src/entry-server.js',
  devtool: 'source-map',
  // 因为服务端渲染是在 node 环境下操作的，所以需要配置这个，以便告知 vue-loader 将 Vue 组件编译成面向服务器的代码。
  // 允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import);
  target: 'node',
  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    libraryTarget: 'commonjs2'
  },
  // 这是将服务器的整个输出 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [new VueSSRServerPlugin()]
})
```

#### 4. `package.json`

然后在 `package.json` 文件的 `scripts` 中加入 build 命令，此后就可以使用 `npm run build` 来打包构建项目了。

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "npm run build:client && npm run build:server",
  "build:client": "webpack --config config/webpack.client.config.js",
  "build:server": "webpack --config config/webpack.server.config.js"
},
```

打包出来的目录如下：

```
├── dist
│   ├── index.html
│   ├── main.app.js										# 打包出来的 js
│   ├── vue-ssr-client-manifest.json	# 客户端配置生成的 manifest 文件
└── └── vue-ssr-server-bundle.json		# 服务端配置打包结果(仅此一个文件，其余的都是 `npm run build:client` 生成的)
```

> 这里的 `index.html` 实际上是 `HtmlWebpackPlugin` 生成的，该插件基于我们设置的 template 来生成一个新的 `html` 文件，默认名为 `index.html`

### 启动 `Node` 服务器

这里我们使用 koa 来启动一个 Nodejs 的服务器。整个文件如下：

```js
const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const serve = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')

const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')

// 创建 bundle renderer
const renderer = createBundleRenderer(serverBundle, {
  basedir: path.resolve(__dirname, '/dist/'),
  runInNewContext: false,
  // 使用 clientManifest 进行资源注入：自动推断出最佳的预加载(preload)和预取(prefetch)指令，以及初始渲染所需的代码分割 chunk。
  clientManifest,
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

// 创建一个 koa 实例
const app = new Koa()

// 借助 koa-static，将打包出来的文件（dist目录下）都作为静态资源文件，以便浏览器可以访问到，
app.use(serve('dist', { index: 'xxx.html' }))

// 在 koa 中间件中读取并设置网页内容
app.use(async ctx => {
  const context = {
    title: 'Vue SSR',
    url: ctx.req.url
  }

  try {
    // 通过 bundle renderer 将 Vue 实例渲染为字符串
    const html = await renderer.renderToString(context)
    console.log(html)
    // 将返回 html 设置到页面上；
    ctx.body = html
  } catch (err) {
    console.error(err)
  }
})

// 启动 node 服务器，监听 3000 端口
app.listen(3000, () => {
  console.log('应用程序开始运行于 3000 端口')
})
```

首先我们配置一个基于 koa 的 node 服务器：

```js
const Koa = require('koa')
const app = new Koa()

app.listen(3000, () => {
  console.log('应用程序开始运行于 3000 端口')
})
```

然后我们根据打包生成的 `vue-ssr-client-manifest.json` 和 `vue-ssr-server-bundle.json` 来生成 `bundle renderer` 实例。再通过 `bundle renderer` 实例所提供的 `API` 来将打包的 Vue 实例渲染成字符串，并返回给 `ctx`。

```js
const { createBundleRenderer } = require('vue-server-renderer')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')

// 创建 bundle renderer
const renderer = createBundleRenderer(serverBundle, {
  basedir: path.resolve(__dirname, '/dist/'),
  runInNewContext: false,
  clientManifest,
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

app.use(serve('dist', { index: 'xxx.html' }))

// 在 koa 中间件中读取并设置网页内容
app.use(async ctx => {
  const context = {
    title: 'Vue SSR',
    url: ctx.req.url
  }

  try {
    // 通过 bundle renderer 将 Vue 实例渲染为字符串
    const html = await renderer.renderToString(context)
    console.log(html)
    // 将 html 返回给 ctx；
    ctx.body = html
  } catch (err) {
    console.error(err)
  }
})
```

### 可能遇到的问题

#### 问题 1：`Uncaught SyntaxError: Unexpected token <`

如果没有在设置 `ctx.body` 之前使用 `app.use(serve('dist', { index: 'xxx.html' }))` 把 `dist` 文件夹下的文件设置为静态资源，那么 `chrome` 调试工具将会出现下图错误：
![Uncaught SyntaxError](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/Uncaught-SyntaxError.png)

打开 `chrome` 调试工具的 `Sources` 页你将会发现以下信息：
![Uncaught SyntaxError-google-sources](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/Uncaught-SyntaxError-google-sources.png)

这个时候你就会很奇怪，这个 `main.app.js` 应该是一个`JS`文件，怎么会出现 `html` 的信息呢？

其实这是因为这个时候你已经完成了服务端渲染，而且也成功地将服务端返回的`HTML`页面渲染到了浏览器上，但是因为我们没有将 `dist` 文件下的文件设置为静态资源，所以浏览器将拿不到这个 `main.app.js`，并且错误将其内容填充为了 `HTML`，所以才会出现以上错误。而且要注意的是，你这个时候也**仅仅是完成了服务端渲染，还没有进行客户端渲染**，为了更直观的看到效果，我们使用 chrome 的性能调试工具来看一下刷一次网页，浏览器发生了什么，如下图所示：

![noStaticSSR](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/noStaticSSR.png)

从图中我们可以到浏览器成功的解析了 HTML，并将其渲染到了网页上，但是接下来并没有进行客户端渲染的操作，让我们对比正确的刷新操作（如下图），我们可以发现，下图中间多了一段 `main.app.js` 执行的过程，而这段过程正是我们的客户端渲染的过程。

![rightSSR](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/rightSSR.png)

现在了解了此时我们仅仅是完成了服务端渲染，还没有进行客户端渲染之后，回到问题，我们如何完成同构呢？答案就是将 `dist` 文件下的文件设置为静态资源文件，以便让浏览器能够去获取到对应的 `main.app.js` 这个资源，所以我们需要借助 `koa-static`。

于是你可能去看 [koa-static 官网的使用说明](https://github.com/koajs/static#example)，并在设置 `ctx.body` 之前写下了下面代码：

```js
app.use(serve('dist'))
```

这个时候，你就会看到一个全白的页面，什么东西没有显示，连网页 `title` 都从之前的 `Vue SSR` 变成了 `{{ title }}` 。

这个时候，打开 `chrome devTools` 可以看到 `Cannot find element: #app` 的错误：

![Cannot find element - #app](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/Cannot-find-element.png)

这个时候我们细心观察将会发现以下两个问题：

1. 我们打开 `Sources` 会发现`index` 文件的内容变成了 `dist` 文件夹下 `index.html` 中的，反而是 `main.app.js` 倒是正确的加载出来了。
2. `server.js` 的程序怎么都进不去 `在 koa 中间件中读取并设置网页内容` 这部分代码了（即 27-42 行）。

其实从第一个点，我们可以看出来事实上我们已经成功地将 `dist` 文件下的文件设置为静态资源文件，而且应用程序也成功地读取到了需要的文件。但是 `koa-static` 有一个默认配置项是 [`index`](https://github.com/koajs/static#options)，默认值为 `index.html`，而且它是基于 `koa-send` 开发的，而 `koa-send` 有一个设定就是如果你传入的目录里面有你设置的 `index` 这个文件，那么它就会把这个文件设置为 `ctx.body`。

而我们的 `dist` 文件夹中正好有一个 `index.html` 文件，所以 `koa-static` 在读取这个文件夹的时候就会把这个 `index.html` 文件返回给 `ctx.body`，同时不会进入下一个 `koa` 中间件，所以我们才会遇到上述两个问题。

同时浏览器在渲染了 `index.html` 并加载了 `main.app.js` 后就开始执行 `main.app.js`， `main.app.js`走的就是正常的客户端渲染，它是需要一个 `id=“app”` 的标签来承载内容的，而我们的 `index.htm`l 文件的 `body` 中空空如也，所以就报了上述错误。

解决方案很简单，就是给 `koa-static` 的 `index` 可选项随便设置一个名称就好了。

```js
app.use(serve('dist', { index: 'xxx.html' }))
```
