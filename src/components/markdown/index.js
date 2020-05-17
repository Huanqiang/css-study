import React, { useState, useEffect } from 'react'
import Marked from 'marked'
import hljs from 'highlight.js'
import utils from './utils'

import 'highlight.js/styles/atom-one-dark.css'
import './index.scss'

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

const setImageClassName = dom => {
  let node = dom.body.firstElementChild
  while (node) {
    if (
      node.tagName === 'P' &&
      node.childNodes[0].tagName === 'IMG' &&
      !utils.hasClass(node, 'markdown-img-container')
    ) {
      node.classList.add('markdown-img-container')
    }
    node = node.nextElementSibling
  }

  return dom
}

// 这里为代码的每一行增加了 li，然后使用css样式 list-style: decimal; 来增加数字
const addLineNumber = dom => {
  const codes = dom.querySelectorAll('pre code')

  codes.forEach(code => {
    code.innerHTML = '<ul><li>' + code.innerHTML.replace(/\n/g, '\n</li><li>') + '\n</li></ul>'
  })
  return dom
}

export const handleMarkdownStyle = code => {
  let dom = new DOMParser().parseFromString(code, 'text/html')
  dom = addLineNumber(dom)
  // console.log('addLineNumber', dom)
  dom = setImageClassName(dom)
  // console.log('setImageClassName', dom)
  return dom.body.innerHTML
}

const titleHtmls = ['h1', 'h2', 'h3', 'h4', 'h5']
const getTitle = (tag, id, label) => {
  return {
    tag,
    id,
    label,
    children: []
  }
}

/**
 * 获取目录
 * @param {*} markdown 生成的 html 源码
 */
export const getTitles = (code, titleHs = titleHtmls) => {
  const titles = []
  const dom = new DOMParser().parseFromString(code, 'text/html')
  let node = dom.body.firstElementChild
  while (node) {
    const titleIndex = titleHs.indexOf(node.tagName.toLowerCase())
    if (titleIndex !== -1) {
      if (titles.length === 0) {
        titles.push(getTitle(node.tagName, node.id, node.innerHTML))
      } else {
        let curTitles = titles
        let title = curTitles[curTitles.length - 1]

        while (title) {
          // 标签同级 或者上级子标签为空
          if (title.tag === node.tagName) {
            curTitles.push(getTitle(node.tagName, node.id, node.innerHTML))
            title = null
          } else {
            curTitles = curTitles[curTitles.length - 1].children
            if (curTitles.length === 0) {
              curTitles.push(getTitle(node.tagName, node.id, node.innerHTML))
              title = null
            } else {
              title = curTitles[curTitles.length - 1]
            }
          }
        }
      }
    }
    node = node.nextElementSibling
  }

  return titles
}

/**
 * 获取 html 中的innerHtml
 * @param {*} code
 */
export const transformToString = code => {
  let innerHTML = ''
  const dom = new DOMParser().parseFromString(code, 'text/html')
  let node = dom.body.firstElementChild
  while (node) {
    innerHTML += node.innerText.replace(/\n/g, '')
    node = node.nextElementSibling
  }

  return innerHTML
}

export const getMarkdownHtml = code => handleMarkdownStyle(Marked(code))

export default ({ link = null, markdown = '' }) => {
  const [markdownHtml, setMarkdownHtml] = useState('')
  useEffect(() => {
    setMarkdownHtml(markdown)
  }, [markdown])
  useEffect(() => {
    const getData = async link => {
      const res = await (await fetch(link)).text()
      const code = handleMarkdownStyle(Marked(res))
      setMarkdownHtml(code)
    }
    link && getData(link)
  }, [link])
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: markdownHtml }}></div>
}
