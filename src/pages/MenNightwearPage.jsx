import { bannerImage, menNightwearProducts } from '../data/menNightwearCollection'
import CollectionPage from './CollectionPage'

function MenNightwearPage() {
  return <CollectionPage title="Nightwear" bannerImage={bannerImage} products={menNightwearProducts} />
}

export default MenNightwearPage
