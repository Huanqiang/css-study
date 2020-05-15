import { useState, useEffect } from 'react'

const useActiveMenu = hs => {
  const [activeMenu, setActiveMenu] = useState('')

  useEffect(() => {
    let lastActiveMenu = null

    const func = () => {
      const titles = hs.reduce((prev, h) => {
        return [...prev, ...document.getElementsByTagName(h)]
      }, [])

      const active = titles
        .reduce((prev, title) => {
          return title.getBoundingClientRect().top < 30
            ? [
                ...prev,
                {
                  id: title.id,
                  top: title.getBoundingClientRect().top
                }
              ]
            : prev
        }, [])
        .sort((t1, t2) => t2.top - t1.top)[0]

      if (active && (!lastActiveMenu || lastActiveMenu !== active.id)) {
        setActiveMenu(active.id)
        lastActiveMenu = active.id
      }
    }

    document.addEventListener('scroll', func)

    return () => document.removeEventListener('scroll', func)
  }, [hs])

  return activeMenu
}

export default useActiveMenu
