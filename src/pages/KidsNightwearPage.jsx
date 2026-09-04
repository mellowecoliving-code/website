import { kidsNightwearProducts, kidsNightwearSubTabs } from '../data/kidsNightwearCollection'
import CollectionPage from './CollectionPage'

function KidsNightwearPage() {
  return (
    <CollectionPage title="Nightwear" products={kidsNightwearProducts} subTabs={kidsNightwearSubTabs} />
  )
}

export default KidsNightwearPage
