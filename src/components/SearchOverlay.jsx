import { useEffect, useState } from 'react'
import { getProducts } from '../api/products'
import { toCardProduct } from '../utils/mapProduct'
import ProductCard from './ProductCard'
import { useStore } from '../context/StoreContext'

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} fluid />
      ))}
    </div>
  )
}

function SearchOverlay({ query }) {
  const { recentlyViewed, clearRecentlyViewed } = useStore()
  const trimmed = query.trim()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [defaultProducts, setDefaultProducts] = useState([])

  // Debounced search against the real catalog — waits for a pause in
  // typing before hitting the server, same idea as the CMS autosave.
  useEffect(() => {
    if (!trimmed) return
    setLoading(true)
    const timer = setTimeout(() => {
      getProducts({ search: trimmed, limit: 8 })
        .then((data) => setResults(data.products.map(toCardProduct)))
        .catch(() => setResults([]))
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [trimmed])

  useEffect(() => {
    if (trimmed) return
    getProducts({ limit: 8 })
      .then((data) => setDefaultProducts(data.products.map(toCardProduct)))
      .catch(() => {})
  }, [trimmed])

  if (trimmed) {
    return (
      <div className="max-h-[70vh] overflow-y-auto p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-wide text-gray-500">PRODUCTS</h3>
        </div>
        {loading ? (
          <p className="py-6 text-center text-sm text-gray-500">Searching...</p>
        ) : results.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            No products found for &ldquo;{trimmed}&rdquo;
          </p>
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    )
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto p-4">
      {recentlyViewed.length > 0 && (
        <div className="mb-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold tracking-wide text-gray-500">RECENTLY VIEWED</h3>
            <button
              type="button"
              onClick={clearRecentlyViewed}
              className="text-xs font-semibold text-gray-400 hover:text-gray-700"
            >
              CLEAR
            </button>
          </div>
          <ProductGrid products={recentlyViewed} />
        </div>
      )}

      <div>
        <h3 className="mb-3 text-xs font-bold tracking-wide text-gray-500">PRODUCTS</h3>
        <ProductGrid products={defaultProducts} />
      </div>
    </div>
  )
}

export default SearchOverlay
