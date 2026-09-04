import bannerImage from '../assets/collections/women-clothing/clothing_banner.png'
import p00 from '../assets/collections/women-clothing/p00.png'
import p01 from '../assets/collections/women-clothing/p01.png'
import p02 from '../assets/collections/women-clothing/p02.png'
import p03 from '../assets/collections/women-clothing/p03.png'
import p10 from '../assets/collections/women-clothing/p10.png'
import p11 from '../assets/collections/women-clothing/p11.png'
import p12 from '../assets/collections/women-clothing/p12.png'
import p13 from '../assets/collections/women-clothing/p13.png'
import p20 from '../assets/collections/women-clothing/p20.png'
import p21 from '../assets/collections/women-clothing/p21.png'
import p22 from '../assets/collections/women-clothing/p22.png'
import p23 from '../assets/collections/women-clothing/p23.png'
import p30 from '../assets/collections/women-clothing/p30.png'
import p31 from '../assets/collections/women-clothing/p31.png'
import p32 from '../assets/collections/women-clothing/p32.png'
import p33 from '../assets/collections/women-clothing/p33.png'
import tabAll from '../assets/collections/women-clothing/tab_all.png'
import tabCoordSet from '../assets/collections/women-clothing/tab_coord-set.png'
import tabEthnics from '../assets/collections/women-clothing/tab_ethnics.png'
import tabPants from '../assets/collections/women-clothing/tab_pants.png'
import tabTunics from '../assets/collections/women-clothing/tab_tunics.png'

export { bannerImage }

export const womenClothingSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'ethnics', label: 'Ethnics', img: tabEthnics },
  { id: 'coord-set', label: 'Co-ord set', img: tabCoordSet },
  { id: 'tunics', label: 'Tunics', img: tabTunics },
  { id: 'pants', label: 'Pants', img: tabPants },
]

export const womenClothingProducts = [
  p00, p01, p02, p03, p10, p11, p12, p13, p20, p21, p22, p23, p30, p31, p32, p33,
].map((img, i) => ({
  id: `women-clothing-${i}`,
  name: 'Midnight Black Essential Stole Chiffon • Light weight Flow',
  price: '1,832',
  category: 'Women',
  img,
}))
