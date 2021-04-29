// New Blog Path
import xssCsrf from './xss-csrf/xss-csrf.json'
import performanceOptimize from './performance-optimize/performance-optimize.json'
import rollupBuild from './rollup-build/rollup-build.json'
import builderPattern from './builder-pattern/builder-pattern.json'
import chainOfResponsibility from './ChainOfResponsibility/chain-of-responsibility.json'
import ReactRef from './react-ref/React-Ref.json'
import location from './location/localtion.json'
import bfc from './BFC/BFC.json'
import pwa from './PWA/pwa-intro.json'
import ReactHook from './React Hook/react-hook.json'
import filterfFxed from './filter-fixed/filter-fixed.json'
import lambdaCalculus from './lambda calculus/lambda-calculus.json'
import scaffold from './scaffold/scaffold.json'
import vueSSRStudy from './vue-ssr-study-guide/vue-ssr-study-guide.json'
import controlledComponents from './controlled-components-and-noncontrolled-components/controlled-components-and-noncontrolled-components.json'
import HeightAuto from './height-auto-and-percentage/height-auto-and-percentage.json'
import WXApp from './wx-app/wx-app-underlying-framework.json'
import facadePatterns from './facade-patterns/facade-patterns.json'

const CATEGORIES = {
  programmingParadigm: '编程范式',
  css: 'CSS',
  html: 'HTML',
  react: 'react',
  vue: 'vue',
  nodejs: 'nodejs',
  preFrontTechnology: '前沿技术',
  js: 'js'
}

export default [
  {
    title: 'XSS 和 CSRF',
    path: 'xss-csrf',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20210429161641.png',
    content: xssCsrf.content,
    tags: ['xss', 'csrf'],
    category: CATEGORIES.preFrontTechnology
  },
  {
    title: '性能优化',
    path: 'performance-optimize',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20210428153741.png',
    content: performanceOptimize.content,
    tags: ['performance', 'lighthouse'],
    category: CATEGORIES.preFrontTechnology
  },
  {
    title: 'rollup 打包配置',
    path: 'rollup-build',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20210425113543.jpeg',
    content: rollupBuild.content,
    tags: ['rollup', 'webpack', '模块'],
    category: CATEGORIES.preFrontTechnology
  },
  {
    title: '生成器模式',
    path: 'builder-pattern',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200807093815.png',
    content: builderPattern.content,
    tags: ['设计模式', '生成器模式'],
    category: CATEGORIES.programmingParadigm
  },
  {
    title: '责任链模式',
    path: 'chain-of-responsibility',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200807093815.png',
    content: chainOfResponsibility.content,
    tags: ['设计模式', '责任链模式'],
    category: CATEGORIES.programmingParadigm
  },
  {
    title: 'React Ref 使用总结',
    path: 'React-Ref',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200729102701.png',
    content: ReactRef.content,
    tags: ['react', 'ref'],
    category: CATEGORIES.react
  },
  {
    title: 'lambda 演算',
    path: 'lambda-calculus',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200521171048.jpg',
    content: lambdaCalculus.content,
    tags: ['函数式编程', 'lambda 演算'],
    category: CATEGORIES.programmingParadigm
  },
  {
    title: '外观模式',
    path: 'facade-patterns',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200807093815.png',
    content: facadePatterns.content,
    tags: ['设计模式'],
    category: CATEGORIES.programmingParadigm
  },
  {
    title: '小程序底层框架',
    path: 'wx-app-underlying-framework',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200603160306.jpg',
    content: WXApp.content,
    tags: ['小程序', '底层框架'],
    category: CATEGORIES.preFrontTechnology
  },
  {
    title: '关于 height 100% 和 auto 的计算方式',
    path: 'height-auto-and-percentage',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200528104057.png',
    content: HeightAuto.content,
    tags: ['height:100%'],
    category: CATEGORIES.css
  },
  {
    title: '带你彻底了解BFC',
    path: 'bfc',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200521171345.jpg',
    content: bfc.content,
    tags: ['BFC'],
    category: CATEGORIES.css
  },
  {
    title: 'ReactHook详解',
    path: 'react-hook',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200521171037.png',
    content: ReactHook.content,
    tags: ['react', 'react hook'],
    category: CATEGORIES.react
  },
  {
    title: 'location',
    path: 'location',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/blog/56ouoyj064f18ltbnjxy.png',
    content: location.content,
    tags: ['locaction'],
    category: CATEGORIES.html
  },
  {
    title: 'filter与fixed冲突的原因',
    path: 'filter-fixed',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200518200724.jpg',
    content: filterfFxed.content,
    tags: ['filter', 'fixed'],
    category: CATEGORIES.css
  },
  {
    title: '受控组件与非受控组件',
    path: 'controlled-components-and-noncontrolled-components',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200524084317.jpg',
    content: controlledComponents.content,
    tags: ['react', '受控组件', '非受控组件'],
    category: CATEGORIES.react
  },
  {
    title: '搭建一个简易脚手架',
    path: 'scaffold',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200518200724.jpg',
    content: scaffold.content,
    tags: ['脚手架'],
    category: CATEGORIES.nodejs
  },
  {
    title: 'vue ssr 学习总结',
    path: 'vue-ssr-study-guide',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200521171045.jpg',
    content: vueSSRStudy.content,
    tags: ['vue', 'ssr'],
    category: CATEGORIES.vue
  },
  {
    title: '初步了解PWA',
    path: 'pwa',
    img: 'https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200521171015.png',
    content: pwa.content,
    tags: ['PWA', '渐进式Web应用'],
    category: CATEGORIES.preFrontTechnology
  }
]
