import React from 'react'
import Header from '../../components/header'

import Markdown from '../../components/markdown'
import MarkdownFile from '../../asset/markdown/home/index.md'

// export default () => 'HOME'
export default () => (
  <div>
    <Header></Header>
    <Markdown link={MarkdownFile}></Markdown>
  </div>
)
