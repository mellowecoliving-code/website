import { kidsClothingProducts, kidsClothingSubTabs } from '../data/kidsClothingCollection'
import CollectionPage from './CollectionPage'

function KidsClothingPage() {
  return (
    <CollectionPage title="Clothing" products={kidsClothingProducts} subTabs={kidsClothingSubTabs} />
  )
}

export default KidsClothingPage
