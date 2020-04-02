import Home from '../pages/home'
import About from '../pages/about'
import Loading from '../pages/loading'

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
  }
]
