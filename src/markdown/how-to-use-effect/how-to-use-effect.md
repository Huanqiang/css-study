# 关于 useEffect 的使用场景

> 本文为 https://beta.reactjs.org/learn/you-might-not-need-an-effect#sending-a-post-request 读后总结

useEffect 是 react hooks 中用来处理程序副作用的。那么所有的副作用都要用 useEffect 来处理吗？显然不是的，有些副作用只需要在事件处理程序（event handler）中处理就好了。所以如果区分呢？

react 新版官网有一个很好定义：**Effects let you specify side effects that are caused by rendering itself, rather than by a particular event.** 即该副作用会影响到组件展示结果吗？如果是，那么就用 useEffect，如果不是，那就在事件处理程序（event handler）处理。

而要理解这段话也很简单，我们知道 react 的核心就是数据驱动，这句话的完整表示是页面（视图）的改变是由数据驱动的，即 view = f(state)，所以 useEffect 应该要用来处理对展示有影响的副作用。



这里有个例子可以帮忙理解下：

```react
function Form() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState({page})
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get('/api/list', { query });
      setList(data)
    }
 
    fetchData()
  }, [query]);  
  
  // 这里page改变了会影响到页面展示的数据，所以我们改变了 page，从而处理useEffect来获取新的数据，从而改变页面展示
  const handlePageChange = (page) => {
		setQuery({page})
  } 
  

  // 这里是
    function handleSubmit(e) {
    e.preventDefault();
    const { data } = await post('/api/item', { value: e.target.value });
    if (data) {
   		setQuery({page: 0})
    }
  }
  // ...
}
```



## 其他用法：

1. 如果可以在渲染期间计算某些内容，则不需要效果。

2. 要缓存昂贵的计算，请使用 useMemo 而不是 useEffect。

3. 要重置整个组件树的状态，请设置不同的 key 值。

4. 要重置特定位的状态以响应 prop 更改，请在渲染期间设置它。

   参考：https://beta.reactjs.org/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes

5. 由于显示组件而需要运行的代码应为 Effects。（即本文）

6. 如果需要更新多个组件的状态，最好在单个事件期间进行更新。

7. 每当尝试同步不同组件中的状态变量时，请考虑提升状态。

8. 您可以使用 Effects 获取数据，但您需要实现清理以避免竞争条件。

   参考：https://beta.reactjs.org/learn/you-might-not-need-an-effect#fetching-data

   使用 use effect 的 return

