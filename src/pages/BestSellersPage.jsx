import bannerImage from '../assets/collections/bestseller-page/banner_bestseller.png'
import CollectionPage from './CollectionPage'

function BestSellersPage() {
  return <CollectionPage title="Bestseller" bannerImage={bannerImage} query={{ isBestSeller: true }} />
}

export default BestSellersPage
