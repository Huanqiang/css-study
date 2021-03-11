import React, { useState, useEffect, useRef } from 'react'
import ErrorImage from '../../asset/img/image-error.png'
import LoadingImg from '../../asset/img/loading.gif'

const LoadImage = (imgUrl, callback) => {
  const img = new Image(imgUrl)
  img.src = imgUrl
  if (img.complete) {
    // 如果图片已经存在于浏览器缓存，直接调用回调函数
    callback(imgUrl)
    return // 直接返回，不用再处理onload事件
  }
  img.onload = () => {
    // 避免gif多次触发 onload 函数
    img.onload = null
    callback(imgUrl)
  }

  img.onerror = () => {
    callback(ErrorImage)
  }
}

const LazyImage = ({ img, title }) => {
  const ref = useRef()
  const [imgSrc, setImgSrc] = useState(LoadingImg)
  const observer = new IntersectionObserver(function (entities) {
    entities.forEach(function (entity) {
      if (entity.intersectionRatio <= 0) {
        return
      }
      LoadImage(img, setImgSrc)
      // 加载完后移除监听
      observer.unobserve(ref.current)
    })
  })

  useEffect(() => {
    observer.observe(ref.current)
    return () => {
      observer.unobserve(ref.current)
    }
  }, [observer])

  return (
    <div className="blog-item-image">
      <img ref={ref} src={imgSrc} alt={title}></img>
    </div>
  )
}

export default LazyImage
