import Home from '../pages/home'
import Blog from '../pages/blog-home'
import About from '../pages/about'
import Components from '../pages/component-home'

export default [
  {
    path: '/',
    component: Home,
    title: 'Home'
  },
  {
    path: '/blog',
    component: Blog,
    title: 'Blog'
  },
  {
    path: '/components',
    component: Components,
    title: '组件库'
  },
  {
    path: '/about',
    component: About,
    title: 'About'
  }
]
