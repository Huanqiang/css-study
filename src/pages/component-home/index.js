import React from 'react'
import Sider from './sider'
import Main from './main'
import Header from '../../components/header'

import './index.scss'
import routers from '../../router/components'

export default () => (
  <div>
    <Header></Header>
    <div className="Blog">
      <div className="slider">
        <Sider routers={routers}></Sider>
      </div>
      <div className="main">
        <Main routers={routers}></Main>
      </div>
    </div>
  </div>
)
