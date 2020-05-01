import React from 'react'

import './index.scss'

const SocialItem = ({ img, url }) => (
  <div
    className="social"
    onClick={() => {
      window.open(url)
    }}>
    <img src={img} alt="社交icon"></img>
  </div>
)

export default ({ img, name, intro, socials }) => (
  <div className="card">
    <div className="border">
      <div className="border-top"></div>
      <div className="border-left"></div>
      <div className="border-bottom"></div>
      <div className="border-right"></div>
    </div>
    <div className="card-body">
      <div className="avatar">
        <img src={img} alt="用户头像" />
      </div>
      <div className="nickname">{name}</div>
      <div className="intro">{intro}</div>
      <div className="social-types">
        {socials.map(social => (
          <SocialItem key={social.type} img={social.img} url={social.url}></SocialItem>
        ))}
      </div>
    </div>
  </div>
)
