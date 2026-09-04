import ProductCard from './ProductCard'
import { useStore } from '../context/StoreContext'
import { allProducts, searchProducts } from '../data/searchIndex'

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

  if (trimmed) {
    const results = searchProducts(trimmed)
    return (
      <div className="max-h-[70vh] overflow-y-auto p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-wide text-gray-500">PRODUCTS</h3>
        </div>
        {results.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            No products found for &ldquo;{trimmed}&rdquo;
          </p>
        ) : (
          <ProductGrid products={results.slice(0, 8)} />
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
        <ProductGrid products={allProducts.slice(0, 8)} />
      </div>
    </div>
  )
}

export default SearchOverlay
