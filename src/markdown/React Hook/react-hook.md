# React Hook

Hook 是 React 16.8 的新增特性，可以让开发者不使用 `class` 的情况下使用 `state` 及其他特性。

## 函数式组件

函数式组件就是一个纯函数，它属于无状态组件（`Stateless Components`），返回了`DOM`或是其他组件，在函数组件中，你无法使用 State，也无法使用组件的生命周期方法，这就决定了函数组件都是展示性组件（`Presentational Components`），接收`Props`，渲染`DOM`，而不用关注其他逻辑。

我们知道只要父组件进行了重渲染，函数式组件也要进行重渲染，而当函数式组件进行重渲染的时候，其实相当于重新执行了一次该函数，使得这个函数中的每一个变量都与之前的不一样了（除了表现形式），我们举个例子：

> 例子来源 [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)

```react
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

在这个例子中，我们假设当前时刻 `props.user` 的值为 `”AAA“`，然后按下 `Follow` 按钮，再去更新 `props.user` 的值为 `”BBB“`，这样就会引起 `ProfilePage` 组件进行重渲染，然后过了 3 秒，弹窗出现，我们会发现弹框显示的信息仍是 `”AAA“`。

这是因为 **react 函数式组件始终会捕获、记录和使用当前渲染的 props、state**。即在 `props.user` 的值更新之后，`ProfilePage` 组件进行了重渲染，也生成了新的 `handleClick` 和 `showMessage` 这两个函数，但是因为闭包的性质，所以之前那个 `props.user` 的值为 `”AAA“` 的 `showMessage` 函数仍然存在，且直到重渲染前的`handleClick`中的`setTimeout`执行完毕才会被销毁。所以说不仅重渲染前后的 `handleClick` 和 `showMessage` 这两个函数发生了变化，而且函数中对应的所捕获的值也是不一样，分别是更新前后的值。

## 出现的目的

### 1. 用于代替 `render prop` 和 高阶组件（`HoC`）。

在 v16.8 之前，我们经常采用 `render prop` 和 高阶组件（`HoC`）来重构组件，这两种方法都能够很好的帮组我们复用组件和提取公共逻辑，但是它们会让项目/组件结构变得更加复杂，比如下面这个例子，该例子设置了一个最小屏幕宽度，当浏览器宽度大于设定值时，显示需要的组件，小于设定值时，不显示。

```react
import React from 'react'

// 处理并获取当前屏幕宽度
export class WindowWidth extends React.Component {
  constructor() {
    super()
    this.state = { width: document.documentElement.clientWidth }
  }

  componentDidMount() {
    window.addEventListener('resize', ({ target }) => this.setState({ width: document.documentElement.clientWidth }))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ({ target }) => this.setState({ width: document.documentElement.clientWidth }))
  }

  render() {
    return this.props.children(this.state.width)
  }
}

// 一个设置可显示组件的最小宽度的组件
export const MinWidth = ({ children }) => children(600)

// 显示组件的组件
export const Content = ({ width, minWidth, children }) => {
  return width > minWidth ? children : null
}
```

使用如下:

```react
<WindowWidth>
  {width => (
    <MinWidth>
      {minWidth => (
        <Content width={width} minWidth={minWidth}>
          <div>min-width requirement met!</div>
        </Content>
      )}
    </MinWidth>
  )}
</WindowWidth>
```

可以看出，我们使用了 `render prop` 来进行合理的组件化和复用，最外层的组件 `WindowWidth` 用于实时获取当前屏幕宽度，中间的组件 `MinWidth` 用于设置可显示组件的最小宽度，最内层的组件 `Content` 用于显示内容，要是加上 `Content` 的显示内容组件，光这里就需要四层组合了，这样就显得异常复杂，且难以理解。

所以为了简化这种组件化的复杂程度，`React` 的设计者们推出了 `Hook`，让我们看一下如果使用 `Hook` 将会是什么效果。

```react
import React, { useState, useEffect } from 'react'

const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', ({ target }) => setWidth(document.documentElement.clientWidth))

    return () => {
      window.removeEventListener('resize', ({ target }) => setWidth(document.documentElement.clientWidth))
    }
  }, [width])
  return [width]
}

export const ContentHook = ({ minWidth, children }) => {
  const [width] = useWidth()
  return width > minWidth ? children : null
}

