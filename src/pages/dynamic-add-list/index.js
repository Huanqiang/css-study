import React from 'react'
import DynamicList from '../../components/dynamic-add-list/demo'
import PageLayout from '../../components/page-layout'

// export default () => 'HOME'
export default () => <PageLayout cssAnimation={() => <DynamicList></DynamicList>} explain={() => <></>}></PageLayout>
