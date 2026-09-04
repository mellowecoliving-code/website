import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import FilterPanel from '../components/FilterPanel'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import SubTabs from '../components/SubTabs'
import { CATEGORY_OPTIONS } from '../data/collectionCatalog'

const PAGE_SIZE = 12

function CollectionPage({ title, bannerImage, products, subTabs }) {
  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => Number(p.price.replace(/,/g, '')))),
    [products],
  )

  const [filterOpen, setFilterOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [price, setPrice] = useState(maxPrice)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [activeSubTab, setActiveSubTab] = useState(subTabs?.[0]?.id)

  const hasTaggedSubTabs = subTabs && products.some((p) => p.subTab)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const numericPrice = Number(p.price.replace(/,/g, ''))
      const withinPrice = numericPrice <= price
      const withinCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category)
      const withinSubTab =
        !hasTaggedSubTabs || activeSubTab === 'all' || !activeSubTab || p.subTab === activeSubTab
      return withinPrice && withinCategory && withinSubTab
    })
  }, [products, price, selectedCategories, activeSubTab, hasTaggedSubTabs])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleApplyFilters = ({ price: newPrice, categories }) => {
    setPrice(newPrice)
    setSelectedCategories(categories)
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

      {subTabs && (
        <SubTabs
          tabs={subTabs}
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

        {pageItems.length === 0 ? (
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
        categories={CATEGORY_OPTIONS}
        price={price}
        selectedCategories={selectedCategories}
        onApply={handleApplyFilters}
      />
    </div>
  )
}

export default CollectionPage
