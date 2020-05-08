import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { transformToString } from '../../components/markdown'

export default ({ url, img, title, content }) => {
  const [blog, setBlog] = useState('')
  useEffect(() => {
    // fetch(content)
    //   .then(res => res.text())
    //   .then(text => setBlog(text))
    setBlog(transformToString(content))
  }, [content])

  return (
    <Link to={`${url}/${title}`}>
      <div className="blog-item">
        <div className="blog-item-image">
          <img src={img} alt={title}></img>
        </div>
        <div className="blog-item-brief">
          <div className="title">{title}</div>
          <div className="content">{blog}</div>
        </div>
      </div>
    </Link>
  )
}
