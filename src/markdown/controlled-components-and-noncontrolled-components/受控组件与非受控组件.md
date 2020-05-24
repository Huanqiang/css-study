# 受控组件与非受控组件

在设计React 组件的时候，一定要注意数据来源，确保每一个数据都只有一个数据源。比如一个 `state` 不能既受 `setState` 的改变，又受 `props` 的变化而变化（比如`componentWillReceiveProps` 或是 `getDerivedStateFromProps` 中）。

> 一旦遇到多数据来源的情况，请将其按照以下方案进行重新设计。



> `getDerivedStateFromProps` 的作用：
>
> 1. `state` 只受到 `props` 的影响；
> 2. 只有当 `state` 与 `prop` 不同时，才去修改 `state`；

## 受控组件

受控组件是指 state 完全受Prop控制的组件。通常，建议将组件设计成完全受控组件。

```react
const ControlComponent = (props) => {
	reutrn (<div>{ props.name }</div>)
}

//  或者
class ControlComponent extends React.Component {
	state = {
    name: 'xxx'
  }
	
	// 使用了 getDerivedStateFromProps 类更新的state，最好不要在组件中再使用
	// setState 来修改了，要保证数据来源的唯一性。
	staric getDerivedStateFromProps(nextProps, preState) {
    return {name: nextProps.name}
  }
}
```

> 这个组件就是一个完全受控组件，它没有自身的状态，完全随着props改变而改变。

## 非受控组件

非受控组价是指组件存在 state，且state仅保存在这个组件内部，受组件内部的 `setState` 改变，不受 `props` 影响。

```react
class NoncontrolComponent extends React.Component {
	state = {
    name: 'inside'
  }

	change = () => {
    this.setState({name: 'newName'})
  }

	render() {
    const { name } = this.state
    return (<button onClick={this.change}>{name}</button>)
  }
}
```

## 带 key 的组件

我们知道`key`是用来标识一个组件的。`React` 会根据 `key` 判断数组中的哪些元素改变了，哪些元素被新增删除了。如果数组中某个key消失了，React会认为这个元素被删除了，从而进行响应的操作。

所以根据这个特性，我们可以给一个**非受控组件**设置一个动态的 `key`。当需要重置（？应该是重新构建）这个非受控组件的时候，我们可以直接改变 `key` 值就好了。

> 这个key可以是有意义的，也可以是随机生成的。

## 用 prop 的 id 重置非受控组件

如果不给非受控组件设置key，但仍想重置/改变组件，我们可以通过在组件中设置一个额外的标识符来达到相同的目的。

```react
class NoncontrolComponent extends React.Component {
  state = {
    name: this.props.name,
    id: this.props.id
  }

	static getDerivedStateFromProps(props, state) {
    if (props.id !== state) {
      return {
        name: props.name,
        id: props.id
			}
		}
    return null // return null 表示不对 state 做改变
  }
}
```

## 使用实例方法重置非受控组件

此外，我们还可以在组件中创建一个重置`state`的的方法，然后让父组件通过 `ref` 来调用该方法以达到改变组件状态的目的。

```react
class NoncontrolComponent extends React.Component {
	state = {
    name： 'xxx'
  }

	reset = name => {
		this.setState({ name }) 
  }
  ....
}
// 父组件使用 this.refs.component.reset() 就可以改变组件状态了
```



> 参考：[你可能不需要使用派生 state](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)

