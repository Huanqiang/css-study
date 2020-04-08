import Home from '../pages/home'
import About from '../pages/about'
import Loading from '../pages/loading'
import BtnHoverShining from '../pages/btn-hover-shining'

export default [
  {
    path: '/',
    component: Home,
    title: 'Home'
  },
  {
    path: '/about',
    component: About,
    title: 'About'
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
  }
]
