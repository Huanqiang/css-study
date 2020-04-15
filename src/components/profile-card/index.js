import React from 'react'
import avator from '../../asset/img/avatar.JPG'
import Email from '../../asset/img/email.png'
import Github from '../../asset/img/github.png'
import Weibo from '../../asset/img/wb.png'

import './index.scss'

const SOCIAL_TYPE = {
  email: { img: Email, url: 'mailto:huanqiang@124.com' },
  github: { img: Github, url: 'https://github.com/Huanqiang' },
  weibo: { img: Weibo, url: 'https://weibo.com/u/6076963078/home' }
}

const socials = ['email', 'github', 'weibo']

const SocialItem = ({ img, url }) => (
  <div
    className="social"
    onClick={() => {
      window.open(url)
    }}>
    <img src={img} alt="社交icon"></img>
  </div>
)

const Card = ({ img, name, socials }) => (
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
      <div className="social-types">
        {socials.map(social => (
          <SocialItem key={social} img={SOCIAL_TYPE[social].img} url={SOCIAL_TYPE[social].url}></SocialItem>
        ))}
      </div>
    </div>
  </div>
)

export default () => <Card img={avator} name="huanqiang" socials={socials}></Card>
