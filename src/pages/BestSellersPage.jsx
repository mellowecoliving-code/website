import bannerImage from '../assets/collections/bestseller-page/banner_bestseller.png'
import { collectionProducts } from '../data/collectionCatalog'
import CollectionPage from './CollectionPage'

function BestSellersPage() {
  return <CollectionPage title="Bestseller" bannerImage={bannerImage} products={collectionProducts} />
}

export default BestSellersPage
