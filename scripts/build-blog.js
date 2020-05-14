const glob = require('glob')
const Marked = require('marked')
const hljs = require('highlight.js')
const path = require('path')
const fs = require('fs-extra')
const fetch = require('node-fetch')

const config = require('../github.json')

Marked.setOptions({
  renderer: new Marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  },
  langPrefix: 'hljs '
})

const markdownImageRex = /!\[([^\[\]]*)\]\(([^\[\]]*\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga))\)/g
const ImageRex = /[^\[\]\(\)]*\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)/
const httpRex = /(http|https):/
const localAddress = 'src/markdown/'
const remoteAddress = `https://cdn.jsdelivr.net/gh/${config.githubName}/${config.repo}/blog/`
const imgBedUrl = `https://api.github.com/repos/${config.githubName}/${config.repo}/contents/blog/`
const githubToken = config.token

const uploadImage = async (name, url) => {
  const image = fs.readFileSync(url + '/' + name)

  try {
    const response = await fetch(imgBedUrl + name, {
      method: 'PUT',
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3.raw'
      },
      body: JSON.stringify({
        message: 'upload ' + name,
        committer: {
          name: 'Huanqiang',
          email: 'huanqiang124@163.com'
        },
        content: image.toString('base64')
      })
    })
    if (!response.ok) {
      console.log(response)
    }
    return response.ok
  } catch (error) {
    console.log(error)
    return false
  }
}

const getLocalImages = content => {
  return (content.match(markdownImageRex) || []) // 根据 markdown 的 image 格式来获取 image（含格式）
    .map(img => img.match(ImageRex)[0]) // 去除 markdown 的 image 格式
    .filter(img => !httpRex.test(img)) // 过滤非本地图片
}

glob(localAddress + '*/*.md', {}, function (err, files) {
  if (err) {
    console.log(err)
    return
  }

  Promise.all(
    files.map(file => {
      return new Promise(async (resolve, reject) => {
        console.log(`正在处理文件 ${file}`)

        let markdown = fs.readFileSync(file, 'utf8')
        const imagePaths = getLocalImages(markdown)

        Promise.all(
          imagePaths.map(imgPath => {
            return new Promise(async (resolve, reject) => {
              const imgName = path.basename(imgPath)
              // fs.copySync(
              //   path.join(path.dirname(file), imgName),
              //   path.join('build/blog', path.dirname(file).replace(localAddress, ''), imgName)
              // )
              const result = await uploadImage(imgName, path.dirname(file))
              if (result) {
                markdown = markdown.replace(imgPath, remoteAddress + imgName)
              }
              resolve()
            })
          })
        ).then(data => {
          if (imagePaths.length !== 0) {
            fs.writeFileSync(file, markdown, 'utf-8')
          }

          const html = Marked(markdown)
          const htmlName = file.replace(path.extname(file), '.json')
          fs.writeFileSync(htmlName, JSON.stringify({ content: html }), 'utf-8')
        })
      })
    })
  )
})
