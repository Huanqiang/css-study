import React from 'react'
import ShiningBtn from '../../../components/btn-hover-shining'
import PageLayout from '../../../components/page-layout'

export const Animation = () => <ShiningBtn></ShiningBtn>

export default () => <PageLayout cssAnimation={() => <Animation></Animation>} explain={() => <></>}></PageLayout>
