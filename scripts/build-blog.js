const glob = require('glob')
const Marked = require('marked')
const hljs = require('highlight.js')
const path = require('path')
const fs = require('fs-extra')

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

glob('src/markdown/*/*.md', {}, function (err, files) {
  if (err) {
    console.log(err)
    return
  }
  console.log('files', files)
  Promise.all(
    files.map(file => {
      return new Promise((resolve, reject) => {
        const htmlName = file.replace(path.extname(file), '.json')
        console.log()

        const markdown = fs.readFileSync(file, 'utf8')
        const html = Marked(markdown)

        fs.writeFileSync(htmlName, JSON.stringify({ content: html }), 'utf-8')
        // console.log(Marked(markdown))
      })
    })
  )
})
