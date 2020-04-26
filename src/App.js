import React from 'react'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zhCN from 'antd/es/locale/zh_CN'

import Home from './pages/home'
import Components from './pages/component-home'
import './App.css'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Home></Home>
    </ConfigProvider>
  )
}

export default App
