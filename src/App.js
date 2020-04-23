import React from 'react'
import './App.css'

import Sider from './components/sider'
import Main from './components/main'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="slider">
          <Sider></Sider>
        </div>
        <div className="main">
          <Main></Main>
        </div>
      </Router>
    </div>
  )
}

export default App
