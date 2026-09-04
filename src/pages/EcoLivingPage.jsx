import { ecoLivingProducts } from '../data/ecoLivingCollection'
import CollectionPage from './CollectionPage'

function EcoLivingPage() {
  return <CollectionPage title="Eco Living" products={ecoLivingProducts} />
}

export default EcoLivingPage
