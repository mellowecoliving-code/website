import { womenNightwearProducts, womenNightwearSubTabs } from '../data/womenNightwearCollection'
import CollectionPage from './CollectionPage'

function WomenNightwearPage() {
  return (
    <CollectionPage title="Nightwear" products={womenNightwearProducts} subTabs={womenNightwearSubTabs} />
  )
}

export default WomenNightwearPage
