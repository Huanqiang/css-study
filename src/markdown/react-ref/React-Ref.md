# `React Ref`

我们都知道函数组件是不能使用Ref，因为其没有实例。

```js
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

如果要在函数组件中使用 `ref`，你可以使用 [`forwardRef`](https://zh-hans.reactjs.org/docs/forwarding-refs.html)（可与 [`useImperativeHandle`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) 结合使用），或者可以将该组件转化为 class 组件。



## `forwardRef`

使用 `forwardRef`，函数组件的第二个参数即为 `ref`，用于获取传递给它的 `ref`，然后转发到它渲染的 DOM `button`，如下代码：

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

以下是对上述示例发生情况的逐步解释：

1. 我们通过调用 `React.createRef` 创建了一个 [React ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 并将其赋值给 `ref` 变量。
2. 我们通过指定 `ref` 为 JSX 属性，将其向下传递给 `<FancyButton ref={ref}>`。
3. React 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ...`，作为其第二个参数。
4. 我们向下转发该 `ref` 参数到 `<FancyButton ref={ref}>`，将其指定为 JSX 属性。
5. 当 ref 挂载完成，`ref.current` 将指向 `<button>` DOM 节点。



## `forwardRef` + `useImperativeHandle`

使用了 `forwardRef` 后，函数组件所做的其实仅仅是转发了父组件传递的 `ref`，这个 `ref` 并不是指向的组件本身。但是如果使用 `useImperativeHandle`，那就不一样了，ref 指向了一个新的对象，这个对象的属性可以任意设置。

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

// 使用
function Father() {
  const inputRef = useRef();
  
	const click = () => {
    inputRef.current.focus()
  }
  
  return (<div>
    <button onClick={click}></button>
    <FancyInput ref={inputRef} />
  </div>)
}
```

在本例中，子组件 FancyInput 为 Ref 绑定了一个对象，父组件可以通过 ref 获取到这个对象的值（父组件 `Father` 可以通过 `inputRef.current` 调用到新对象的`focus()` 方法），但是值得注意的，这个对象并不是函数组件 `FancyInput` 的实例，仅仅是一个新的对象，因为函数组件没有实例。



