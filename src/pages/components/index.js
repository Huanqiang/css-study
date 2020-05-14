import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Item from './componentItem'
import Content from './content'

import './index.scss'
import config from '../../config'
import routers from '../../router/components'

export default () => {
  let { url, path } = useRouteMatch()

  return (
    <div className="component">
      <header style={{ backgroundImage: `url(${config.headerbg})` }}>
        <Header></Header>
      </header>
      <Switch>
        <Route exact path={path}>
          <div className="component-home">
            {routers.map((router, index) => (
              <Item url={`${url}/${router.path}`} Component={router.Aniamtion} key={router.title}></Item>
            ))}
          </div>
        </Route>
      </Switch>
      <Route path={`${path}/:title`}>
        <Content></Content>
      </Route>
      <Footer></Footer>
    </div>
  )
}
