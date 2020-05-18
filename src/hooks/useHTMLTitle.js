import { useState, useEffect } from 'react'

const titleHtmls = ['h1', 'h2', 'h3', 'h4', 'h5']
const Title = (tag, id, label) => ({
  tag,
  id,
  label,
  children: []
})

/**
 * 获取目录
 * @param {*} markdown 生成的 html 源码
 */
const getTitles = (code, titleHs = titleHtmls) => {
  const titles = []
  const dom = new DOMParser().parseFromString(code, 'text/html')
  let node = dom.body.firstElementChild
  while (node) {
    const titleIndex = titleHs.indexOf(node.tagName.toLowerCase())
    if (titleIndex !== -1) {
      if (titles.length === 0) {
        titles.push(Title(node.tagName, node.id, node.innerHTML))
      } else {
        let curTitles = titles
        let title = curTitles[curTitles.length - 1]

        while (title) {
          // 标签同级 或者上级子标签为空
          if (title.tag === node.tagName) {
            curTitles.push(Title(node.tagName, node.id, node.innerHTML))
            title = null
          } else {
            curTitles = curTitles[curTitles.length - 1].children
            if (curTitles.length === 0) {
              curTitles.push(Title(node.tagName, node.id, node.innerHTML))
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

export default (content, levels) => {
  let [titles, setTitles] = useState([])

  useEffect(() => {
    setTitles(getTitles(content, levels))
  }, [content, levels])

  return titles
}
