import React from 'react'
import { Link } from 'react-router-dom'
import { TagFilled } from '@ant-design/icons'

export default ({ blogs = [] }) =>
  blogs.length !== 0 && (
    <div className="blog-content-recommends">
      <div className="blog-content-recommends-title">推荐阅读 </div>
      {blogs.map(blog => (
        <Link to={`/blog/${encodeURIComponent(blog.path)}`} key={blog.path}>
          <div className="blog-content-recommends-item">
            <TagFilled style={{ color: '#546C74', marginRight: '8px' }} />
            {blog.title}
            {/* <span className="blog-content-recommends-item-title">{blog.title}</span> */}
          </div>
        </Link>
      ))}
    </div>
  )
