import { useState, useEffect } from 'react'

const useScrollProcesses = () => {
  const [process, setProcess] = useState(0)
  useEffect(() => {
    const scrollProcess = () => {
      const scrollPercent =
        document.scrollingElement.scrollTop /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight)
      setProcess(Math.floor(scrollPercent * 100))
    }
    window.addEventListener('scroll', scrollProcess)
    return () => window.removeEventListener('scroll', scrollProcess)
  })

  return process
}

export default useScrollProcesses
