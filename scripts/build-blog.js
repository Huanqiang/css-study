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

function oneByOne(list = [], task = () => {}) {
  return list.reduce((prev, item) => {
    return prev.then(() => task(item))
  }, Promise.resolve())
}

glob(localAddress + '*/*.md', {}, function (err, files) {
  if (err) {
    console.log(err)
    return
  }

  // 将图片改为一张张串行上传的方式
  oneByOne(files, async file => {
    // console.log(`正在处理文件 ${file}`)
    let markdown = fs.readFileSync(file, 'utf8')
    const localImagePaths = getLocalImages(markdown)
    await oneByOne(localImagePaths, async imgPath => {
      console.log(`正在上传图片 ${imgPath}`)

      const imgName = path.basename(imgPath)
      const result = await uploadImage(imgName, path.dirname(file))
      if (result) {
        markdown = markdown.replace(imgPath, remoteAddress + imgName)
      }
    }).then(data => {
      if (localImagePaths.length !== 0) {
        fs.writeFileSync(file, markdown, 'utf-8')
      }

      const html = Marked(markdown)
      const htmlName = file.replace(path.extname(file), '.json')
      fs.writeFileSync(htmlName, JSON.stringify({ content: html }), 'utf-8')
    })
  })

  // Promise.all(
  //   files.map(file => {
  //     return new Promise(async (resolve, reject) => {
  //       console.log(`正在处理文件 ${file}`)

  //       let markdown = fs.readFileSync(file, 'utf8')
  //       const localImagePaths = getLocalImages(markdown)

  //       Promise.all(
  //         localImagePaths.map(imgPath => {
  //           return new Promise(async (resolve, reject) => {
  //             const imgName = path.basename(imgPath)
  //             const result = await uploadImage(imgName, path.dirname(file))
  //             if (result) {
  //               markdown = markdown.replace(imgPath, remoteAddress + imgName)
  //             }
  //             resolve()
  //           })
  //         })
  //       ).then(data => {
  //         if (localImagePaths.length !== 0) {
  //           fs.writeFileSync(file, markdown, 'utf-8')
  //         }

  //         const html = Marked(markdown)
  //         const htmlName = file.replace(path.extname(file), '.json')
  //         fs.writeFileSync(htmlName, JSON.stringify({ content: html }), 'utf-8')
  //       })
  //     })
  //   })
  // )
})

function curry(fn, ...args) {
  return args.length >= fn.length ? fn(...args) : (...params) => curry(fn, ...args, ...params)
}
