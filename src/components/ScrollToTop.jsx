import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // The target section may not exist on this route yet (e.g. navigating
    // from another page to "/#how-it-works" — Home hasn't mounted its
    // sections at the instant this effect runs), so retry across a couple
    // of frames instead of only trying once.
    let attempts = 0
    let frame
    const tryScroll = () => {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
      attempts += 1
      if (attempts < 10) frame = requestAnimationFrame(tryScroll)
    }
    frame = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
