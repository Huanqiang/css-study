import Home from '../pages/home'
import Blog from '../pages/blog'
import About from '../pages/about'
// import Components from '../pages/component-home'
import Components from '../pages/css-components/index'
import { BookOutlined, PartitionOutlined, ExclamationCircleOutlined, HomeOutlined } from '@ant-design/icons'

export default [
  {
    path: '/',
    component: Home,
    Icon: HomeOutlined,
    title: '主页'
  },
  {
    path: '/blog',
    component: Blog,
    Icon: BookOutlined,
    title: '博客'
  },
  {
    path: '/components',
    component: Components,
    Icon: PartitionOutlined,
    title: '组件库'
  },
  {
    path: '/about',
    component: About,
    Icon: ExclamationCircleOutlined,
    title: '关于'
  }
]
