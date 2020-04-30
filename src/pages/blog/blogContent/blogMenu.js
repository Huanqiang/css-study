import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import './index.scss'

const MenuItem = ({ title, level }) => {
  let { url } = useRouteMatch()

  return (
    <div className="blog-content-menu-item" style={{ marginLeft: `16px` }}>
      <a href={`${url}#${title.id}`}>
        <span>{title.label}</span>
        {level <= 1 &&
          title.children.map(child => <MenuItem title={child} level={level + 1} key={child.id}></MenuItem>)}
      </a>
    </div>
  )
}

export default ({ titles = [] }) => {
  return (
    <div className="blog-content-menu">
      {titles.map(title => (
        <MenuItem title={title} level={0} key={title.id}></MenuItem>
      ))}
    </div>
  )
}
