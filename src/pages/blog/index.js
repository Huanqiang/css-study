import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import BlogContent from './blogContent'
import BlogBriefItem from './blogBriefItem'
import GoToTop from '../../components/to-top'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Profile from '../../components/profile-card'
import Pagination from './pagination'

import initBlogs from '../../markdown'
import './index.scss'

import config from '../../config'
const defaultPageSize = 6
const blogCount = initBlogs.length

export default () => {
  const [blogs, setBlogs] = useState(initBlogs.slice(0, defaultPageSize))
  let { url, path } = useRouteMatch()

  const onChange = pageIndex => {
    setBlogs(initBlogs.slice((pageIndex - 1) * defaultPageSize, pageIndex * defaultPageSize))
  }

  return (
    <div className="blog">
      <Header img={config.headerbg}></Header>
      <div className="blog-container">
        <Switch>
          <Route exact path={path}>
            <div className="blog-slider">
              <div className="profile">
                <Profile
                  img={config.user.avator}
                  name={config.user.nickName}
                  intro={config.user.intro}
                  socials={config.user.socials}></Profile>
              </div>
            </div>
            <div className="blog-main">
              {blogs.map((blog, index) => (
                <BlogBriefItem
                  {...blog}
                  url={url.lastIndexOf('/') === 0 ? url.slice(-1) : url}
                  key={blog.title}
                  imagePosition={index % 2 === 0 ? 'left' : 'right'}></BlogBriefItem>
              ))}
              <Pagination total={blogCount} onChange={onChange} pageSize={defaultPageSize} />
            </div>
          </Route>
          <Route path={`${path}/:title`}>
            <BlogContent />
          </Route>
        </Switch>
      </div>
      <Footer></Footer>
      <GoToTop></GoToTop>
    </div>
  )
}
