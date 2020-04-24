import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import './index.scss'

export default class DynamicList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.list.length === 0 ? [this.createItemData()] : props.list
    }
  }

  createItemData = () => {
    return {
      key: uuidv4(),
      ...this.props.createItem()
    }
  }

  add = key => {
    this.setState(
      prevState => {
        const index = prevState.list.findIndex(item => item.key === key)
        return {
          list: [...prevState.list.slice(0, index + 1), this.createItemData(), ...prevState.list.slice(index + 1)]
        }
      },
      () => {
        this.props.onChange(this.state.list)
      }
    )
  }

  remove = key => {
    this.setState(
      prevState => ({
        list: prevState.list.filter(item => item.key !== key)
      }),
      () => {
        this.props.onChange(this.state.list)
      }
    )
  }

  change = (key, itemK, itemV) => {
    this.setState(
      prevState => {
        const index = prevState.list.findIndex(item => item.key === key)
        return {
          list: [
            ...prevState.list.slice(0, index),
            { ...prevState.list[index], [itemK]: itemV },
            ...prevState.list.slice(index + 1)
          ]
        }
      },
      () => {
        this.props.onChange(this.state.list)
      }
    )
  }

  render() {
    const { Component } = this.props
    const { list } = this.state
    return (
      <div className="dynamic-list">
        {list.map(item => (
          <div key={item.key} className="dynamic-list-item">
            <Component {...item} onChange={(k, v) => this.change(item.key, k, v)}></Component>
            <div className="dynamic-list-item-operation">
              <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => this.add(item.key)} />
              <Button shape="circle" icon={<MinusOutlined />} onClick={() => this.remove(item.key)} />
            </div>
          </div>
        ))}
      </div>
    )
  }
}
