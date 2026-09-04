import b0 from '../assets/collections/men-innerwear/boxer_0.png'
import b1 from '../assets/collections/men-innerwear/boxer_1.png'
import b2 from '../assets/collections/men-innerwear/boxer_2.png'
import b3 from '../assets/collections/men-innerwear/boxer_3.png'
import br0 from '../assets/collections/men-innerwear/brief_0.png'
import br1 from '../assets/collections/men-innerwear/brief_1.png'
import br2 from '../assets/collections/men-innerwear/brief_2.png'
import bannerImage from '../assets/collections/men-innerwear/innerwear_banner.png'
import tabAll from '../assets/collections/men-innerwear/tab_all.png'
import tabBoxer from '../assets/collections/men-innerwear/tab_boxer.png'
import tabBrief from '../assets/collections/men-innerwear/tab_brief.png'
import tabVest from '../assets/collections/men-innerwear/tab_vest.png'
import v0 from '../assets/collections/men-innerwear/vest_0.png'
import v1 from '../assets/collections/men-innerwear/vest_1.png'
import v2 from '../assets/collections/men-innerwear/vest_2.png'

export { bannerImage }

export const menInnerwearSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'boxer', label: 'Boxer', img: tabBoxer },
  { id: 'brief', label: 'Brief', img: tabBrief },
  { id: 'vest', label: 'Vest', img: tabVest },
]

function buildProducts(subTab, name, images) {
  return images.map((img, i) => ({
    id: `men-innerwear-${subTab}-${i}`,
    name,
    price: '1,832',
    category: 'Men',
    subTab,
    img,
  }))
}

export const menInnerwearProducts = [
  ...buildProducts('boxer', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [b0, b1, b2, b3]),
  ...buildProducts('brief', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [br0, br1, br2]),
  ...buildProducts('vest', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [v0, v1, v2]),
]
