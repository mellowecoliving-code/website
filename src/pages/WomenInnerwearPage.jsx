import { womenInnerwearProducts, womenInnerwearSubTabs } from '../data/womenInnerwearCollection'
import CollectionPage from './CollectionPage'

function WomenInnerwearPage() {
  return (
    <CollectionPage title="Innerwear" products={womenInnerwearProducts} subTabs={womenInnerwearSubTabs} />
  )
}

export default WomenInnerwearPage
