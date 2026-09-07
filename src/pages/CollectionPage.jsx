import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api/products'
import FilterPanel from '../components/FilterPanel'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import SubTabs from '../components/SubTabs'
import { SUBTABS_BY_SUBCATEGORY } from '../data/productTaxonomy'
import { toCardProduct } from '../utils/mapProduct'

const PAGE_SIZE = 12
const CATEGORY_OPTIONS = ['Men', 'Women', 'Kids', 'Home', 'Eco-Living']

// Best Sellers / New Arrivals span every category, so they keep the
// original simple filter (price + category). A single-category page
// (Women/Clothing etc.) gets the richer one confirmed from Figma —
// price/size/color/fabric type — plus sub-tabs when a tab list is known
// for that category/subcategory pair.
function CollectionPage({ title, bannerImage, query, subTabImages }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const isSingleCategory = Boolean(query.category)
  const subTabLabels = SUBTABS_BY_SUBCATEGORY[query.category]?.[query.subcategory] || []

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getProducts({ ...query, limit: 100 })
      .then((data) => {
        if (!cancelled) setProducts(data.products.map(toCardProduct))
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(query)])

  const maxPrice = useMemo(() => (products.length ? Math.max(...products.map((p) => p.price)) : 0), [products])
  const availableSizes = useMemo(
    () => (isSingleCategory ? [...new Set(products.flatMap((p) => p.variants.map((v) => v.size)).filter(Boolean))] : []),
    [products, isSingleCategory],
  )
  const availableColors = useMemo(
    () => (isSingleCategory ? [...new Set(products.flatMap((p) => p.variants.map((v) => v.color)).filter(Boolean))] : []),
    [products, isSingleCategory],
  )
  const availableFabricTypes = useMemo(
    () => (isSingleCategory ? [...new Set(products.map((p) => p.fabricType).filter(Boolean))] : []),
    [products, isSingleCategory],
  )

  const [filterOpen, setFilterOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [activeSubTab, setActiveSubTab] = useState(subTabLabels[0])
  const [price, setPrice] = useState(null)
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [fabricTypes, setFabricTypes] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const effectivePrice = price ?? maxPrice

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const withinPrice = p.price <= effectivePrice
      const withinCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category)
      const withinSubTab = !activeSubTab || activeSubTab === 'All' || p.subTab === activeSubTab
      const withinSize = sizes.length === 0 || p.variants.some((v) => sizes.includes(v.size))
      const withinColor = colors.length === 0 || p.variants.some((v) => colors.includes(v.color))
      const withinFabric = fabricTypes.length === 0 || fabricTypes.includes(p.fabricType)
      return withinPrice && withinCategory && withinSubTab && withinSize && withinColor && withinFabric
    })
  }, [products, effectivePrice, selectedCategories, activeSubTab, sizes, colors, fabricTypes])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleApplyFilters = (next) => {
    setPrice(next.price)
    setSizes(next.sizes)
    setColors(next.colors)
    setFabricTypes(next.fabricTypes)
    setSelectedCategories(next.categories)
    setPage(1)
  }

  return (
    <div>
      {bannerImage ? (
        <section className="relative flex h-[280px] items-center justify-center overflow-hidden lg:h-[370px]">
          <img src={bannerImage} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        </section>
      ) : (
        <div className="mx-auto max-w-[1440px] px-4 pt-8 lg:px-10">
          <h1 className="text-xl font-bold text-[#0F1E3D] lg:text-2xl">{title}</h1>
        </div>
      )}

      {subTabLabels.length > 0 && subTabImages && (
        <SubTabs
          tabs={subTabLabels.map((label) => ({ id: label, label, img: subTabImages[label] }))}
          activeId={activeSubTab}
          onSelect={(id) => {
            setActiveSubTab(id)
            setPage(1)
          }}
        />
      )}

      <div className="mx-auto max-w-[1440px] px-4 py-8 lg:px-10">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-xs font-bold tracking-wide text-gray-900 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            FILTER
          </button>
          <p className="text-sm text-gray-500">{filtered.length} Items</p>
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-gray-500">Loading...</p>
        ) : pageItems.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-500">No products match these filters.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {pageItems.map((product) => (
              <ProductCard key={product.id} {...product} fluid />
            ))}
          </div>
        )}

        <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
      </div>

      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        maxPrice={maxPrice}
        price={effectivePrice}
        resultCount={filtered.length}
        sizes={availableSizes}
        selectedSizes={sizes}
        colors={availableColors}
        selectedColors={colors}
        fabricTypes={availableFabricTypes}
        selectedFabricTypes={fabricTypes}
        categories={isSingleCategory ? [] : CATEGORY_OPTIONS}
        selectedCategories={selectedCategories}
        onApply={handleApplyFilters}
      />
    </div>
  )
}

export default CollectionPage
