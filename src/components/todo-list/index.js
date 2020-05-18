import React from 'react'
import './index.scss'

const Item = ({ label, onToggle }) => (
  <label onClick={() => onToggle(label)} className="todo-item">
    <input type="checkbox"></input>
    <span className="check"></span>
    <span className="label">{label}</span>
  </label>
)

export default ({ title, list = [], onToggle }) => (
  <fieldset className="todo">
    {title && <legend className="todo-title">{title}</legend>}
    {list.map(item => (
      <Item label={item.label} key={item.label} onToggle={label => onToggle(label)}></Item>
    ))}
  </fieldset>
)
