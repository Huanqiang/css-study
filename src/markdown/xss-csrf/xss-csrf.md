# `XSS` 和 `CSRF`

## `xss`

`xss`（` Cross-Site Scripting`， 跨站脚本），`xss` 就是在网站中插入一个恶意代码（比如网站的评论区等可以输入的地方），然后网站不知道你输入了什么东西，就将其保存到了数据库，当其他用户访问到的时候，浏览器就会自动执行这段恶意代码，从而注入恶作剧脚本或者获取其他用户的`cookie`等隐私数据。

案例：

1. 点开一下网址：http://js.jirengu.com/lejo/1/；
2. 然后输入 `<script>alert(111)</script>`（这里也可以换成一串链接什么的）；
3. 点击提交后，你的页面上马上会弹出一个 `alert`，显示 111；

这是因为当你输入 `<script>alert(111)</script>` 后，服务器没有处理这个字符串，直接将这段代码返回，而浏览器就会直接执行该代码，这就是典型的 `xss`。

### 恶意脚本

1. `存储型XSS`：恶意代码是被存储在服务器中的，如在个人信息或发表文章等地方加入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，用户访问该页面的时候触发代码执行。这种 XSS 比较危险，容易造成蠕虫，盗窃 cookie 等。
2. `反射型XSS`：非持久化，需要欺骗用户自己去点击链接（**恶意代码被附加到了 `url` 中**）才能触发 `XSS` 代码（服务器中没有这样的页面和内容），一般容易出现在搜索页面。
3. `DOM型XSS`：通过操作 DOM 元素的 API（比如 `.innerHTML` 、`.outerHTML`、 `.appendChild`、 `document.write()` 等）来实现恶意代码的注入。`DOM型XSS` 可以是存储型的也可以是反射型的。

`DOM型XSS` 举例：

```html
<div id="link"></div>
<input type="text" id="text" value="" />
<input type="button" value="按钮" id="button" onclick="test()" />
<script>
  function test() {
    let text = document.getElementById('text').value
    // 利用了 innerHTML 注入了一个跳转到 恶意网站的 a标签
    document.getElementById('link').innerHTML = `<a href="${text}">链接</a>`
  }
</script>
```

### 防范手段

1. 对于企图获取用户 `cookie` 的，可以使用 `HttpOnly` 来防止劫取 `Cookie`；
2. 不要相信用户输入，对用户输入进行检查、过滤和转义。建立可信任的字符和 `HTML` 标签白名单，对于不在白名单之列的字符或者标签进行过滤或编码。
3. 将用户数据输出到 `html` 标签的属性时，必须经过标签属性的转义。注意：不包含`href`, `src`, `style`和事件处理函数属性（比如`onmouseover`）。
4. 对用户输入的`url`进行限制，比如知乎就是，点击用户提供的`url`都会有提示。

## `csrf`

`csrf` （`Cross-Site Request Forgery`，跨站请求伪造），是指用户被引诱打开了一个第三方网站，且在第三方网站中不慎发起了对原网站的带`cookie`的请求。

### 流程

大致流程如下：

1. 用户在 A 网站登录，保留了登录信息 `Cookie`；
2. 用户打开了 B 网站（这个 B 网站是一个黑客的恶意网页）；
3. 用户在 B 网站中无意触发了 A 网站的请求，
4. 因为用户之前就已经登录过 A 网站，所以该请求是能够被 A 网站认证的，A 网站处理请求；

### 如何在 B 网站发送 A 网站的请求

**1. 自动发起 `GET` 请求**

利用 HTML 能自动发送请求的标签：比如 `img` 标签 和 `script` 标签

```html
<img src="https://platforma.com/withdraw?account=hacker名&money=1000" />

<script src="https://platforma.com/withdraw?account=hacker名&money=1000"></script>
```

利用这类标签，用户一进入 B 网站后就会自动发送请求。

> 原理：img 标签是不受同源策略的限制，可以跨域加载资源的。

**2. 自动发起 `POST` 请求**

这类其实就是表单的自动提交。以下是黑客网站上的代码，一旦跳转到黑客指定的页面就会自动提交表单：

```html
<form action="https://platforma.com/withdraw" method="POST">
  <input type="hidden" name="account" value="hacker" />
  <input type="hidden" name="money" value="1000" />
</form>
<script>
  document.forms[0].submit()
</script>
```

**3. 点击链接来触发请求**

这种伪造请求的方式和第一种很像，不过是将请求的接口放到了 `<a>` 链接上：

```html
<img src="美女图片的链接" />
<a href="https://platforma.com/withdraw?account=hacker名&money=1000">
  点击查看更多美女图片
  <a
/></a>
```

### 防范手段

1. **`token`**：除了 `cookie` 认证外，对于重要的请求，在 http header 中还应该使用 `token` 来判断请求的来源。
2. **同源检测**： 在服务端，通过请求头中携带的 `Origin` 或者 `Referer` 属性值进行判断请求是否来源同一站点，同时服务器应该优先检测 `Origin`。为了安全考虑，相比于 `Referer`，`Origin` 只包含了域名而不带路径。
3. **给 Cookie 设置合适的 SameSite**：当从 A 网站登录后，会从响应头中返回服务器设置的 `Cookie` 信息，而如果 `Cookie` 携带了 `SameSite=strict` 则表示完全禁用第三方站点请求头携带 `Cookie`，比如当从 B 网站请求 A 网站接口的时候，浏览器的请求头将不会携带该 `Cookie`。

## 参考

1. [「每日一题」XSS 是什么？](https://zhuanlan.zhihu.com/p/22500730)

2. [XSS 和 CSRF 攻击详解](https://www.jianshu.com/p/64a413ada155)

3. [浅说 XSS 和 CSRF](https://github.com/dwqs/blog/issues/68#)

4. 推荐阅读：[浏览器专题之安全篇](https://bubuzou.com/2020/12/04/web-security/)
