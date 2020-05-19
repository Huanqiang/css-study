# 简易脚手架

我们在使用 `vue-cli`、`create-react-app` 的时候，只要执行一个简单的命令 `vue init app` 或是  `create-react-app app` 就是快速创建出一个可直接使用的项目模板，极大地提高了开发效率。

本文提供了一个开发简易脚手架的过程。

## 准备工作

### 第三方工具

* [comander](https://github.com/tj/commander.js)： `tj` 大神出品的`nodejs`命令行解决方案，用于捕获控制台输入的命令；
* [chalk](https://github.com/chalk/chalk)：命令行文字配色工具；
* [cross-spawn](https://github.com/moxystudio/node-cross-spawn)：跨平台的 `node` spawn/spawnSync 解决方案；
* [fs-extra](https://github.com/jprichardson/node-fs-extra)：`nodejs` `fs` 的加强版，新增了API的同时，也包含了原`fs`的`API`；
* [handlebars](https://github.com/wycats/handlebars.js/)：一个字符串模板工具，可以将信息填充到模板的指定位置；
* [inquirer](https://github.com/SBoudrias/Inquirer.js/)：交互式命令行用户界面集合，用于使用者补充信息或是选择操作；
* [log-symbols](https://github.com/sindresorhus/log-symbols)：不同日志级别的彩色符号标志，包含了 `info`、`success`、`warning` 和 `error` 四级；
* [ora](https://github.com/sindresorhus/ora)：动态加载操作符号；

### 初始化项目

首先，这仍然是一个 `nodejs` 的工程项目，所以我们新建一个名为 `scaffold-demo` 的文件夹，并使用 `npm init` 来初始化项目。此时，项目中只有一个 `package.json` 文件，内容如下：

```json
{
  "name": "scaffold-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

然后我们删除 `"main": "index.js"`，加入 `"private": false`。

> `main`：是程序的主要入口点，就是说如果有其他用户 `install` 并 `requrie` 这个包，那么将返回该文件 `export` 出来的对象。
>
> `private`：是为了保护私有库的手段，当你的库是私有库的时候，加入 `"private": true`，那么`npm`将会拒绝发布这个库。

我们在使用其他脚手架时，在控制台中输入一段简短的命令就能快速创建一个项目模板，那么他们是如何使用命令行来操作运行项目的呢，答案就在 `npm` 的 `package.json` 的 `bin` 字段值中。

> `bin` 字段接受一个 k-v 的`Map`，其中 `key` 表示命令名称，`value`表示命令执行的入口文件。当设置了`bin`字段后，一旦安装了你的 `package`，`npm`将会这个命令注册到全局中，并链接对应的文件，然后用户就可以直接使用该命令了。
>
> 详见：[npm bin 官方文档](https://docs.npmjs.com/files/package.json#bin)

我们需要在 `package.json` 文件中加入以下内容，其中这个 `sd` 就是我们命令：

```json
"bin": {
  "sd": "./main.js"
},
```

然后在项目中新建 `main.js` 文件，内容如下：

```javascript
#!/usr/bin/env node

console.log('Hello Bin')
```

> 其中 `#!/usr/bin/env node` 的作用就是这行代码是当系统运行到这一行的时候，去 `env` 中查找 `node` 配置，并且调用对应的解释器来运行之后的 `node` 程序。

然后我们执行命令 `npm link` 或是 `npm install -g`，这样将本项目的命令注册到了全局中，然后在命令行中执行 `sd` 就能看到结果 `Hello Bin` 。

![first-npm](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/first-npm.png)

> `npm link` :将当前 `package` 链接到全局执行环境。
>
> `npm install -g`：将当前 package 全局安装到本地。
>
> 对应的解除命令为： `npm unlink` 或是 `npm uninstall -g`

## 正式开始

现在我们已经能够完成最基础的命令行操作了，继续构建我们简易脚手架。

### 1. 捕获命令信息

在上文，我们设置了bin信息，但是只有一个命令名称信息，但是在其他脚手架中，我们可以输入多个字段，如 `create-react-app app` 中 `create-reate-app` 表示命令，`app`表示创建的项目的名称。而这种捕获命令行的操作我们可以借助 [comander](https://github.com/tj/commander.js) 来完成。

> 实际上，`vue` 和 `react` 的脚手架也是借助 [comander](https://github.com/tj/commander.js) 完成的。

我们将 `main.js` 做如下修改：

```js
#!/usr/bin/env node
const program = require('commander')

program
  .command('init <name>')
  .description('初始化模板')
  .action(name => {
    console.log('Hello ' + name)
  })

program.parse(process.argv)
```

然后在命令行输入 `sd init firstApp`，就能看到返回 `Hello firstApp`了。

![npm-firstApp](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/npm-firstApp.png)

在上述代码中，`command` 函数表示当前命令的一个子命令，可以设置多个，紧随的 `description` 用于描述该命令，`action` 表示输入命令后需要执行的操作。其中 `command` 中的尖括号（`<>`）表示该参数为必须输入的，中括号（`[]`）表示为可选的。 `program.parse(process.argv)` 必须要，如果没有则不会起作用。

> 更详细例子参考官网的例子：https://github.com/tj/commander.js/#examples

### 2. 复制项目模板至指定目录

在本文中我们采用的本地项目模板复制的方式，即本脚手架中包含了所需要初始项目的模板文件，位于`Template`文件夹下（这个目录开发者可以随意修改）。

> 如果想使用在线模板的方式，可以借助工具 `download-git-repo`，将 copy 换成下载即可。
>
> 本文的 `template` 内容见文末的代码仓库。

然后我们将 `action` 中的逻辑替换成如下内容：

```javascript
action(async name => {
	// 判断用户是否输入应用名称，如果没有设置为 myApp
  const projectName = name || 'myApp'
  // 获取 template 文件夹路径
  const sourceProjectPath = __dirname + '/template'
  // 获取命令所在文件夹路径
  // path.resolve(name) == process.cwd() + '/' + name
  const targetProjectPath = path.resolve(projectName)

  // 创建一个空的文件夹
  fs.emptyDirSync(targetProjectPath)

  try {
    // 将模板文件夹中的内容复制到目标文件夹（目标文件夹为命令输入所在文件夹）
    fs.copySync(sourceProjectPath, targetProjectPath)
    console.log('已经成功拷贝 Template 文件夹下所有文件！')
  } catch (err) {
    console.error('项目初始化失败，已退出!')
    return
  }
}
```

### 3. 确认目标文件夹是否存在（命令行交互）

我们已经完成了最基础简单的目标文件复制的过程，但是在实际过程中，很有可能存在用户输入的文件夹已经存在了的情况，所以我们需要询问用户是要覆盖原文件夹内容还是退出重新操作。这一块的操作我们使用 [inquirer](https://github.com/SBoudrias/Inquirer.js/) 来完成，[inquirer](https://github.com/SBoudrias/Inquirer.js/) 可以提供命令行的用户交互功能。

我们在创建空文件夹之前加入一下判断文件是否存在的代码。

```javascript
// 判断文件夹是否存在
if (fs.existsSync(targetProjectPath)) {
  console.log(`文件夹 ${projectName} 已经存在！`)
  try {
    // 若存在，则询问用户是否覆盖当前文件夹的内容，yes 则覆盖，no 则退出。
    const { isCover } = await inquirer.prompt([
      { name: 'isCover', message: '是否要覆盖当前文件夹的内容', type: 'confirm' }
    ])
    if (!isCover) {
      return
    }
  } catch (error) {
    console.log('项目初始化失败，已退出!')
    return
  }
}
```

> 请注意这里使用了 `async - await` 。

![app-exist](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/app-exist.png)

### 4. 美化命令行 console 

现在的命令行都是单调的白色字，我们使用 [chalk](https://github.com/chalk/chalk) 和 [log-symbols](https://github.com/sindresorhus/log-symbols) 来实现命令行的美化。主要代码如下：

> 主要改了 `console` 部分的代码，使用  [log-symbols](https://github.com/sindresorhus/log-symbols) 添加输出标识， [chalk](https://github.com/chalk/chalk) 改变文字颜色。

```javascript
action(async name => {
  // 判断用户是否输入应用名称，如果没有设置为 myApp
  const projectName = name || 'myApp'
  // 获取 template 文件夹路径
  const sourceProjectPath = __dirname + '/template'
  // 获取命令所在文件夹路径
  // path.resolve(name) == process.cwd() + '/' + name
  const targetProjectPath = path.resolve(projectName)

  // 判断文件夹是否存在及其后续逻辑
  if (fs.existsSync(targetProjectPath)) {
    console.log(symbols.info, chalk.blue(`文件夹 ${projectName} 已经存在！`))
    try {
      const { isCover } = await inquirer.prompt([
        { name: 'isCover', message: '是否要覆盖当前文件夹的内容', type: 'confirm' }
      ])
      if (!isCover) {
        return
      }
    } catch (error) {
      console.log(symbols.fail, chalk.red('项目初始化失败，已退出!'))

      return
    }
  }
  // 创建一个空的文件夹
  fs.emptyDirSync(targetProjectPath)

  try {
    // 将模板文件夹中的内容复制到目标文件夹（目标文件夹为命令输入所在文件夹）
    fs.copySync(sourceProjectPath, targetProjectPath)
    console.log(symbols.success, chalk.green('已经成功拷贝 Template 文件夹下所有文件！'))
  } catch (err) {
    console.error(symbols.fail, chalk.red('项目初始化失败，已退出!'))
    return
  }
})
```

美化前：

![console-normal](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/console-normal.png)

美化后：

![console-beautify](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/console-beautify.png)

### 5. 修改 package.json

有些时候，我们需要根据用户输入来修改填充 `package.json`，就像 `npm init` 的时候输入的信息。在这里我们使用 [inquirer](https://github.com/SBoudrias/Inquirer.js/) 获取用户输入，使用 [handlebars](https://github.com/wycats/handlebars.js/) 来将用户输入填充到  `package.json` 中去。

在拷贝文件夹后加入以下代码：

```javascript
// 获取项目的描述及作者名称等信息
const { projectDescription, projectAuthor } = await inquirer.prompt([
  { name: 'projectDescription', message: '请输入项目描述' },
  { name: 'projectAuthor', message: '请输入作者名字' }
])

const meta = {
  projectAuthor,
  projectDescription,
  projectName
}

// 获取拷贝后的模板项目中的 `package.json`
const targetPackageFile = targetProjectPath + '/package.json'
if (fs.pathExistsSync(targetPackageFile)) {
  // 读取文件，并转换成字符串模板
  const content = fs.readFileSync(targetPackageFile).toString()
  // 利用 handlebars 将需要的内容写入到模板中
  const result = handlebars.compile(content)(meta)
  fs.writeFileSync(targetPackageFile, result)
} else {
  console.log('package.json 文件不存在：' + targetPackageFile)
}
```



至此，我们的简易脚手架已经基本搭建完成了，能够在指定文件夹生成项目模板文件。但是，我们如果使用 `create-react-app` 的话，就会发现只要你一执行命令就会它帮你自动安装依赖，而且也会自动初始化 `Git`。

现在我们就来完成这两个功能。

### 6. 安装依赖

```json
// 通过执行命令 yarn --version 的方式，来判断本机是否已经安装了 yarn
// 如果安装了，后续就使用yarn，否则就使用 npm；
function canUseYarn() {
  try {
    spawn('yarnpkg', ['--version'])
    return true
  } catch (error) {
    return false
  }
}

function tryYarn(root) {
  return new Promise((resolve, reject) => {
    let child
    const isUseYarn = canUseYarn()
    if (isUseYarn) {
      // 这里就相当于命令行中执行 `yarn`
      child = spawn('yarnpkg', ['--cwd', root], { stdio: 'inherit' })
    } else {
      // 这里就相当于命令行中执行 `npm install`
      child = spawn('npm', ['install'], { cwd: root, stdio: 'inherit' })
    }
		// 当命令执行完成的时候，判断是否执行成功，并输出相应的输出。
    child.on('close', code => {
      if (code !== 0) {
        reject(console.log(symbols.error, chalk.red(isUseYarn ? 'yarn' : 'npm' + ' 依赖安装失败...')))
        return
      }
      resolve(console.log(symbols.success, chalk.green(isUseYarn ? 'yarn' : 'npm' + ' 依赖安装完成!')))
    })
  })
}
```

> 这里需要注意的是执行命令语句 `spawn('yarnpkg', ['--cwd', root], { stdio: 'inherit' })`。
>
> 上述语句相当于命令行中执行 `yarn`，但是我们必须加上 `'--cwd'` 来将其执行路径修改为命令所在的目录，因为 `spawn` 默认执行目录是脚手架目录。同时又因为 `spawn` 是开了一个子线程，所以如果你不使用 `{ stdio: 'inherit' }`，那么你将看不到 `yarn` 安装的过程。
>
> > 参考博客：[Node.js child_process模块解读](https://juejin.im/post/5b10a814f265da6e2a08a6f7)
> >
> > `stdio` 选项用于配置父进程和子进程之间建立的管道，由于 `stdio` 管道有三个(`stdin`, `stdout`, `stderr`）因此 `stdio` 的三个可能的值其实是数组的一种简写
> >
> > - `pipe` 相当于 `['pipe', 'pipe', 'pipe']`（默认值）
> > - `ignore` 相当于 `['ignore', 'ignore', 'ignore']`
> > - `inherit` 相当于 `[process.stdin, process.stdout, process.stderr]` 

然后在修改 `package.json` 代码后面添加以下代码即可。

```js
// 安装依赖
await tryYarn(targetProjectPath)
```

### 7. 初始化 Git

然后我们进行git的初始化，即执行 `git init`。

```javascript
function tryInitGit(root) {
  // 原本模板中，我们就存放了 gitignore 模板文件，需要将其内容复制到新建的 .gitignore 文件中
  try {
    // 如果项目中存在了 .gitignore 文件，那么这个 API 会执行失败，跳入 catch 分支进行合并操作
    fs.moveSync(path.join(root, 'gitignore'), path.join(root, '.gitignore'))
  } catch (error) {
    const content = fs.readFileSync(path.join(root, 'gitignore'))
    fs.appendFileSync(path.join(root, '.gitignore'), content)
  } finally {
    // 移除 gitignore 模板文件
    fs.removeSync(path.join(root, 'gitignore'))
  }

  try {
    spawn('git', ['init'], { cwd: root })
    spawn('git', ['add .'], { cwd: root })
    spawn('git', ['commit', '-m', 'Initial commit from New App'], { cwd: root })
    console.log(symbols.success, chalk.green('Git 初始化完成!'))
  } catch (error) {
    console.log(symbols.error, chalk.red('Git 初始化失败...'))
  }
}
```

然后在安装依赖之后加入以下代码：

```javascript
// 初始化 git
tryInitGit(targetProjectPath)
```

![completed](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/completed.png)

## 总结

本文代码仓库：https://github.com/Huanqiang/scaffold-demo

本文总结了个人在搭建简易脚手架的过程，功能过于简单，算是一个小小的开端吧。

最后不由感叹 `nodejs` 还是非常之强悍的！


