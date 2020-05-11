# [转]localtion

> 整理自 [window.location Cheatsheet](https://dev.to/samanthaming/window-location-cheatsheet-4edl)

![56ouoyj064f18ltbnjxy](https://raw.githubusercontent.com/Huanqiang/imgBed/master/blog/56ouoyj064f18ltbnjxy.png)

### 属性

例子："http://localhost:8090/tag/400000000047003/users?type=2#top"

- `href` : http://localhost:8090/tag/400000000047003/users?type=2#top
- `origin`: http://localhost:8090
- `protocol` : http
- `host` : localhost:8090
- `hostname` : localhost
- `port` : 8090
- `pathname` : /users
- `search` : ?type=2
- `hash` : #top

### 方法

- `assgin(url)` : 加载 url 指定的网页，同时将当前页面 push 进 history，点击浏览器后退按钮时回到当前页；
- `replace(url)` : 跳转到 url 指定网页，但是不会将当前页面 push 进 history，点击浏览器时后退按钮并非回去当前页，而是当前页的前一个页面；
- `reload()` : 重新加载当前页；
- `toString()`: 输出 href；

> 此外还有一种 url 跳转方法： `window.location.href = url`

### 写法

- `window.location`（推荐）
- `window.document.location` : 路径太深，不推荐
- `document.location`（推荐）
- `location` : 可能会和用户自定义的变量重名，不推荐
