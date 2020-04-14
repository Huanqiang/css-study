import React, { useState } from 'react'
import './index.scss'

const defaultWidth = 400

export default ({ title, children, width, style }) => {
  const [isShowBody, setIsShowBody] = useState(true)

  const selfStyle = { width: width || defaultWidth, ...style }

  // const toggleBody = () => {}

  return (
    <div className="panel" style={selfStyle}>
      <header className="title">
        {title}
        <div className={isShowBody ? 'icon active' : 'icon'} onClick={() => setIsShowBody(!isShowBody)}></div>
      </header>
      {/* {isShowBody ? <section style={{display: }}>{children()}</section> : null} */}
      {/* <section style={{ display: isShowBody ? 'block' : 'none' }}>{children()}</section> */}
      <section className={isShowBody ? '' : 'hidden'}>{children()}</section>
    </div>
  )
}
