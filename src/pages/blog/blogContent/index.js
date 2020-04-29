import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from '../../../components/markdown'

import blogs from '../../../asset/markdown'
import './index.scss'

export default () => {
  const { title } = useParams()
  const MarkdownFile = blogs.find(blog => blog.title === title).content
  return (
    <div className="blog-content-container">
      <div className="blog-content-slider">目录</div>
      <div className="blog-content-main">
        <Markdown markdown={MarkdownFile}></Markdown>
      </div>
    </div>
  )
}
