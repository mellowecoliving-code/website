import { useEffect, useState } from 'react'
import { getAllCmsContent } from '../api/cms'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const SERVER_ORIGIN = API_URL.replace(/\/api\/?$/, '')

export function resolveMediaUrl(url) {
  if (!url) return url
  if (/^https?:\/\//.test(url)) return url
  return `${SERVER_ORIGIN}${url}`
}

// Every homepage section calling this independently would fire 8 identical
// requests on first paint — cache the one shared fetch at module scope so
// every consumer gets the same in-flight promise / resolved data.
let cachePromise = null

function loadCmsContent() {
  if (!cachePromise) {
    cachePromise = getAllCmsContent().catch(() => ({}))
  }
  return cachePromise
}

// Returns { [section]: data | null } — components fall back to their own
// hardcoded defaults whenever a section (or the whole fetch) isn't present,
// so the site looks identical to today until an admin actually saves
// something in the CMS.
export function useCmsContent() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    let cancelled = false
    loadCmsContent().then((data) => {
      if (!cancelled) setContent(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return content || {}
}
