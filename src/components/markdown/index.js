import React, { useState, useEffect } from 'react'
import Marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
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
  }
})

export default ({ markdown }) => {
  const [dom, setDom] = useState('')
  useEffect(() => {
    fetch(markdown)
      .then(res => res.text())
      .then(text => setDom(text))
  })
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: Marked(dom) }}></div>
}
