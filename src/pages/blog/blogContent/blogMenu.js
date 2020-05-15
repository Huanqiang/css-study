import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'

import './index.scss'

// const hs = ['h1', 'h2', 'h3', 'h4', 'h5']

const useActiveMenu = hs => {
  const [activeMenu, setActiveMenu] = useState('')

  useEffect(() => {
    let lastActiveMenu = null

    const func = () => {
      console.log('444')
      const titles = hs.reduce((prev, h) => {
        return [...prev, ...document.getElementsByTagName(h)]
      }, [])

      const active = titles
        .reduce((prev, title) => {
          return title.getBoundingClientRect().top < 30
            ? [
                ...prev,
                {
                  id: title.id,
                  top: title.getBoundingClientRect().top
                }
              ]
            : prev
        }, [])
        .sort((t1, t2) => t2.top - t1.top)[0]

      if (active && (!lastActiveMenu || lastActiveMenu !== active.id)) {
        setActiveMenu(active.id)
        lastActiveMenu = active.id
      }
    }

    document.addEventListener('scroll', func)

    return () => document.removeEventListener('scroll', func)
  }, [hs])

  return activeMenu
}

const MenuItem = ({ title, id, level, active }) => {
  let { url } = useRouteMatch()

  const gotoPosition = e => {
    e.stopPropagation()
    window.location = `${url}#${title.id}`
  }

  return (
    <div>
      <div
        className={`blog-content-menu-item ${active === id ? 'active' : ''}`}
        style={{ paddingLeft: `${16 * level}px` }}
        onClick={gotoPosition}>
        {title.label}
      </div>
      {level <= 1 &&
        title.children.map(child => (
          <MenuItem title={child} id={child.id} active={active} level={level + 1} key={child.id}></MenuItem>
        ))}
    </div>
  )
}

export default ({ titles = [] }) => {
  const activeMenu = useActiveMenu(['h2', 'h3'])
  console.log(activeMenu)

  return (
    <div className="blog-content-menu">
      <div className="blog-content-menu-title">目录</div>
      {titles.map(title => (
        <MenuItem title={title} id={title.id} active={activeMenu} level={1} key={title.id}></MenuItem>
      ))}
    </div>
  )
}
