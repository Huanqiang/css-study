import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import ReadProgressBar from '../../../components/read-progress-bar'
import useActiveMenu from '../../../hooks/useActiveMenu'

import './index.scss'

const MenuItem = ({ title, id, level, active }) => {
  let { url } = useRouteMatch()

  const gotoPosition = e => {
    e.stopPropagation()
    window.location = `${url}#${title.id}`
  }

  return (
    <div>
      <div className={`blog-content-menu-item level${level} ${active === id ? 'active' : ''}`} onClick={gotoPosition}>
        {title.label}
      </div>
      {level <= 1 &&
        title.children.map(child => (
          <MenuItem title={child} id={child.id} active={active} level={level + 1} key={child.id}></MenuItem>
        ))}
    </div>
  )
}

export default ({ titles = [], readProcess = 0 }) => {
  const activeMenu = useActiveMenu(['h2', 'h3'])

  return (
    <div className="blog-content-menu">
      <div className="blog-content-menu-title">目录</div>
      <ReadProgressBar readProcess={readProcess}></ReadProgressBar>
      <div className="blog-content-menu-body">
        {titles.map(title => (
          <MenuItem title={title} id={title.id} active={activeMenu} level={1} key={title.id}></MenuItem>
        ))}
      </div>
    </div>
  )
}
