import bannerImage from '../assets/collections/men-clothing/clothing_banner.png'
import tabAll from '../assets/collections/men-clothing/tab_all.png'
import tabShirts from '../assets/collections/men-clothing/tab_shirts.png'
import tabTrousers from '../assets/collections/men-clothing/tab_trousers.png'
import tabCoords from '../assets/collections/men-clothing/tab_coords.png'
import CollectionPage from './CollectionPage'

const SUB_TAB_IMAGES = { All: tabAll, Shirts: tabShirts, Trousers: tabTrousers, 'Co-ords': tabCoords }

function MenClothingPage() {
  return (
    <CollectionPage
      title="Clothing"
      bannerImage={bannerImage}
      query={{ category: 'Men', subcategory: 'Clothing' }}
      subTabImages={SUB_TAB_IMAGES}
    />
  )
}

export default MenClothingPage
