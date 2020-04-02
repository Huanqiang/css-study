import React from 'react'
import Sider from './components/sider'
import Main from './components/main'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routers from './router'

export default function App() {
  return (
    <Router>
      <div>
        <Sider></Sider>

        <Main></Main>

        {/* <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
        </Switch> */}
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

// function Users() {
//   return <h2>Users</h2>
// }
