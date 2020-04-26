import React from 'react'
import Sider from './sider'
import Main from './main'

import './index.scss'
import routers from '../../router/component-router'

import { BrowserRouter as Router } from 'react-router-dom'

export default () => (
  <div className="Blog">
    <Router>
      <div className="slider">
        <Sider routers={routers}></Sider>
      </div>
      <div className="main">
        <Main></Main>
      </div>
    </Router>
  </div>
)
