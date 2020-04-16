import React, { useState, useEffect } from 'react'
import Marked from 'marked'

export default ({ markdown }) => {
  const [dom, setDom] = useState('')
  useEffect(() => {
    fetch(markdown)
      .then(res => res.text())
      .then(text => setDom(text))
  })
  return <div dangerouslySetInnerHTML={{ __html: Marked(dom) }}></div>
}
