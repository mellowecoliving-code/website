import { Check, ShoppingBag, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../context/StoreContext'
import { COLOR_SWATCHES } from '../utils/colorSwatches'

function QuickAddModal({ product, onClose }) {
  const { addToCart, showToast } = useStore()
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [justAdded, setJustAdded] = useState(false)

  const sizes = useMemo(() => [...new Set(product.variants.map((v) => v.size).filter(Boolean))], [product])
  const colors = useMemo(() => [...new Set(product.variants.map((v) => v.color).filter(Boolean))], [product])

  useEffect(() => {
    const firstInStock = product.variants.find((v) => v.stock > 0) || product.variants[0]
    if (firstInStock) {
      setSelectedSize(firstInStock.size || null)
      setSelectedColor(firstInStock.color || null)
    }
  }, [product])

  const selectedVariant = product.variants.find(
    (v) => (!sizes.length || v.size === selectedSize) && (!colors.length || v.color === selectedColor),
  )
  const outOfStock = !selectedVariant || selectedVariant.stock <= 0

  const handleAdd = () => {
    if (outOfStock) return
    addToCart({
      ...product,
      variantSku: selectedVariant.sku,
      variantLabel: [selectedVariant.color, selectedVariant.size].filter(Boolean).join(' / '),
      stock: selectedVariant.stock,
    })
    showToast(`${product.name} added to cart`)
    setJustAdded(true)
    setTimeout(onClose, 700)
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

        {colors.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500">
              COLOR{selectedColor ? `: ${selectedColor}` : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => {
                const hasStock = product.variants.some((v) => v.color === c && v.stock > 0)
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    disabled={!hasStock}
                    style={{ background: COLOR_SWATCHES[c] || '#cccccc' }}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium text-white transition-all ${
                      selectedColor === c
                        ? 'border-[#013485] ring-2 ring-[#013485] ring-offset-2'
                        : hasStock
                          ? 'border-transparent hover:opacity-90'
                          : 'border-transparent opacity-40 line-through'
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500">SIZE</p>
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

        <button
          type="button"
          disabled={outOfStock}
          onClick={handleAdd}
          className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-bold tracking-wide text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            justAdded ? 'bg-green-600' : 'bg-[#013485] hover:bg-[#012a6b]'
          }`}
        >
          {justAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          {justAdded ? 'ADDED' : outOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  )
}

export default QuickAddModal
