import bannerImage from '../assets/collections/men-innerwear/innerwear_banner.png'
import tabAll from '../assets/collections/men-innerwear/tab_all.png'
import tabBoxer from '../assets/collections/men-innerwear/tab_boxer.png'
import tabBrief from '../assets/collections/men-innerwear/tab_brief.png'
import tabVest from '../assets/collections/men-innerwear/tab_vest.png'
import CollectionPage from './CollectionPage'

const SUB_TAB_IMAGES = { All: tabAll, Boxer: tabBoxer, Brief: tabBrief, Vest: tabVest }

function MenInnerwearPage() {
  return (
    <CollectionPage
      title="Innerwear"
      bannerImage={bannerImage}
      query={{ category: 'Men', subcategory: 'Innerwear' }}
      subTabImages={SUB_TAB_IMAGES}
    />
  )
}

export default MenInnerwearPage
