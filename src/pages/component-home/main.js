import React from 'react'
import Home from './home'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import routers from '../../router/component-router'

export default () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <Home></Home>
      </Route>
      {routers.map(router => (
        <Route path={`${path}${router.path}`} key={router.title}>
          <router.component />
        </Route>
      ))}
    </Switch>
  )
}
