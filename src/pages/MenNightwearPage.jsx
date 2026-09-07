import bannerImage from '../assets/collections/men-nightwear/nightwear_banner.png'
import CollectionPage from './CollectionPage'

function MenNightwearPage() {
  return <CollectionPage title="Nightwear" bannerImage={bannerImage} query={{ category: 'Men', subcategory: 'Nightwear' }} />
}

export default MenNightwearPage
