rollup 打包输出模块类型配置：

## rollup 配置

- output.file —— 输出的文件 (如果没有这个参数，则直接输出到控制台)
- output.format —— Rollup 输出的文件类型 (amd, cjs, es, iife, umd)
  - amd – 异步模块定义，用于像 RequireJS 这样的模块加载器
  - cjs – CommonJS，适用于 Node 和 Browserify/Webpack
  - es – 将软件包保存为 ES 模块文件
  - iife – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
  - umd – 通用模块定义，以 amd，cjs 和 iife 为一体
- [output.name](http://output.name) --生成包名称，代表你的 iife/umd 包，同一页上的其他脚本可以访问它（iife/umd 没有 name 会报错的）

## 其他库的案例

### day.js

```js
output: {
  file: fileName,
  format: 'umd',
  name: name || 'dayjs',
  globals: {
    dayjs: 'dayjs'
  }
}
```

### react

react 会打包成 umd、es、cjs；





## 关于 webpack 使用 import 语法的问题：

实际上 webpack 没有实现原生的 es 模块（import/export），实际上是通过 babel 把import 转换成了 require 后再进行操作的。

所以对于第三方库来说如果你是使用 es 打包的，那么如果 babel 没有把 node_modules 里的文件或你的lib 文件进行编译，那么就会报错，所以不建议打包成 es，而是打包成 umd。



## 参考

> [关于webpack学习之模块篇——五种模块化兼容方案学习](https://github.com/Hibop/Hibop.github.io/issues/16#)
> [JS打包工具rollup——完全入门指南](https://segmentfault.com/a/1190000010628352) 

