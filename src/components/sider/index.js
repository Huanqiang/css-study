import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

import routers from '../../router'

const RouterItem = ({ title, path }) => (
  <li className='menu-item'>
    {/* <div className='background'></div> */}
    <Link to={path}>{title}</Link>
  </li>
)

export default () => {
  return (
    <ul className='menu'>
      {routers.map(router => (
        <RouterItem key={router.title} title={router.title} path={router.path}></RouterItem>
      ))}
    </ul>
  )
}
