import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './index.css'

import routers from '../../router'

/**
 * 获取菜单显示状态
 * @param {*} length
 * @param {*} i
 */
const getMenuStatus = (length, i) =>
  Array(length)
    .fill(false)
    .map((item, index) => index === i)

/**
 * 菜单项组件
 * @param {*} param0
 */
const RouterItem = ({ title, path, isActive, onChange }) => (
  <li
    className={isActive ? 'menu-item active' : 'menu-item'}
    onClick={onChange}>
    {/* <div className='background'></div> */}
    <Link to={path}>{title}</Link>
  </li>
)

export default withRouter(({ location }) => {
  const [isActives, setIsActives] = useState(
    getMenuStatus(
      routers.length,
      routers.findIndex((router) => router.path === location.pathname)
    )
  )

  // const isActives =
  const changeActives = (i) => {
    console.log(432432, i)
    setIsActives(getMenuStatus(routers.length, i))
  }

  return (
    <ul className="menu">
      {routers.map((router, index, array) => (
        <RouterItem
          key={router.title}
          title={router.title}
          path={router.path}
          isActive={isActives[index]}
          onChange={() => changeActives(index)}></RouterItem>
      ))}
    </ul>
  )
})