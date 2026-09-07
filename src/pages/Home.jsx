import { useEffect, useState } from 'react'
import { getProducts } from '../api/products'
import CategoryGrid from '../components/CategoryGrid'
import Hero from '../components/Hero'
import HowItsMade from '../components/HowItsMade'
import HowItWorks from '../components/HowItWorks'
import Newsletter from '../components/Newsletter'
import ProductSection from '../components/ProductSection'
import Testimonials from '../components/Testimonials'
import WhyMellow from '../components/WhyMellow'
import { toCardProduct } from '../utils/mapProduct'

function useProductList(query) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let cancelled = false
    getProducts(query)
      .then((data) => {
        if (!cancelled) setProducts(data.products.map(toCardProduct))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return products
}

function Home({ onShopNewArrivals, onShopBestSellers }) {
  const bestSellers = useProductList({ isBestSeller: true, limit: 12 })
  const newArrivals = useProductList({ isNewArrival: true, limit: 12 })

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductSection
        id="best-sellers"
        title="BEST SELLERS"
        products={bestSellers}
        ctaLabel="SHOP BEST SELLERS"
        onCtaClick={onShopBestSellers}
      />
      <ProductSection
        id="new-arrivals"
        title="NEW ARRIVALS"
        products={newArrivals}
        ctaLabel="SHOP NEW ARRIVALS"
        onCtaClick={onShopNewArrivals}
      />
      <HowItWorks />
      <HowItsMade />
      <WhyMellow />
      <Testimonials />
      <Newsletter />
    </>
  )
}

export default Home
