import React from 'react'
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
  const recommendTags = allBlogs
    .filter(blog => curBlog.tags.reduce((prev, tag) => prev || blog.tags.includes(tag), false))
    .map(blog => blog.title)
  console.log('recommendTags', recommendTags)
  const recommendCategories = allBlogs.filter(blog => blog.category === curBlog.category).map(blog => blog.title)
  return [...new Set([...recommendTags, ...recommendCategories])].filter(title => title !== curBlog.title)
}

console.log(blogs)

export default () => {
  let { title } = useParams()
  const curBlog = blogs.find(blog => blog.title === title)
  const content = curBlog.content
  const recommendBlogTitles = getRecommendBlogs(curBlog, blogs)
  const titles = useHTMLTitles(content, defaultLevels)
  let scrollProcess = useScrollProcess()

  return (
    <div className="blog-content-container">
      <div className="blog-content-main">
        <Markdown markdown={content}></Markdown>
        <Comment></Comment>
      </div>
      <div className="blog-content-slider">
        <BlogMenu titles={titles} readProcess={scrollProcess}></BlogMenu>
        <RecommendBlog blogTitles={recommendBlogTitles}></RecommendBlog>
      </div>
    </div>
  )
}
