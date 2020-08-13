import React from 'react'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zhCN from 'antd/es/locale/zh_CN'

// import Home from './pages/home'
// import Components from './pages/component-home'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routers from './router'
import './App.css'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/blog" />
          </Route>
          {routers.map(router => (
            <Route exact={router.path === '/'} path={router.path} key={router.title}>
              <router.component />
            </Route>
          ))}
        </Switch>
      </Router>
    </ConfigProvider>
  )
}

export default App
