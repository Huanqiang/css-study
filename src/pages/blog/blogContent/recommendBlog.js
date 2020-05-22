import React from 'react'
import { Link } from 'react-router-dom'
import { TagFilled } from '@ant-design/icons'

export default ({ blogTitles = [] }) =>
  blogTitles && (
    <div className="blog-content-recommends">
      <div className="blog-content-recommends-title">推荐阅读 </div>
      {blogTitles.map(title => (
        <Link to={title} key={title}>
          <div className="blog-content-recommends-item">
            <TagFilled style={{ color: '#546C74', marginRight: '8px' }} /> 《{title}》
          </div>
        </Link>
      ))}
    </div>
  )
