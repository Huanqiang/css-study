import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { transformToString } from '../../components/markdown'
import ErrorImage from '../../asset/img/image-error.png'

const Image = ({ img, title }) => {
  const [imgSrc, setImgSrc] = useState('')
  // const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setImgSrc(img)
  }, [img])

  return (
    <div className="blog-item-image">
      <img src={imgSrc} alt={title} onError={() => setImgSrc(ErrorImage)}></img>
      {/* {isLoading && <div className="loading"></div>} */}
    </div>
  )
}

export default ({ url, img, title, content, category, tags, imagePosition = 'left' }) => {
  const [blog, setBlog] = useState('')
  useEffect(() => {
    // fetch(content)
    //   .then(res => res.text())
    //   .then(text => setBlog(text))
    setBlog(transformToString(content))
  }, [content])

  return (
    <Link to={`${url.lastIndexOf('/') === url.length - 1 ? url.slice(0, url.length - 1) : url}/${title}`}>
      <div className="blog-item">
        {imagePosition === 'left' && <Image img={img} title={title}></Image>}
        <div className="blog-item-brief">
          <div className="title">{title}</div>
          <div className="category">
            分类：{category} | 标签：{tags.join('，')}
          </div>
          <div className="content">{blog}</div>
        </div>
        {imagePosition === 'right' && <Image img={img} title={title}></Image>}
      </div>
    </Link>
  )
}
