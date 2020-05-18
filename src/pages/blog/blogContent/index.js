import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from '../../../components/markdown'
import BlogMenu from './blogMenu'
import Comment from './comment'

import useScrollProcess from '../../../hooks/useScrollProcess'
import useHTMLTitles from '../../../hooks/useHTMLTitle'
import blogs from '../../../markdown'
import './index.scss'

const defaultLevels = ['h2', 'h3']

export default () => {
  let { title } = useParams()
  const content = blogs.find(blog => blog.title === title).content
  const titles = useHTMLTitles(content, defaultLevels)
  let scrollProcess = useScrollProcess()

  return (
    <div className="blog-content-container">
      <div className="blog-content-slider">
        <BlogMenu titles={titles}></BlogMenu>
      </div>
      <div className="blog-content-main">
        <Markdown markdown={content}></Markdown>
        <Comment></Comment>
      </div>
    </div>
  )
}
