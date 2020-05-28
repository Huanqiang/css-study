import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from '../../../components/markdown'
import BlogMenu from './blogMenu'
import Comment from './comment'
import RecommendBlog from './recommendBlog'

import useScrollProcess from '../../../hooks/useScrollProcess'
import useHTMLTitles from '../../../hooks/useHTMLTitle'
import blogs from '../../../markdown'
import './index.scss'

const defaultLevels = ['h2', 'h3']

const getRecommendBlogs = (curBlog, allBlogs) => {
  const recommendBlogs = allBlogs.filter(blog =>
    curBlog.tags.reduce((prev, tag) => prev || blog.tags.includes(tag), false)
  )
  const recommendCategories = allBlogs.filter(blog => blog.category === curBlog.category)
  return [...new Set([...recommendBlogs, ...recommendCategories])].filter(blog => blog.title !== curBlog.title)
}

// console.log(blogs)

export default () => {
  let { title } = useParams()
  const [recommendBlogs, setRecommendBlogs] = useState([])
  const curBlog = blogs.find(blog => blog.path === title)
  const content = curBlog.content
  const titles = useHTMLTitles(content, defaultLevels)
  let scrollProcess = useScrollProcess()

  useEffect(() => {
    setRecommendBlogs(getRecommendBlogs(curBlog, blogs))
  }, [curBlog])

  return (
    <div className="blog-content-container">
      <div className="blog-content-main">
        <Markdown markdown={content}></Markdown>
        <Comment></Comment>
      </div>
      <div className="blog-content-slider">
        <div className="blog-content-slider-sticky">
          <BlogMenu titles={titles} readProcess={scrollProcess}></BlogMenu>
          <RecommendBlog blogs={recommendBlogs}></RecommendBlog>
        </div>
      </div>
    </div>
  )
}
