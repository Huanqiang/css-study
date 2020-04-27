import Loading from '../../pages/components/loading'
import BtnHoverShining from '../../pages/components/btn-hover-shining'
import TodoList from '../../pages/components/todo-list'
import ProfileCard from '../../pages/components/profile-card'
import DynamicAddList from '../../pages/components/dynamic-add-list'

export default [
  // {
  //   path: '/',
  //   component: Home,
  //   title: 'Home'
  // },
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
    path: '/dynamic-add-list',
    component: DynamicAddList,
    title: 'DynamicAddList'
  }
]
