import bannerImage from '../assets/collections/women-clothing/clothing_banner.png'
import tabAll from '../assets/collections/women-clothing/tab_all.png'
import tabEthnics from '../assets/collections/women-clothing/tab_ethnics.png'
import tabCoordSet from '../assets/collections/women-clothing/tab_coord-set.png'
import tabTunics from '../assets/collections/women-clothing/tab_tunics.png'
import tabPants from '../assets/collections/women-clothing/tab_pants.png'
import CollectionPage from './CollectionPage'

const SUB_TAB_IMAGES = { All: tabAll, Ethnics: tabEthnics, 'Co-ord set': tabCoordSet, Tunics: tabTunics, Pants: tabPants }

function WomenClothingPage() {
  return (
    <CollectionPage
      title="Clothing"
      bannerImage={bannerImage}
      query={{ category: 'Women', subcategory: 'Clothing' }}
      subTabImages={SUB_TAB_IMAGES}
    />
  )
}

export default WomenClothingPage
