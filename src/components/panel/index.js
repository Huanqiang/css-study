import React, { useState } from 'react'
import './index.scss'

const defaultWidth = 400

export default ({ title, children, width }) => {
  const [isShowBody, setIsShowBody] = useState(true)

  const style = { width: width || defaultWidth }

  const toggleBody = () => {}

  return (
    <div className='panel' style={style}>
      <header className='title'>
        {title}
        <div className={isShowBody ? 'icon active' : 'icon'} onClick={() => setIsShowBody(!isShowBody)}></div>
      </header>
      {/* {isShowBody ? <section style={{display: }}>{children()}</section> : null} */}
      {/* <section style={{ display: isShowBody ? 'block' : 'none' }}>{children()}</section> */}
      <section className={isShowBody ? '' : 'hidden'}>{children()}</section>
    </div>
  )
}
