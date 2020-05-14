import React from 'react'
import PageLayout from '../../../components/page-layout'
// import Panel from '../../../components/panel'
import Loading from '../../../components/loading'

export const Animation = () => <Loading></Loading>

export default () => <PageLayout cssAnimation={() => <Animation></Animation>} explain={() => <></>}></PageLayout>
