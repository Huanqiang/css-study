import React from 'react'
import './index.scss'

let animation = null
export default () => {
  function gotoTop() {
    const move = () => {
      let top = document.body.scrollTop || document.documentElement.scrollTop
      if (top <= 10) {
        top = 0
        document.body.scrollTop = document.scrollingElement.scrollTop = 0
        cancelAnimationFrame(animation)
      } else {
        document.body.scrollTop = document.scrollingElement.scrollTop = top * (4 / 5)
        animation = requestAnimationFrame(move)
      }
    }
    animation = requestAnimationFrame(move)
  }
  return (
    <div className="to-top" onClick={gotoTop}>
      <div className="arrow"></div>
    </div>
  )
}
