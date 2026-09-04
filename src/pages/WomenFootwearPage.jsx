import { bannerImage, womenFootwearProducts, womenFootwearSubTabs } from '../data/womenFootwearCollection'
import CollectionPage from './CollectionPage'

function WomenFootwearPage() {
  return (
    <CollectionPage
      title="Footwear"
      bannerImage={bannerImage}
      products={womenFootwearProducts}
      subTabs={womenFootwearSubTabs}
    />
  )
}

export default WomenFootwearPage
