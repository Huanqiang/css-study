import React from 'react'
import GitalkComponent from 'gitalk/dist/gitalk-component'
import config from '../../../config/comment.json'
import 'gitalk/dist/gitalk.css'

export default () => (
  <GitalkComponent
    options={{
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      repo: config.repo,
      owner: config.owner,
      admin: config.admin,
      id: document.location.pathname, // Ensure uniqueness and length less than 50
      distractionFreeMode: false // Facebook-like distraction free mode
    }}></GitalkComponent>
)
