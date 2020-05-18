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
      node.children.length !== 0 &&
      node.children[0].tagName === 'IMG' &&
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
  dom = setImageClassName(dom)
  return dom.body.innerHTML
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
    markdown !== '' && setMarkdownHtml(handleMarkdownStyle(markdown))
  }, [markdown])

  useEffect(() => {
    const getData = async link => {
      const res = await (await fetch(link)).text()
      setMarkdownHtml(handleMarkdownStyle(Marked(res)))
    }
    link && getData(link)
  }, [link])

  return <div className="markdown" dangerouslySetInnerHTML={{ __html: markdownHtml }}></div>
}
