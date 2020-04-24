import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

import Sider from './components/sider'
import Main from './components/main'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
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
    </ConfigProvider>
  )
}

export default App
