import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import BlogContent from './blogContent'
import BlogBriefItem from './blogBriefItem'
import GoToTop from '../../components/to-top'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Profile from '../../components/profile-card'

import blogs from '../../markdown'
import './index.scss'

import config from '../../config'

export default () => {
  let { url, path } = useRouteMatch()

  return (
    <div className="blog">
      <header style={{ backgroundImage: `url(${config.headerbg})` }}>
        <Header></Header>
      </header>
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
              {blogs.map(blog => (
                <BlogBriefItem {...blog} url={url} key={blog.title}></BlogBriefItem>
              ))}
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
