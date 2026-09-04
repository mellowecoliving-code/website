import CategoryGrid from '../components/CategoryGrid'
import Hero from '../components/Hero'
import HowItsMade from '../components/HowItsMade'
import HowItWorks from '../components/HowItWorks'
import Newsletter from '../components/Newsletter'
import ProductSection from '../components/ProductSection'
import Testimonials from '../components/Testimonials'
import WhyMellow from '../components/WhyMellow'
import { bestSellers, newArrivals } from '../data/products'

function Home({ onShopNewArrivals, onShopBestSellers }) {
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
