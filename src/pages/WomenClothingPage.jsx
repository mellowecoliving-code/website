import { bannerImage, womenClothingProducts, womenClothingSubTabs } from '../data/womenClothingCollection'
import CollectionPage from './CollectionPage'

function WomenClothingPage() {
  return (
    <CollectionPage
      title="Clothing"
      bannerImage={bannerImage}
      products={womenClothingProducts}
      subTabs={womenClothingSubTabs}
    />
  )
}

export default WomenClothingPage
