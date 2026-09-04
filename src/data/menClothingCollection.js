import bannerImage from '../assets/collections/men-clothing/clothing_banner.png'
import c0 from '../assets/collections/men-clothing/coords_0.png'
import c1 from '../assets/collections/men-clothing/coords_1.png'
import c2 from '../assets/collections/men-clothing/coords_2.png'
import c3 from '../assets/collections/men-clothing/coords_3.png'
import c4 from '../assets/collections/men-clothing/coords_4.png'
import c5 from '../assets/collections/men-clothing/coords_5.png'
import c6 from '../assets/collections/men-clothing/coords_6.png'
import c7 from '../assets/collections/men-clothing/coords_7.png'
import s0 from '../assets/collections/men-clothing/shirts_0.png'
import s1 from '../assets/collections/men-clothing/shirts_1.png'
import s2 from '../assets/collections/men-clothing/shirts_2.png'
import s3 from '../assets/collections/men-clothing/shirts_3.png'
import s4 from '../assets/collections/men-clothing/shirts_4.png'
import s5 from '../assets/collections/men-clothing/shirts_5.png'
import s6 from '../assets/collections/men-clothing/shirts_6.png'
import s7 from '../assets/collections/men-clothing/shirts_7.png'
import s8 from '../assets/collections/men-clothing/shirts_8.png'
import tabAll from '../assets/collections/men-clothing/tab_all.png'
import tabCoords from '../assets/collections/men-clothing/tab_coords.png'
import tabShirts from '../assets/collections/men-clothing/tab_shirts.png'
import tabTrousers from '../assets/collections/men-clothing/tab_trousers.png'
import t0 from '../assets/collections/men-clothing/trousers_0.png'
import t1 from '../assets/collections/men-clothing/trousers_1.png'
import t2 from '../assets/collections/men-clothing/trousers_2.png'
import t3 from '../assets/collections/men-clothing/trousers_3.png'
import t4 from '../assets/collections/men-clothing/trousers_4.png'
import t5 from '../assets/collections/men-clothing/trousers_5.png'
import t6 from '../assets/collections/men-clothing/trousers_6.png'
import t7 from '../assets/collections/men-clothing/trousers_7.png'

export { bannerImage }

export const menClothingSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'shirts', label: 'Shirts', img: tabShirts },
  { id: 'trousers', label: 'Trousers', img: tabTrousers },
  { id: 'coords', label: 'Co-ords', img: tabCoords },
]

function buildProducts(subTab, name, images) {
  return images.map((img, i) => ({
    id: `men-clothing-${subTab}-${i}`,
    name,
    price: '1,832',
    category: 'Men',
    subTab,
    img,
  }))
}

export const menClothingProducts = [
  ...buildProducts('shirts', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [
    s0, s1, s2, s3, s4, s5, s6, s7, s8,
  ]),
  ...buildProducts('trousers', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [
    t0, t1, t2, t3, t4, t5, t6, t7,
  ]),
  ...buildProducts('coords', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [
    c0, c1, c2, c3, c4, c5, c6, c7,
  ]),
]
