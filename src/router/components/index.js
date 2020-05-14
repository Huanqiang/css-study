import LoadingPage, { Animation as Loading } from '../../pages/components/loading'
import BtnHoverShininggPage, { Animation as BtnHoverShining } from '../../pages/components/btn-hover-shining'
import TodoListgPage, { Animation as TodoList } from '../../pages/components/todo-list'
import ProfileCardgPage, { Animation as ProfileCard } from '../../pages/components/profile-card'
import DynamicAddListgPage, { Animation as DynamicAddList } from '../../pages/components/dynamic-add-list'

export default [
  {
    path: 'loading',
    Page: LoadingPage,
    Aniamtion: Loading,
    title: 'Loading'
  },
  {
    path: 'btn_shining',
    Page: BtnHoverShininggPage,
    Aniamtion: BtnHoverShining,
    title: '按钮悬浮闪光'
  },
  {
    path: 'todo_list',
    Page: TodoListgPage,
    Aniamtion: TodoList,
    title: 'Todo控件'
  },
  {
    path: 'profile-card',
    Page: ProfileCardgPage,
    Aniamtion: ProfileCard,
    title: 'ProfileCard'
  },
  {
    path: 'dynamic-add-list',
    Page: DynamicAddListgPage,
    Aniamtion: DynamicAddList,
    title: 'DynamicAddList'
  }
]
