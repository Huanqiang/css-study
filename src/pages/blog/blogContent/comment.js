import React from 'react'
import md5 from 'blueimp-md5'
import GitalkComponent from 'gitalk/dist/gitalk-component'
import config from '../../../config'
import 'gitalk/dist/gitalk.css'

export default () => (
  <GitalkComponent
    options={{
      clientID: config.comment.clientID,
      clientSecret: config.comment.clientSecret,
      repo: config.comment.repo,
      owner: config.comment.owner,
      admin: config.comment.admin,
      id: md5(document.location.pathname), // Ensure uniqueness and length less than 50
      distractionFreeMode: false // Facebook-like distraction free mode
    }}></GitalkComponent>
)
