import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import './index.scss'

const MenuItem = ({ title, level }) => {
  let { url } = useRouteMatch()

  const gotoPosition = e => {
    e.stopPropagation()
    window.location = `${url}#${title.id}`
  }

  return (
    <div className="blog-content-menu-item" style={{ marginLeft: `16px` }} onClick={gotoPosition}>
      <span>{title.label}</span>
      {level <= 1 && title.children.map(child => <MenuItem title={child} level={level + 1} key={child.id}></MenuItem>)}
    </div>
  )
}

export default ({ titles = [] }) => {
  return (
    <div className="blog-content-menu">
      <div className="blog-content-menu-title">目录</div>
      {titles.map(title => (
        <MenuItem title={title} level={0} key={title.id}></MenuItem>
      ))}
    </div>
  )
}
