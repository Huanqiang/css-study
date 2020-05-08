import React from 'react'
import './index.scss'
import { BookOutlined, PartitionOutlined, ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
// import { withRouter } from 'react-router'

import config from '../../config'

const MenuItem = ({ className, Icon, title, path }) => {
  return (
    <Link to={path}>
      <div className={'home-menu-item ' + className}>
        <div className="diamond"></div>
        <div className="home-menu-content">
          <Icon style={{ fontSize: '50px', margin: '8px', color: '#656783' }} />
          <div className="title"> {title} </div>
        </div>
      </div>
    </Link>
  )
}

// export default () => 'HOME'
export default () => (
  <div className="home" style={{ backgroundImage: `url(${config.homebg})` }}>
    <div className="home-menu">
      <MenuItem className="home-menu-top" Icon={BookOutlined} title="博客" path="/blog"></MenuItem>
      <MenuItem className="home-menu-left" Icon={PartitionOutlined} title="组件" path="/components"></MenuItem>
      <MenuItem className="home-menu-right" Icon={ExclamationCircleOutlined} title="关于" path="/about"></MenuItem>
      <MenuItem className="home-menu-bottom" Icon={QuestionCircleOutlined} title="暂无" path="/"></MenuItem>
    </div>
  </div>
)
