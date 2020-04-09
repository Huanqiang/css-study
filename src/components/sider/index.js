import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

import routers from '../../router'

const RouterItem = ({ title, path, isActive, onChange }) => (
  <li className={isActive ? 'menu-item active' : 'menu-item'} onClick={onChange}>
    {/* <div className='background'></div> */}
    <Link to={path}>{title}</Link>
  </li>
)

export default () => {
  const [isActives, setIsActives] = useState(Array(routers.length).fill(false))

  // const isActives =
  const changeActives = (i) => {
    console.log(432432, i)
    setIsActives(
      Array(routers.length)
        .fill(false)
        .map((item, index) => index === i)
    )
  }

  return (
    <ul className='menu'>
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
}
