import Avator from '../asset/img/avatar.JPG'
import Email from '../asset/img/email.png'
import Github from '../asset/img/github.png'
import Weibo from '../asset/img/wb.png'

export default {
  homebg: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200518200705.png',
  headerbg: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200518200704.jpg',
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
  },
  comment: {
    clientID: '68ff52908f51f0d25952',
    clientSecret: '74d6e0218ebc9c1f6ebd3659480abc1a03bae388',
    repo: 'blog-comment',
    owner: 'Huanqiang',
    admin: ['Huanqiang']
  }
}
