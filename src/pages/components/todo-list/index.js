import React from 'react'
import PageLayout from '../../../components/page-layout'
import Panel from '../../../components/panel'
import TodoList from '../../../components/todo-list'

export const Animation = () => <TodoList></TodoList>

export default () => (
  <PageLayout
    cssAnimation={() => <Animation></Animation>}
    explain={() => (
      <>
        <Panel
          title="自定义 checkbox"
          style={{ marginTop: '32px', height: '100%' }}
          children={() => (
            <div>
              原生的 checkbox 比较难看，我们可以使用 <code>opacity: 0</code> 或者
              <code>appearance: nont</code>
              将其隐藏掉，然后使用一个空元素或者自身的伪元素来代替。
            </div>
          )}></Panel>

        <Panel
          title="label"
          style={{ marginTop: '32px', height: '100%' }}
          children={() => (
            <div>
              <code>label</code>标签极大提升 checkbox 的用户体验，使得用户能够点击文字选中和取消选择框；
              label有两种使用方式
              <br />
              1. 给 input 设置一个 id，然后 label 中通过 for 属性来关联对应的 id；
              <br />
              2. 直接将 input 放在 label 标签中，免去 id 的设置；
            </div>
          )}></Panel>

        <Panel
          title="删除线"
          style={{ marginTop: '32px', height: '100%' }}
          children={() => (
            <div>虽然 css 自带删除线这个属性，但是这个不能自定义动画，所以本案例使用了伪元素来代替；</div>
          )}></Panel>

        <Panel
          title="transition-property"
          style={{ marginTop: '32px', height: '100%' }}
          children={() => (
            <div>
              在设置 transition
              属性的时候，最好不要使用all，用到什么设置什么，不然在多个属性发生变化时候会出现意想不到的情况，比如：在本例子中的
              <code>transition: transform;</code>，如果你设置成了 <code>transition: all;</code>，那么这个删除线动画的
              origin 就会不对。
            </div>
          )}></Panel>
      </>
    )}></PageLayout>
)
