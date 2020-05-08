const fs = require('fs-extra')
const path = require('path')

const routes = [
  'blog',
  'components',
  'about',
  'components/loading',
  'components/btn_shining',
  'components/todo_list',
  'components/profile-card',
  'components/dynamic-add-list'
]
const MARKDOWN_URL = './src/markdown/index.js'

const copyIndexHtml = (routes = []) => {
  routes.forEach(route => {
    fs.copySync(path.join('build', 'index.html'), path.join('build', route, 'index.html'))
  })
}

const getBlogRoutes = url => {
  // const blogsStr = fs
  //   .readFileSync(url, 'utf8')
  //   .split('export default ')[1]
  //   .replace(/[\n\[\]\{\}]/g, '')
  const blogsStr = fs.readFileSync(url, 'utf8').split('export default ')[1].replace(/[ \n]/g, '')
  console.log(blogsStr)
  return blogsStr
    .split(',')
    .map(item => item.trim())
    .filter(item => item.split(':')[0] === 'title')
    .map(item => item.split(':')[1].trim().replace(/'/g, ''))
    .map(item => 'blog/' + item)
}

// copyIndexHtml(routes)
// copyIndexHtml(getBlogRoutes(MARKDOWN_URL))
getBlogRoutes(MARKDOWN_URL)
