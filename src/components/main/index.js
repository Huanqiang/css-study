import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routers from '../../router'

export default () => (
  // <div>
  <Switch>
    {routers.map(router => (
      <Route exact path={router.path} key={router.title}>
        <router.component />
      </Route>
    ))}
  </Switch>
  // </div>
)
