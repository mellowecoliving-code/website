import bannerImage from '../assets/collections/new-arrivals-page/banner_new_arrivals.png'
import { collectionProducts } from '../data/collectionCatalog'
import CollectionPage from './CollectionPage'

function NewArrivalsPage() {
  return <CollectionPage title="New Arrivals" bannerImage={bannerImage} products={collectionProducts} />
}

export default NewArrivalsPage
