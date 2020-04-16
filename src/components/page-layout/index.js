import React from 'react'

import './index.scss'

export default ({ cssAnimation, explain }) => (
  <div className="container">
    <div className="css-animation">{cssAnimation && cssAnimation()}</div>
    <section className="explain">{explain && explain()}</section>
  </div>
)
