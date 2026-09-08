import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { COLOR_SWATCHES } from '../utils/colorSwatches'

function Section({ title, children, summary }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-xs font-bold tracking-wide text-gray-900"
      >
        {title}
        {open ? <ChevronUp className="h-3.5 w-3.5 text-gray-400" /> : <ChevronDown className="h-3.5 w-3.5 text-gray-400" />}
      </button>
      {/* Collapsed sections still show what's currently selected, so a
          shopper can see their whole filter state at a glance without
          opening every section. */}
      {!open && summary && <p className="mt-1 text-xs text-gray-400">{summary}</p>}
      {open && <div className="mt-3">{children}</div>}
    </div>
  )
}

function toggleInList(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

// One panel reused by both single-category pages (size/color/fabricType) and
// multi-category pages like Best Sellers/New Arrivals (categories) — a
// section only renders when its option list is actually passed in and
// non-empty, so each page only shows what's relevant to it.
function FilterPanel({
  open,
  onClose,
  maxPrice,
  price,
  onApply,
  resultCount,
  sizes = [],
  selectedSizes = [],
  colors = [],
  selectedColors = [],
  fabricTypes = [],
  selectedFabricTypes = [],
  categories = [],
  selectedCategories = [],
}) {
  const [pendingPrice, setPendingPrice] = useState(price)
  const [pendingSizes, setPendingSizes] = useState(selectedSizes)
  const [pendingColors, setPendingColors] = useState(selectedColors)
  const [pendingFabricTypes, setPendingFabricTypes] = useState(selectedFabricTypes)
  const [pendingCategories, setPendingCategories] = useState(selectedCategories)

  useEffect(() => {
    if (!open) return
    setPendingPrice(price)
    setPendingSizes(selectedSizes)
    setPendingColors(selectedColors)
    setPendingFabricTypes(selectedFabricTypes)
    setPendingCategories(selectedCategories)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleApply = () => {
    onApply({
      price: pendingPrice,
      sizes: pendingSizes,
      colors: pendingColors,
      fabricTypes: pendingFabricTypes,
      categories: pendingCategories,
    })
    onClose()
  }

  const handleClear = () => {
    setPendingPrice(maxPrice)
    setPendingSizes([])
    setPendingColors([])
    setPendingFabricTypes([])
    setPendingCategories([])
    onApply({ price: maxPrice, sizes: [], colors: [], fabricTypes: [], categories: [] })
    onClose()
  }

  // Best Sellers / New Arrivals are the only pages that pass `categories` —
  // they get the simpler, always-expanded Figma layout (no collapsible
  // sections, styled category rows, Clear/Apply labels) instead of the
  // richer per-category filter below.
  if (categories.length > 0) {
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
            <h3 className="mb-3 text-xs font-bold tracking-wide text-gray-900">PRICE</h3>
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
            <p className="mb-6 mt-2 text-xs text-gray-500">
              The highest price is Rs. {maxPrice.toLocaleString('en-IN')}
            </p>

            <h3 className="mb-3 text-xs font-bold tracking-wide text-gray-900">CATEGORIES</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center justify-between rounded-md bg-[#FAF8F5] px-3 py-2.5 text-sm text-gray-800"
                >
                  {cat}
                  <input
                    type="checkbox"
                    checked={pendingCategories.includes(cat)}
                    onChange={() => setPendingCategories((prev) => toggleInList(prev, cat))}
                    className="h-4 w-4 accent-[#013485]"
                  />
                </label>
              ))}
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

        <div className="flex-1 overflow-y-auto px-5">
          <Section title="PRICE" summary={pendingPrice < maxPrice ? pendingPrice.toLocaleString('en-IN') : null}>
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
              The highest price is Rs. {maxPrice.toLocaleString('en-IN')}
            </p>
          </Section>

          {sizes.length > 0 && (
            <Section title="SIZE" summary={pendingSizes.length ? pendingSizes.join(', ') : null}>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPendingSizes((prev) => toggleInList(prev, s))}
                    className={`rounded-md border px-2 py-2 text-sm font-medium ${
                      pendingSizes.includes(s)
                        ? 'border-[#013485] bg-[#013485] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {colors.length > 0 && (
            <Section title="COLOR" summary={pendingColors.length ? pendingColors.join(', ') : null}>
              <div className="flex flex-col gap-3">
                {colors.map((c) => (
                  <label key={c} className="flex items-center gap-2.5 text-sm text-gray-800">
                    <input
                      type="checkbox"
                      checked={pendingColors.includes(c)}
                      onChange={() => setPendingColors((prev) => toggleInList(prev, c))}
                      className="h-4 w-4 accent-[#013485]"
                    />
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-gray-300"
                      style={{ background: COLOR_SWATCHES[c] || '#cccccc' }}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </Section>
          )}

          {fabricTypes.length > 0 && (
            <Section title="FABRIC TYPE" summary={pendingFabricTypes.length ? pendingFabricTypes.join(', ') : null}>
              <div className="flex flex-col gap-2">
                {fabricTypes.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setPendingFabricTypes((prev) => toggleInList(prev, f))}
                    className={`rounded-md border px-3 py-2 text-center text-xs font-semibold tracking-wide ${
                      pendingFabricTypes.includes(f)
                        ? 'border-[#013485] bg-[#013485] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-900'
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {categories.length > 0 && (
            <Section title="CATEGORIES" summary={pendingCategories.length ? pendingCategories.join(', ') : null}>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center justify-between text-sm text-gray-800">
                    {cat}
                    <input
                      type="checkbox"
                      checked={pendingCategories.includes(cat)}
                      onChange={() => setPendingCategories((prev) => toggleInList(prev, cat))}
                      className="h-4 w-4 accent-[#013485]"
                    />
                  </label>
                ))}
              </div>
            </Section>
          )}
        </div>

        <div className="flex gap-3 border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 rounded-full bg-blue-50 py-2.5 text-xs font-bold tracking-wide text-[#013485] hover:bg-blue-100"
          >
            CLEAR ALL
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 rounded-full bg-[#013485] py-2.5 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b]"
          >
            SEE PRODUCTS{resultCount !== undefined ? ` (${resultCount})` : ''}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
