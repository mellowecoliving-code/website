import { bannerImage, menClothingProducts, menClothingSubTabs } from '../data/menClothingCollection'
import CollectionPage from './CollectionPage'

function MenClothingPage() {
  return (
    <CollectionPage
      title="Clothing"
      bannerImage={bannerImage}
      products={menClothingProducts}
      subTabs={menClothingSubTabs}
    />
  )
}

export default MenClothingPage
