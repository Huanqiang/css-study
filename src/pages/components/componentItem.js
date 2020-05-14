import React from 'react'
import { Link } from 'react-router-dom'

export default ({ url, title, Component }) => (
  <div className="component-biref-item">
    <div className="component-biref-item-animation">
      <Component></Component>
    </div>

    <Link to={`${url}`}>
      <div className="component-biref-item-details">查看详情</div>
    </Link>
  </div>
)
