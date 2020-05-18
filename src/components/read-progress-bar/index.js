import React from 'react'
import './index.scss'

export default ({ readProcess }) => (
  <div className="read-progress-bar">
    你已阅读 {readProcess}%
    <div className="progress-bar" style={{ transform: `translateX(-${100 - readProcess}%)` }}></div>
  </div>
)
