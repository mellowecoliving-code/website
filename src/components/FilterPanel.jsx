import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

function FilterPanel({ open, onClose, maxPrice, categories, price, selectedCategories, onApply }) {
  const [pendingPrice, setPendingPrice] = useState(price)
  const [pendingCategories, setPendingCategories] = useState(selectedCategories)

  useEffect(() => {
    if (open) {
      setPendingPrice(price)
      setPendingCategories(selectedCategories)
    }
  }, [open, price, selectedCategories])

  const toggleCategory = (cat) => {
    setPendingCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  const handleApply = () => {
    onApply({ price: pendingPrice, categories: pendingCategories })
    onClose()
  }

  const handleClear = () => {
    setPendingPrice(maxPrice)
    setPendingCategories([])
    onApply({ price: maxPrice, categories: [] })
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className={`absolute left-0 top-0 flex h-full w-full max-w-xs flex-col bg-white shadow-xl transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-bold tracking-wide text-gray-900">FILTERS</h2>
          <button type="button" aria-label="Close filters" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="mb-8">
            <h3 className="mb-3 text-xs font-bold tracking-wide text-gray-500">PRICE</h3>
            <div className="mb-1 flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              step={1}
              value={pendingPrice}
              onChange={(e) => setPendingPrice(Number(e.target.value))}
              className="w-full accent-[#013485]"
            />
            <p className="mt-2 text-xs text-gray-500">
              The highest price is Rs. {pendingPrice.toLocaleString('en-IN')}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold tracking-wide text-gray-500">CATEGORIES</h3>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center justify-between text-sm text-gray-800">
                  {cat}
                  <input
                    type="checkbox"
                    checked={pendingCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="h-4 w-4 accent-[#013485]"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 rounded-full bg-blue-50 py-2.5 text-xs font-bold tracking-wide text-[#013485] hover:bg-blue-100"
          >
            CLEAR
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 rounded-full bg-[#013485] py-2.5 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b]"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
