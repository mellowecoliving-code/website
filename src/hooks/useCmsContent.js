import { useEffect, useState } from 'react'
import { getAllCmsContent } from '../api/cms'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const SERVER_ORIGIN = API_URL.replace(/\/api\/?$/, '')

export function resolveMediaUrl(url) {
  if (!url) return url
  if (/^https?:\/\//.test(url)) return url
  return `${SERVER_ORIGIN}${url}`
}

// Stale-while-revalidate: the last successful fetch is kept in localStorage
// so a returning visitor's first paint already has the real CMS content
// (no flash of the bundled placeholder image while the network request is
// in flight) — this still re-fetches every load to pick up admin changes,
// it just doesn't make the visitor wait to see something correct.
const CACHE_KEY = 'mellow_cms_cache'

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // Storage full or unavailable (private browsing) — fine to skip caching.
  }
}

// Every homepage section calling this independently would fire 8 identical
// requests on first paint — cache the one shared fetch at module scope so
// every consumer gets the same in-flight promise / resolved data.
let cachePromise = null

function loadCmsContent() {
  if (!cachePromise) {
    cachePromise = getAllCmsContent()
      .then((data) => {
        writeCache(data)
        return data
      })
      .catch(() => readCache() || {})
  }
  return cachePromise
}

// Returns { [section]: data | null } — components fall back to their own
// hardcoded defaults whenever a section (or the whole fetch) isn't present,
// so the site looks identical to today until an admin actually saves
// something in the CMS.
export function useCmsContent() {
  const [content, setContent] = useState(() => readCache())

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

// True only on a visitor's very first-ever load (nothing cached yet) while
// the initial fetch is still in flight — lets a section show a loading
// skeleton instead of its bundled placeholder image for that one request,
// so switching to the real CMS image doesn't read as a visible swap.
export function useCmsLoading() {
  const [loading, setLoading] = useState(() => readCache() === null)

  useEffect(() => {
    if (!loading) return
    let cancelled = false
    loadCmsContent().finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading
}
