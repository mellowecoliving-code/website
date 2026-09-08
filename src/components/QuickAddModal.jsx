import { Heart, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/StoreContext'
import { COLOR_SWATCHES } from '../utils/colorSwatches'

function QuickAddModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useStore()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  const hasVariants = product.variants.length > 0
  const sizes = useMemo(() => [...new Set(product.variants.map((v) => v.size).filter(Boolean))], [product])
  const colors = useMemo(() => [...new Set(product.variants.map((v) => v.color).filter(Boolean))], [product])

  useEffect(() => {
    const firstInStock = product.variants.find((v) => v.stock > 0) || product.variants[0]
    if (firstInStock) {
      setSelectedSize(firstInStock.size || null)
      setSelectedColor(firstInStock.color || null)
    }
  }, [product])

  const selectedVariant = hasVariants
    ? product.variants.find(
        (v) => (!sizes.length || v.size === selectedSize) && (!colors.length || v.color === selectedColor),
      )
    : null
  // A product with no variants at all just uses its own stock; one with
  // variants needs an actual (in-stock) selection made.
  const outOfStock = hasVariants ? !selectedVariant || selectedVariant.stock <= 0 : (product.stock ?? 0) <= 0
  const wishlisted = isWishlisted(product.id)

  const cartProduct = () =>
    hasVariants
      ? {
          ...product,
          variantSku: selectedVariant.sku,
          variantLabel: [selectedVariant.color, selectedVariant.size].filter(Boolean).join(' / '),
          stock: selectedVariant.stock,
        }
      : product

  const handleBuyNow = () => {
    if (outOfStock) return
    addToCart(cartProduct())
    onClose()
    navigate(isAuthenticated ? '/checkout' : '/login', {
      state: !isAuthenticated ? { from: '/checkout' } : undefined,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-t-2xl bg-white p-5 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start gap-3">
          <img src={product.img} alt={product.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-gray-800">{product.name}</p>
            <p className="text-sm font-semibold text-gray-900">₹{Number(product.price).toLocaleString('en-IN')}</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="shrink-0 text-gray-400 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {sizes.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Size : <span className="font-medium text-gray-800">{selectedSize || '—'}</span>
              </p>
              <Link to="/size-guide" onClick={onClose} className="text-xs font-medium text-[#013485] hover:underline">
                Size Guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => {
                const hasStock = product.variants.some((v) => v.size === s && v.stock > 0)
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    disabled={!hasStock}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-full border px-2 text-sm font-medium transition-colors ${
                      selectedSize === s
                        ? 'border-[#013485] bg-[#013485] text-white'
                        : hasStock
                          ? 'border-gray-300 text-gray-700 hover:border-gray-900'
                          : 'border-gray-200 text-gray-300 line-through'
                    }`}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <div className="mb-5">
            <p className="mb-2 text-xs text-gray-500">
              Color : <span className="font-medium text-gray-800">{selectedColor || '—'}</span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((c) => {
                const hasStock = product.variants.some((v) => v.color === c && v.stock > 0)
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    disabled={!hasStock}
                    aria-label={c}
                    title={c}
                    style={{ background: COLOR_SWATCHES[c] || '#cccccc' }}
                    className={`h-7 w-7 shrink-0 rounded-full border transition-all ${
                      selectedColor === c
                        ? 'border-[#013485] ring-2 ring-[#013485] ring-offset-2'
                        : hasStock
                          ? 'border-gray-300 hover:opacity-90'
                          : 'border-gray-200 opacity-30'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={outOfStock}
          onClick={handleBuyNow}
          className="w-full rounded-full bg-[#013485] py-3 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#012a6b] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {outOfStock ? 'OUT OF STOCK' : 'BUY NOW'}
        </button>

        <div className="mt-2.5 flex items-center gap-2.5">
          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-full bg-blue-50 py-3 text-xs font-bold tracking-wide text-[#013485] hover:bg-blue-100"
          >
            MORE INFO
          </Link>
          <button
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={() => {
              toggleWishlist(product)
              showToast(wishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`)
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 hover:border-gray-900"
          >
            <Heart className={`h-4 w-4 ${wishlisted ? 'text-red-500' : 'text-gray-700'}`} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickAddModal
