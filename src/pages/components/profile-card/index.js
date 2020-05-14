import React from 'react'
import PageLayout from '../../../components/page-layout'
// import Panel from '../../../components/panel'
import ProfileCard from '../../../components/profile-card'

import avator from '../../../asset/img/avatar.JPG'
import Email from '../../../asset/img/email.png'
import Github from '../../../asset/img/github.png'
import Weibo from '../../../asset/img/wb.png'

const defaultSocials = [
  { type: 'github', img: Github, url: 'https://github.com/Huanqiang' },
  { type: 'email', img: Email, url: 'mailto:huanqiang@124.com' },
  { type: 'weibo', img: Weibo, url: 'https://weibo.com/u/6076963078/home' }
]

export const Animation = ({ img = avator, name = 'huanqiang', intro, socials = defaultSocials }) => (
  <ProfileCard img={avator} name="huanqiang" socials={socials}></ProfileCard>
)

export default () => (
  <PageLayout
    cssAnimation={() => <Animation img={avator} name="huanqiang" socials={defaultSocials}></Animation>}
    explain={() => <></>}></PageLayout>
)
