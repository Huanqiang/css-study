import Home from '../pages/home'
import About from '../pages/about'
import Loading from '../pages/loading'
import BtnHoverShining from '../pages/btn-hover-shining'
import TodoList from '../pages/todo-list'
import ProfileCard from '../pages/profile-card'
import DynamicAddList from '../pages/dynamic-add-list'

export default [
  {
    path: '/',
    component: Home,
    title: 'Home'
  },
  {
    path: '/loading',
    component: Loading,
    title: 'Loading'
  },
  {
    path: '/btn_shining',
    component: BtnHoverShining,
    title: '按钮悬浮闪光'
  },
  {
    path: '/todo_list',
    component: TodoList,
    title: 'Todo控件'
  },
  {
    path: '/profile-card',
    component: ProfileCard,
    title: 'ProfileCard'
  },
  {
    path: '/about',
    component: About,
    title: 'About'
  },
  {
    path: '/dynamic-add-list',
    component: DynamicAddList,
    title: 'DynamicAddList'
  }
]
