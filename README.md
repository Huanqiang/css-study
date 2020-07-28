# 博客说明

这个一个由 react 搭建的静态博客，博客内容可由 markdown 书写。

## 功能

- [x] 路由导航
- [x] blog 头图 及 header 随着页面滚动而移动
- [x] 菜单栏
- [x] 回到最上方按钮
- [x] blog 加载 markdown 的性能优化
- [x] 部署脚本优化(基于 gh-pages 进行发布操作)
- [x] blog 看了多少，还剩多少功能
- [x] 评论功能： > [https://github.com/gitalk/gitalk#install](https://github.com/gitalk/gitalk#install)
- [x] 新增自动化生成对应 blog 信息
- [ ] 文章标签和分类
- [ ] 相关文章和推荐阅读

## 配置信息

1. 个人配置信息在 `src/config/index.js` 文件中；
2. 在根目录下新建 `github.json` 文件，并配置图床信息；

   > ```json
   > {
   >   "githubName": "github 名称",
   >   "repo": "作为图床的仓库",
   >   "token": "你的github token"
   > }
   > ```

   > 这里的 token 不能上传至 github 上，上传了会被自动删除

3. 评论配置，请参照 [为博客添加 Gitalk 评论插件](https://zhuanlan.zhihu.com/p/81270400) 申请 `GitHub OAuth application`，然后在 `src/config/index.js` 文件配置一下信息；

   > ```json
   > {
   >   "clientID": "GitHub Application Client ID",
   >   "clientSecret": "GitHub Application Client Secret",
   >   "repo": "存储你评论 issue 的 Github 仓库名",
   >   "owner": "Huanqiang",
   >   "admin": ["这个仓库的管理员"]
   > }
   > ```

## 写博客

ps：以下手动操作废弃，现在只需要 将博客放在 `src/markdown` 对应的文件夹中，注意 blog 命名为 `xxx-yyy.md`，然后运行 `scripts/newBlog.sh` 即可，该文件可复制出去，在任意位置执行；

1. 博客可写在 `src/markdown` 文件夹中；
2. 执行 `yarn build:blog` 将 markdown 编译成包含 html 的 json 文件（在执行 `yarn build:blog` 时，会将 md 中的本地图片自动上传至你指定的 github 仓库中，并修改相应的 md 文件；）；
3. 最后在 `src/markdown/index.js` 中进行引入 json 文件；

## 博客发布

执行命令 `yarn deploy`，即可将工程进行编译，并上传至 `github` 的 `github.io` 仓库中即可；

> 执行命令前，请修改 `package.json` 中的 `scripts.publish` 的 `git` 仓库地址为你自己的 `blog` 仓库
