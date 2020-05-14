import React from 'react'
import DynamicList from '../../../components/dynamic-add-list/demo'
import PageLayout from '../../../components/page-layout'

export const Animation = () => <DynamicList></DynamicList>

export default () => <PageLayout cssAnimation={() => <Animation></Animation>} explain={() => <></>}></PageLayout>