export const MinWidthHook = ({ children }) => children(600)
```

使用方式：

```react
<MinWidthHook>
  {minWidth => (
    <ContentHook minWidth={minWidth}>
      <div>min-width requirement met!</div>
    </ContentHook>
  )}
</MinWidthHook>
```

在我们将外层用于实时获取当前屏幕宽度的组件 `WindowWidth` 改写成 `Hook` 之后，组件组合的层数直接少了一层，结果更加清晰，而且这个逻辑性的功能也被隐藏在了组件内部，无需开发者在外面使用。

在之前的版本中，函数式组件没有 `state`，所以为了构建更合理的组件，开发者们不得不借助 `class` 组件操作 `state` 的能力，所以我们会使用高阶组件和 `render prop` 来进行组件的重构，但是这样就会提高组件的复杂程度。而 `Hook` 在保证了函数式组件纯净性的同时，还赋予了函数式组件赋予了操作 `state` 的能力，所以就能使得组件结构在更扁平化的同时还保持了同样的优雅`。

> 可以看到自定义 `Hook` `useWidth` 其实就是一个函数。

### 2. 使 React 更靠近声明式和函数式

## `useState` 和 `useEffect`

让我们看看 `Hook` 中最基础的两个`API` `useState` 和 `useEffect` 的使用方法。

### `useState`

```react
import React, { useState } from 'react'

function Example () {
	const [name, setName] = useState('AAA')
	return (<div>
		<p>{ name }</p>
		<button onClick={() => setName('BBB')}>change name</button>
	</div>)
}
```

这就是一个最标准的的 `useState` 的使用，`useState` 函数会返回一个数组，其中第一个元素是 `state`，第二个元素是改变当前 state 的方法，比如上面这个例子中的 `state` 就是 `name`，而 `setName` 就是用于改变 `name` 值的方法，相当于 `setState({name: value})`，当然 `setName` 方法是直接生成了一个新的值来替换了原来的值。同时该方法还接收一个初始值，用于在第一次渲染时候的给 `state` 赋值，而在此后，无论是内部 `state` 的变化还是 `prop` 的变化所引起的组件重渲染都不会再用到这个值了。下面这个例子进行了很好地说明。

```react
import React, { useState } from 'react'

function Example({ firstName }) {
  const [lastName, setLastName] = useState(firstName)
  console.log('lastName')
  return (
    <div>
      <p>
        {lastName} + {firstName}
      </p>
      <button onClick={() => setLastName('BBB')}>change lastName</button>
    </div>
  )
}

export default class ExampleWarp extends React.Component {
  state = {
    firstName: 'ExampleWarp',
    count: 0
  }

  changeFirstName = () => {
    this.setState(prevState => ({
      count: prevState.count++,
      firstName: prevState.firstName + prevState.count
    }))
  }

  render() {
    const { firstName } = this.state
    return (
      <div>
        <Example firstName={firstName} />
        <button onClick={this.changeFirstName}>change firstName</button>
      </div>
    )
  }
}
```

值得注意的是，这个名为 `lastName` 的 `state`，在组件每次调用的时候都是一个常量，即每次重渲染的时候都是重新声明并赋值的，赋的就是当前调用时候的`state`的值，之所以在每次渲染的结果会变，是因为每次渲染所使用的都是不同的值 详见 https://overreacted.io/zh-hans/react-as-a-ui-runtime/

```react
// During first render
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}

// After a click, our function is called again
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}

// After another click, our function is called again
function Counter() {
  const count = 2; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}
```

### `useEffect`

#### 基本使用

`useEffect` 顾名思义就是用于处理副作用的。在 `React Hook` 中，我们可以把所有具有副作用的操作都放在 `useEffect` 中执行，比如操作`DOM`，网络请求等。

```react
function Example() {
	const [name, setName] = useState(null)
  useEffect() {
		fetch("http://xxx")
      .then(response => response.json())
      .then(data => setName(data.name))
  }
  ...
}
```

如果该异步操作需要在组件`unmount`时候被清除的，比如 `setTimeout`、`addEventListener` 等操作，我们需要在 `useEffect` 函数中手动返回清除操作函数。

```react
function Example() {
	...
	useEffect() {
		const timeid = setTimeout(()=> console.log("test useEffect"), 1000)
		return () => clearTimeout(timeid);
	}
	...
}
```

#### 什么时候调用 `useEffect`

