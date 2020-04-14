import React from 'react'
import Panel from '../../components/panel'
import PageLayout from '../../components/page-layout'
import Loading from '../../components/loading'

export default () => <PageLayout cssAnimation={() => <Loading></Loading>}></PageLayout>
