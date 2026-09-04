import { womenBagsProducts, womenBagsSubTabs } from '../data/womenBagsCollection'
import CollectionPage from './CollectionPage'

function WomenBagsPage() {
  return <CollectionPage title="Bags" products={womenBagsProducts} subTabs={womenBagsSubTabs} />
}

export default WomenBagsPage
