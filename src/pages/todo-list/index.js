import React from 'react'

import './index.scss'

const Item = ({ label, onToggle }) => (
  <label onClick={() => onToggle(label)} className="todo-item">
    <input type="checkbox"></input>
    <span className="check"></span>
    <span className="label">{label}</span>
  </label>
)

export default () => (
  <fieldset className="todo">
    <legend className="todo-title">这是一个Todo-List</legend>
    <Item label="fewrtewre" onToggle={(label) => console.log(label)}></Item>
    <Item label="764767654" onToggle={(label) => console.log(label)}></Item>
  </fieldset>
)
