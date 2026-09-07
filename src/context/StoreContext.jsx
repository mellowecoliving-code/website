import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getProducts } from '../api/products'
import { validateCoupon } from '../api/coupons'
import { toCardProduct } from '../utils/mapProduct'
import { useAuth } from './AuthContext'
import { syncStore } from '../api/account'

const StoreContext = createContext(null)
const RECENTLY_VIEWED_KEY = 'mellow_recently_viewed'
const CART_KEY = 'mellow_cart'
const WISHLIST_KEY = 'mellow_wishlist'
const MAX_RECENTLY_VIEWED = 8

// A product with variants can be in the cart multiple times at once — one
// line per size/color combo — so the cart key isn't just the product id.
// The base product id is always recoverable with baseProductId() below.
function cartKeyFor(product) {
  return product.variantSku ? `${product.id}::${product.variantSku}` : product.id
}

function baseProductId(cartKey) {
  return cartKey.split('::')[0]
}

function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore storage failures (private browsing, quota, etc.)
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage(CART_KEY, {}))
  const [wishlist, setWishlist] = useState(() => loadFromStorage(WISHLIST_KEY, {}))
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const [recentlyViewed, setRecentlyViewed] = useState(() => loadFromStorage(RECENTLY_VIEWED_KEY, []))
  const [coupon, setCoupon] = useState(null) // { code, discountAmount, discountType, discountValue }
  const [couponLoading, setCouponLoading] = useState(false)

  const { isAuthenticated, loading: authLoading } = useAuth()
  const isSyncing = useRef(false)
  const prevAuth = useRef(false)

  useEffect(() => saveToStorage(RECENTLY_VIEWED_KEY, recentlyViewed), [recentlyViewed])
  useEffect(() => saveToStorage(CART_KEY, cart), [cart])
  useEffect(() => saveToStorage(WISHLIST_KEY, wishlist), [wishlist])

  useEffect(() => {
    if (authLoading) return

    if (!isAuthenticated) {
      if (prevAuth.current) {
        setCart({})
        setWishlist({})
        saveToStorage(CART_KEY, {})
        saveToStorage(WISHLIST_KEY, {})
      }
      prevAuth.current = false
      return
    }

    if (!prevAuth.current && isAuthenticated) {
      prevAuth.current = true
      isSyncing.current = true

      syncStore({ localCart: cart, localWishlist: wishlist, merge: true })
        .then(async (data) => {
          // The server only stores ids + qty — re-attach full product
          // details from what we already have locally, falling back to a
          // real DB lookup (batched into one request) for ids that came
          // from another device/session.
          const cartKeys = Object.keys(data.cart)
          const wishlistIds = data.wishlist
          const missingIds = new Set()
          cartKeys.forEach((key) => {
            if (!cart[key]?.product && !wishlist[baseProductId(key)]) missingIds.add(baseProductId(key))
          })
          wishlistIds.forEach((id) => {
            if (!wishlist[id] && !cart[id]?.product) missingIds.add(id)
          })

          let fetched = {}
          if (missingIds.size > 0) {
            try {
              const res = await getProducts({ ids: [...missingIds].join(',') })
              fetched = Object.fromEntries(res.products.map((p) => [p._id, toCardProduct(p)]))
            } catch {
              // Leave fetched empty — those ids just won't rehydrate this time.
            }
          }

          const normalizedCart = {}
          cartKeys.forEach((key) => {
            let product = cart[key]?.product || wishlist[baseProductId(key)]
            if (!product) {
              const base = fetched[baseProductId(key)]
              const sku = key.includes('::') ? key.split('::')[1] : null
              const variant = sku ? base?.variants?.find((v) => v.sku === sku) : null
              product = variant
                ? {
                    ...base,
                    variantSku: variant.sku,
                    variantLabel: [variant.color, variant.size].filter(Boolean).join(' / '),
                    stock: variant.stock,
                  }
                : base
            }
            if (product) normalizedCart[key] = { product, qty: data.cart[key] }
          })
          const normalizedWishlist = {}
          wishlistIds.forEach((id) => {
            const product = wishlist[id] || cart[id]?.product || fetched[id]
            if (product) normalizedWishlist[id] = product
          })

          setCart(normalizedCart)
          setWishlist(normalizedWishlist)
        })
        .catch(console.error)
        .finally(() => {
          isSyncing.current = false
        })
    }
  }, [isAuthenticated, authLoading])

  useEffect(() => {
    if (!isAuthenticated || isSyncing.current || authLoading) return

    const timer = setTimeout(() => {
      syncStore({ localCart: cart, localWishlist: wishlist, merge: false }).catch(console.error)
    }, 1000)

    return () => clearTimeout(timer)
  }, [cart, wishlist, isAuthenticated, authLoading])

  const showToast = (message) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2000)
  }

  const trackRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const next = [product, ...prev.filter((p) => p.id !== product.id)]
      return next.slice(0, MAX_RECENTLY_VIEWED)
    })
  }

  const clearRecentlyViewed = () => setRecentlyViewed([])

  const addToCart = (product) => {
    const key = cartKeyFor(product)
    setCart((prev) => ({
      ...prev,
      [key]: { product, qty: (prev[key]?.qty || 0) + 1 },
    }))
    trackRecentlyViewed(product)
  }

  const setCartQty = (key, qty) => {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      if (!prev[key]) return prev
      return { ...prev, [key]: { ...prev[key], qty } }
    })
  }

  const removeFromCart = (key) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const clearCart = () => {
    setCart({})
    setCoupon(null)
  }

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const next = { ...prev }
      if (next[product.id]) {
        delete next[product.id]
      } else {
        next[product.id] = product
      }
      return next
    })
    trackRecentlyViewed(product)
  }

  const addAllWishlistToCart = () => {
    Object.values(wishlist).forEach((product) => addToCart(product))
  }

  const removeAllFromWishlist = () => setWishlist({})

  const cartTotal = useMemo(
    () => Object.values(cart).reduce((sum, item) => sum + item.qty * Number(item.product.price), 0),
    [cart],
  )

  const applyCoupon = async (code) => {
    setCouponLoading(true)
    try {
      const result = await validateCoupon(code, cartTotal)
      setCoupon(result)
      return result
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => setCoupon(null)

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, item) => sum + item.qty, 0),
    [cart],
  )
  const wishlistCount = useMemo(() => Object.keys(wishlist).length, [wishlist])

  const value = {
    cart,
    cartKeyFor,
    wishlist,
    addToCart,
    setCartQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    addAllWishlistToCart,
    removeAllFromWishlist,
    isWishlisted: (id) => Boolean(wishlist[id]),
    cartCount,
    cartTotal,
    wishlistCount,
    toast,
    showToast,
    recentlyViewed,
    trackRecentlyViewed,
    clearRecentlyViewed,
    coupon,
    couponLoading,
    applyCoupon,
    removeCoupon,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
