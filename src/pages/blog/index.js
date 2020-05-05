import React from 'react'
import Header from '../../components/header'
import Profile from '../../components/profile-card'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import BlogContent from './blogContent'
import BlogBriefItem from './blogBriefItem'
import blogs from '../../asset/markdown'
import './index.scss'

import profile from '../../config/profile'

export default () => {
  let { url, path } = useRouteMatch()

  return (
    <div className="blog">
      <header>
        <Header></Header>
      </header>
      <div className="blog-container">
        <Switch>
          <Route exact path={path}>
            <div className="blog-slider">
              <div className="profile">
                <Profile
                  img={profile.avator}
                  name={profile.nickName}
                  intro={profile.intro}
                  socials={profile.socials}></Profile>
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
    </div>
  )
}
