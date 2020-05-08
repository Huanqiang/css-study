# 博客说明

这个一个由 react 搭建的静态博客，博客内容可由 markdown 书写。

## 功能

- [x] 路由导航
- [ ] blog 头图 及 header 随着页面滚动而移动
- [x] 菜单栏
- [ ] 回到最上方按钮
- [ ] blog 加载 markdown 的性能优化和加载效果
- [ ] 打包性能优化（bundle 拆分）
- [ ] 部署脚本优化（需要看一下 npm run build）
- [ ] blog 看了多少，还剩多少功能
- [ ] 评论功能：https://github.com/gitalk/gitalk#install

## 配置信息

1. 个人配置信息在 `src/config/profile.js` 文件中；
2. 博客可写在 `src/markdown` 文件夹中，然后执行 `yarn build:blog` 将 markdown 编译成包含 html 的 json 文件，最后在 `src/markdown/index.js` 中进行引入 json 文件；

## 博客发布

执行命令 `yarn deploy`，即可将工程进行编译，然后上传至 github 的 github.io 仓库中即可；
