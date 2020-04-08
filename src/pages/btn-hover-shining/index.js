import React from 'react'
import Panel from '../../components/panel'
import './index.scss'

export default () => (
  <div>
    <button className='btn'>hover me</button>
    <Panel title='linear-gradient 函数' children={() => <div>linear-gradient 函数是xxx</div>}></Panel>
  </div>
)
