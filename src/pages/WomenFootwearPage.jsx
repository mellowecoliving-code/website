import bannerImage from '../assets/collections/women-footwear/footwear_banner.png'
import tabAll from '../assets/collections/women-footwear/tab_all.png'
import tabFlats from '../assets/collections/women-footwear/tab_flats.png'
import tabSandals from '../assets/collections/women-footwear/tab_sandals.png'
import tabLoafers from '../assets/collections/women-footwear/tab_loafers.png'
import tabSneakers from '../assets/collections/women-footwear/tab_sneakers.png'
import CollectionPage from './CollectionPage'

const SUB_TAB_IMAGES = { All: tabAll, Flats: tabFlats, Sandals: tabSandals, Loafers: tabLoafers, Sneakers: tabSneakers }

function WomenFootwearPage() {
  return (
    <CollectionPage
      title="Footwear"
      bannerImage={bannerImage}
      query={{ category: 'Women', subcategory: 'Footwear' }}
      subTabImages={SUB_TAB_IMAGES}
    />
  )
}

export default WomenFootwearPage
