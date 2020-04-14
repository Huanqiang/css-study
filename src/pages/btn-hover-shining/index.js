import React from 'react'
import Panel from '../../components/panel'
import PageLayout from '../../components/page-layout'
import ShiningBtn from '../../components/btn-hover-shining'

export default () => (
  <PageLayout
    cssAnimation={() => <ShiningBtn></ShiningBtn>}
    explain={() => (
      <Panel title="linear-gradient 函数" children={() => <div>linear-gradient 函数是xxx</div>}></Panel>
    )}></PageLayout>
)