在每次渲染函数的时候都会调用 `useEffect`，`useEffect` 和 `useState` 一样，在每次渲染的时候必须按次序地调用所有的 `useEffect` 和 `useState`。（具体原因见 [解释: 为什么每次更新的时候都要运行 Effect](https://zh-hans.reactjs.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update)）

#### 什么时候执行 `useEffert` 中的内容

在每次调用 `useEffert` 的时候，事实上组件只会记录当前的 `effert` 函数，然后**等到 UI 渲染完成**（在界面上可见）后，**再去调用清除函数**（清理上一次的 `effert`），然后**再执行本次的`effert`函数**。

#### 什么时候调用清除函数

1. 组件被卸载的时候；
2. 当 effert 函数需要被再次执行的时候；

#### 跳过 `useEffect` 的 `effert` 函数的执行

我们已经知道在每次更新的时候调用 `useEffect`，而且每次更新的时候都必须要调用 `useEffect`。所以下面将 `useEffect` 放在条件语句中以跳过 `useEffect` 的方式必然是会出问题的：

```react
function Example(props) {
	...
	if (props.render) {
		useEffect(() => {})
	}
	...
}
```

其实 `useEffect` 还有第二个参数，就是用于控制重渲染/更新的时候是否调用 `useEffect` 函数内的内容（**注意，`useEffect` 是必然被调用的，只是跳过了其内容部分的执行**）。第二个参数允许我们传入一个数组，每一个元素都能控制 `useEffect` 是否需要执行。

```react
function Example(props) {
   const [count, setCount] = useState(0)
	useEffect(() => {
  		document.title = `You clicked ${count} times`;
	}, [count]); // 仅在 count 更改时更新
	...
}
```

在这段代码中，只有当 `count` 的值改变了的时候，才会执行 `useEffect` 内部的代码。这段代码如果用 `class` 组件来写的话，相当于：

```react
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    if (prevState.count !== this.state.count) {
    	document.title = `You clicked ${this.state.count} times`;
  	 }
  }

  render() {
    ...
  }
}
```

又比如，我们希望某一操作仅在 `componentDidMount` 的时候执行一次，之后不再执行，我们只需要在第二个参数位置传入一个空数组即可：

```react
function Example(props) {
   const [count, setCount] = useState(0)
	useEffect(() => {
  		document.title = `You clicked ${count} times`;
	}, []); // 仅在 count 更改时更新
	...
}
```

它相当于：

```react
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    ...
  }
}
```

## hook 原理

参见：[React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)，

`useState` 函数创建的 `{state, setState}` 这两个返回值，分别存在于两个数组中，如下面的例子，当一个函数组件中存在多个 `useState` 的时候，那么这些 `state` 和 `setState`，也是依次存储的。

```react
function RenderFunctionComponent(props) {
  const [firstName, setFirstName] = useState("Rudi");
  const [lastName, setLastName] = useState("Yardley");

  return (
    <Button onClick={() => setFirstName("Fred")}>Fred</Button>
  );
}
```

其 `state` 对应的存储如下图：

![state 的存储方式](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/WeChat66e4e203459883bcd6d586466f06ce9f.png)

正如我们所看到了，`React` 将一个函数式组件里的 `useState` 结果依次存在，所以我们不能随意的在某一个重渲染中省略任意一个 `useState` 的执行，也就是说像如下写法都是会出错的。

```react
let firstRender = true;

function RenderFunctionComponent() {
  let initName;

  if(firstRender){
    [initName] = useState("Rudi");
    firstRender = false;
  }
  const [firstName, setFirstName] = useState(initName);
  const [lastName, setLastName] = useState("Yardley");

  return (
    <Button onClick={() => setFirstName("Fred")}>Fred</Button>
  );
}
```

虽然你把这个`firstName`对应的 `useState` 给过滤了，但是事实上 `react` 并不知道，在它的算法中，它仅仅是按照顺序去对应每次组件重渲染时候的 `useState` 的返回值。所以如果 `firstRender === false` ，那么该次渲染就会出错，`React` 会把本应属于 `initName` 的值赋给 `firstName`，把本应属于 `firstName` 的值赋给 `lastName`。

第一次渲染，即当 `firstRender === ture` 的时候，其对应效果图如下：

![1C4IA_Y7v6eoptZTBspRszQ](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/1C4IA_Y7v6eoptZTBspRszQ.png)

第二次渲染，即当 `firstRender === false` 的时候，其对应效果图如下：

![1aK7jIm6oOeHJqgWnNXt8Ig](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/1aK7jIm6oOeHJqgWnNXt8Ig.png)

> 图来自 [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

## 其他 API

### useCallback

useCallback 实际上就是给函数添加了一层依赖检查，使之在确实改变了之后才进行更新。看例子：

```react
import React, {useState, uesCallback} from 'react'

function Example() {
	const [query, setQuery] = useState('react')
	const getFetchUrl = (query) => {
		fetch('http://xxx', query)
	}

	useEffect(()=> {
		getFetchUrl(query)
	}, [getFetchUrl, query])
  ...
}
```

在这个例子中，我们将请求函数从 useEffect 中提取出来，我们希望的是，只有当 query 改变之后，useEffect 中的`getFetchUrl` 函数才会重新执行。而事实上，这个 `getFetchUrl` 函数在每次函数重渲染的时候都会执行，即这个 useEffect 里的内容都会被调用。你可能会疑问为什么会有这样的操作：_getFetchUrl 函数不是每次都一样嘛，如果 query 没有变的话，那么 useEffect 的依赖不是没有发生改变，那么为什么 useEffect 里的内容每次重渲染都会被调用？_

之所以会有这样的问题，就是因为在事实上每次组件重渲染的时候，getFetchUrl 都发生了变化。在每次组件重渲染的时候，函数都重新执行了一遍，这也就意味着 getFetchUrl 这个函数被重新声明赋值了，其内存地址已经发生了变化，只不过在重渲染前后，我们给这两个不同的内存地址设置了相同的内容而已。

所以想要达到正确的目的，我们可以把 fetch 请求放到 useEffect 中就可以了，这样就保证了每次只依赖于 query 这一个变量。

```react
import React, {useState, uesCallback} from 'react'

function Example() {
	const [query, setQuery] = useState('react')
	useEffect(()=> {
		fetch('http://xxx', query)
	}, [query])
  ...
}
```

但是，如果说一定要将请求提取出来，那么我们可以借助 useCallback 来达到目的。useCallback 为我们的函数加了一层 query 的检查，只要 query 不变，那么 getFetchUrl 这个函数就不变，所以 useEffect 里的内容也不会被执行（注意，useEffect 本身还是调用了的）。

```react
import React, {useState, uesCallback} from 'react'

function Example() {
	const [query, setQuery] = useState('react')
	const getFetchUrl = useCallback(() => {
		fetch('http://xxx', query)
	}, [query])

	useEffect(()=> {
		getFetchUrl()
	}, [getFetchUrl])
  ...
}
```

### useRef

在典型的 `React` 应用中，我们不能直接操作`DOM`元素，同样的，父组件也不能直接操作子组件，只能通过`props`来重新渲染它。如果遇到非要操作 DOM 元素或是子组件的方法的时候，你就需要 `ref` 了，它指向了我们所需要操作的 DOM 元素或是组件的实例。

> **不能在函数组件上使用 ref 属性，因为函数组件没有实例**

而在 Hook 中，useRef 除了能指向 DOM 元素或组件 的实例之外，还能指向任意一个数据。如下实例：

```react
import React, {uesRef} from 'react'

function Example() {
  const ref = useRef(null)

  const changeValue = (e) => {
		ref.current = e.target.value
  }
  ...
}
```

通常你并不需要这样的操作，但是**如果你需要获取不属于当前组件的 `props` 或 `state` 的时候**，那么你就需要 `useRef` 了。

实际上，`const ref = useRef(null)` 所返回的只是一个“普通”的 JS 对象，只不过它的值不会随着你的函数式组件重新渲染而变化，即每次渲染的时候 `useRef` 都会返回同一个值。同样的，`ref.current` 的改变也不会引起函数的重新渲染，就好像这是一个存在于函数之外的全局变量一样。

> 事实上，`ref.current` 确实存在于该函数之外。如同 `const { state, setState } = useState(initState);` 一样。

## 必看资料

- [一篇看懂 React Hooks](https://zhuanlan.zhihu.com/p/50597236)
- [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [使用 React Hooks 声明 setInterval](https://overreacted.io/zh-hans/making-setinterval-declarative-with-react-hooks/) ：精妙绝伦。
- [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)，译文：[React 函数组件和类组件的差异](https://zhuanlan.zhihu.com/p/62767474)
- [useMemo 与 useCallback 使用指南](https://zhuanlan.zhihu.com/p/66166173)
