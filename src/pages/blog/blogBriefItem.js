import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { transformToString } from '../../components/markdown'
import Image from '../../components/Image'
// import ErrorImage from '../../asset/img/image-error.png'

// const Image = ({ img, title }) => {
//   const [imgSrc, setImgSrc] = useState('')
//   // const [isLoading, setIsLoading] = useState(true)
//   useEffect(() => {
//     setImgSrc(img)
//   }, [img])

//   return (
//     <div className="blog-item-image">
//       <img src={imgSrc} alt={title} onError={() => setImgSrc(ErrorImage)}></img>
//       {/* {isLoading && <div className="loading"></div>} */}
//     </div>
//   )
// }

export default ({ url, img, title, path, content, category, tags, imagePosition = 'left' }) => {
  const [blog, setBlog] = useState('')
  useEffect(() => {
    setBlog(transformToString(content))
  }, [content])

  return (
    <Link to={`/blog/${encodeURIComponent(path)}`}>
      <div className="blog-item">
        {imagePosition === 'left' && <Image img={img} title={title}></Image>}
        <div className="blog-item-brief">
          <div className="title" title={title}>
            {title}
          </div>
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
