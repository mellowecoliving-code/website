import { kidsInnerwearProducts, kidsInnerwearSubTabs } from '../data/kidsInnerwearCollection'
import CollectionPage from './CollectionPage'

function KidsInnerwearPage() {
  return (
    <CollectionPage title="Innerwear" products={kidsInnerwearProducts} subTabs={kidsInnerwearSubTabs} />
  )
}

export default KidsInnerwearPage
