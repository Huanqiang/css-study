import Avator from '../asset/img/avatar.JPG'
import Email from '../asset/img/email.png'
import Github from '../asset/img/github.png'
import Weibo from '../asset/img/wb.png'

export default {
  homebg: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed@V1.001/img/20200507192449.png',
  headerbg: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed@V1.001/img/20200507193003.jpg',
  user: {
    blogName: `Huanqiang's blog`,
    nickName: `Huanqiang`,
    intro: '好好学习，天天向上',
    avator: Avator,
    socials: [
      { type: 'github', img: Github, url: 'https://github.com/Huanqiang' },
      { type: 'email', img: Email, url: 'mailto:huanqiang@124.com' },
      { type: 'weibo', img: Weibo, url: 'https://weibo.com/u/6076963078/home' }
    ]
  }
}
