import { bannerImage, menInnerwearProducts, menInnerwearSubTabs } from '../data/menInnerwearCollection'
import CollectionPage from './CollectionPage'

function MenInnerwearPage() {
  return (
    <CollectionPage
      title="Innerwear"
      bannerImage={bannerImage}
      products={menInnerwearProducts}
      subTabs={menInnerwearSubTabs}
    />
  )
}

export default MenInnerwearPage
