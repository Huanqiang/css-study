import React from 'react'
import { Link } from 'react-router-dom'

import routers from '../../router'
import './index.scss'

/**
 * 菜单项组件
 * @param {*} param0
 */
const RouterItem = ({ title, path, Icon, style }) => (
  <div className="header-menu-item" style={style}>
    <Icon style={{ margin: '4px' }} />
    <Link to={path} style={style}>
      {title}
    </Link>
  </div>
)

export default () => {
  return (
    <div className="header">
      <div className="header-menu">
        {routers.map(router => (
          <RouterItem
            style={{ color: '#43515C' }}
            key={router.title}
            title={router.title}
            Icon={router.Icon}
            path={`${router.path}`}></RouterItem>
        ))}
      </div>

      <Link className="name" to='/blog'>Huanqiang's Blog</Link>
    </div>
  )
}
