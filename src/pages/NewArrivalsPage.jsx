import bannerImage from '../assets/collections/new-arrivals-page/banner_new_arrivals.png'
import CollectionPage from './CollectionPage'

function NewArrivalsPage() {
  return <CollectionPage title="New Arrivals" bannerImage={bannerImage} query={{ isNewArrival: true }} />
}

export default NewArrivalsPage
