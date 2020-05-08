import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown, { addLineNumber, getTitles as getMarkdownTitles } from '../../../components/markdown'
import BlogMenu from './blogMenu'
import blogs from '../../../markdown'
import './index.scss'

export default () => {
  let [markdown, setMarkdown] = useState('')
  let [titles, setTitles] = useState([])
  let { title } = useParams()

  useEffect(() => {
    // const getData = async () => {
    //   const link = blogs.find(blog => blog.title === title).content

    //   const res = await (await fetch(link)).text()
    //   const code = getMarkdownHtml(res)
    //   setTitles(getMarkdownTitles(code))
    //   setMarkdown(code)
    // }
    // getData()
    const content = blogs.find(blog => blog.title === title).content
    setMarkdown(addLineNumber(content))
    setTitles(getMarkdownTitles(content))
  }, [title])

  return (
    <div className="blog-content-container">
      <div className="blog-content-slider">
        <BlogMenu titles={titles}></BlogMenu>
      </div>
      <div className="blog-content-main">
        <Markdown markdown={markdown}></Markdown>
      </div>
    </div>
  )
}
