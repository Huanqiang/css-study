const fileTreeSelectionPrompt = require('inquirer-fuzzy-path')
const modulePath = './src/markdown/index.js'

module.exports = plop => {
  plop.setPrompt('file-tree-selection', fileTreeSelectionPrompt)

  // Here we'll define our generators
  plop.setGenerator('module', {
    // Succintly describes what generator does.
    description: '新增博客',

    // Get inputs from the user.
    // That's Inquirer.js doing the job behind the hood.

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '博客中文名称: '
      },
      {
        type: 'file-tree-selection',
        name: 'path',
        rootPath: './src/markdown/',
        excludeFilter: nodePath => nodePath.indexOf('.md') === -1,
        message: '请选择新博客'
      },
      {
        type: 'input',
        name: 'img',
        message: '博客大图?'
      },
      {
        type: 'list',
        name: 'category',
        message: '请选择博客分类',
        default: 'CATEGORIES.js',
        choices: [
          { name: '编程范式', value: 'CATEGORIES.programmingParadigm' },
          { name: 'JS', value: 'CATEGORIES.js' },
          { name: 'CSS', value: 'CATEGORIES.css' },
          { name: 'HTML', value: 'CATEGORIES.html' },
          { name: 'react', value: 'CATEGORIES.react' },
          { name: 'vue', value: 'CATEGORIES.vue' },
          { name: 'nodejs', value: 'CATEGORIES.nodejs' },
          { name: '前沿技术', value: 'CATEGORIES.preFrontTechnology' }
        ]
      },
      {
        type: 'input',
        name: 'tags',
        message: '请输入博客标签（空格分开）'
      }
    ],

    // List of actions to take.
    // Here we "add" new files from our templates.
    actions: data => {
      const actions = []
      console.log(data)

      const paths = data.path.split('/')
      const enName = paths[paths.length - 1].replace('.md', '')
      const contextName = enName.replace(/-(\w)/g, (match, $1) => $1.toUpperCase()).replace('-', '')
      const img = data.img ? data.img : 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200518200724.jpg'

      actions.push({
        type: 'modify',
        path: modulePath,
        pattern: /(\/\/ New Blog Path)/g,
        template: `$1\nimport ${contextName} from './${paths[paths.length - 2]}/${enName}.json'`
      })

      actions.push({
        type: 'modify',
        path: modulePath,
        pattern: /(export default \[)/g,
        template: `$1
  {
    title: '${data.name}',
    path: '${enName}',
    img: '${img}',
    content: ${contextName}.content,
    tags: [${data.tags
      .split(' ')
      .map(t => `'${t}'`)
      .join(', ')}],
    category: ${data.category}
  },`
      })

      return actions
    }
  })
}
