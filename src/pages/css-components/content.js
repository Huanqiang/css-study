import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import routers from '../../router/components'

export default () => {
  let [animationPage, setAnimationPage] = useState(null)
  let { title } = useParams()

  useEffect(() => {
    console.log(title)
    const animation = routers.filter(router => router.path === title)[0]
    if (animation) {
      setAnimationPage(animation.Page)
    }
  }, [title])

  return <div className="component-content">{animationPage}</div>
}
