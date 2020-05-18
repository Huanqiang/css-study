import React from 'react'
import { Input } from 'antd'
import DynamicList from '../../../components/dynamic-add-list'

const Item = ({ name, pwd, onChange }) => {
  return (
    <div>
      <Input
        value={name}
        onChange={e => onChange('name', e.target.value)}
        addonBefore="用户名"
        placeholder="请输入用户名"
        style={{ width: 300, marginBottom: 8 }}
      />
      <br />
      <Input.Password
        value={pwd}
        onChange={e => onChange('pwd', e.target.value)}
        addonBefore="密码"
        placeholder="请输入密码"
        style={{ width: 300 }}
      />
    </div>
  )
}

export default class extends React.Component {
  state = {
    list: []
  }

  createData = () => ({
    name: '',
    pwd: ''
  })

  change = list => {
    this.setState({ list })
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <DynamicList Component={Item} list={list} createItem={this.createData} onChange={this.change}></DynamicList>
      </div>
    )
  }
}
