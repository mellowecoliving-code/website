import { Link } from 'react-router-dom'
import ecoLiving from '../assets/categories/cat_eco-living.png'
import home from '../assets/categories/cat_home.png'
import kids from '../assets/categories/cat_kids.png'
import men from '../assets/categories/cat_men.png'
import women from '../assets/categories/cat_women.png'
import { resolveMediaUrl, useCmsContent, useCmsLoading } from '../hooks/useCmsContent'

const DEFAULT_IMAGES = { men, women, kids, home, 'eco-living': ecoLiving }
// Each tile's real landing page — mirrors the mega-menu's first linked
// subcategory per category (see client/src/data/megaMenu.js).
const CATEGORY_LINKS = {
  men: '/men/clothing',
  women: '/women/clothing',
  kids: '/kids/clothing',
  home: '/home',
  'eco-living': '/eco-living',
}
const DEFAULT_CATEGORIES = [
  { id: 'men', label: 'MEN' },
  { id: 'women', label: 'WOMEN' },
  { id: 'kids', label: 'KIDS' },
  { id: 'home', label: 'HOME' },
  { id: 'eco-living', label: 'ECO-LIVING' },
]

function CategoryGrid() {
  const cms = useCmsContent()
  const loading = useCmsLoading()
  const categories = cms.shopByCategory?.items?.length ? cms.shopByCategory.items : DEFAULT_CATEGORIES

  return (
    <section id="shop-by-category" className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-10 lg:px-10 lg:py-12">
      <h2 className="mb-6 text-xl font-bold text-gray-900 lg:text-2xl">SHOP BY CATEGORY</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={CATEGORY_LINKS[cat.id] || '#shop-by-category'}
            className="group flex flex-col items-center gap-3"
          >
            {loading ? (
              <div className="aspect-[262/378] w-full animate-pulse rounded-2xl bg-gray-200" />
            ) : (
              <img
                src={cat.imageUrl ? resolveMediaUrl(cat.imageUrl) : DEFAULT_IMAGES[cat.id]}
                alt={cat.label}
                className="aspect-[262/378] w-full rounded-2xl object-cover transition-opacity group-hover:opacity-90"
              />
            )}
            <span className="text-xs font-bold tracking-wide text-gray-900 lg:text-sm">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryGrid
