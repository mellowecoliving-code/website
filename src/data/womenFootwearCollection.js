import bannerImage from '../assets/collections/women-footwear/footwear_banner.png'
import flats0 from '../assets/collections/women-footwear/flats_0.png'
import flats1 from '../assets/collections/women-footwear/flats_1.png'
import flats2 from '../assets/collections/women-footwear/flats_2.png'
import flats3 from '../assets/collections/women-footwear/flats_3.png'
import flats4 from '../assets/collections/women-footwear/flats_4.png'
import flats5 from '../assets/collections/women-footwear/flats_5.png'
import flats6 from '../assets/collections/women-footwear/flats_6.png'
import flats7 from '../assets/collections/women-footwear/flats_7.png'
import flats8 from '../assets/collections/women-footwear/flats_8.png'
import flats9 from '../assets/collections/women-footwear/flats_9.png'
import flats10 from '../assets/collections/women-footwear/flats_10.png'
import flats11 from '../assets/collections/women-footwear/flats_11.png'
import homewear0 from '../assets/collections/women-footwear/homewear_0.png'
import homewear1 from '../assets/collections/women-footwear/homewear_1.png'
import homewear2 from '../assets/collections/women-footwear/homewear_2.png'
import homewear3 from '../assets/collections/women-footwear/homewear_3.png'
import homewear4 from '../assets/collections/women-footwear/homewear_4.png'
import homewear5 from '../assets/collections/women-footwear/homewear_5.png'
import homewear6 from '../assets/collections/women-footwear/homewear_6.png'
import homewear7 from '../assets/collections/women-footwear/homewear_7.png'
import loafers0 from '../assets/collections/women-footwear/loafers_0.png'
import loafers1 from '../assets/collections/women-footwear/loafers_1.png'
import loafers2 from '../assets/collections/women-footwear/loafers_2.png'
import loafers3 from '../assets/collections/women-footwear/loafers_3.png'
import loafers4 from '../assets/collections/women-footwear/loafers_4.png'
import loafers5 from '../assets/collections/women-footwear/loafers_5.png'
import sandals0 from '../assets/collections/women-footwear/sandals_0.png'
import sandals1 from '../assets/collections/women-footwear/sandals_1.png'
import sandals2 from '../assets/collections/women-footwear/sandals_2.png'
import sandals3 from '../assets/collections/women-footwear/sandals_3.png'
import sandals4 from '../assets/collections/women-footwear/sandals_4.png'
import sandals5 from '../assets/collections/women-footwear/sandals_5.png'
import sandals6 from '../assets/collections/women-footwear/sandals_6.png'
import sandals7 from '../assets/collections/women-footwear/sandals_7.png'
import sandals8 from '../assets/collections/women-footwear/sandals_8.png'
import sandals9 from '../assets/collections/women-footwear/sandals_9.png'
import sneakers0 from '../assets/collections/women-footwear/sneakers_0.png'
import sneakers1 from '../assets/collections/women-footwear/sneakers_1.png'
import sneakers2 from '../assets/collections/women-footwear/sneakers_2.png'
import sneakers3 from '../assets/collections/women-footwear/sneakers_3.png'
import sneakers4 from '../assets/collections/women-footwear/sneakers_4.png'
import sneakers5 from '../assets/collections/women-footwear/sneakers_5.png'
import tabAll from '../assets/collections/women-footwear/tab_all.png'
import tabFlats from '../assets/collections/women-footwear/tab_flats.png'
import tabHomewear from '../assets/collections/women-footwear/tab_homewear.png'
import tabLoafers from '../assets/collections/women-footwear/tab_loafers.png'
import tabSandals from '../assets/collections/women-footwear/tab_sandals.png'
import tabSneakers from '../assets/collections/women-footwear/tab_sneakers.png'

export { bannerImage }

export const womenFootwearSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'flats', label: 'Flats', img: tabFlats },
  { id: 'sandals', label: 'Sandals', img: tabSandals },
  { id: 'loafers', label: 'Loafers', img: tabLoafers },
  { id: 'sneakers', label: 'sneakers', img: tabSneakers },
  { id: 'homewear', label: 'Home wear', img: tabHomewear },
]

function buildProducts(subTab, name, images) {
  return images.map((img, i) => ({
    id: `women-footwear-${subTab}-${i}`,
    name,
    price: '1,832',
    category: 'Women',
    subTab,
    img,
  }))
}

export const womenFootwearProducts = [
  ...buildProducts('flats', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [
    flats0, flats1, flats2, flats3, flats4, flats5, flats6, flats7, flats8, flats9, flats10, flats11,
  ]),
  ...buildProducts('sandals', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [
    sandals0, sandals1, sandals2, sandals3, sandals4, sandals5, sandals6, sandals7, sandals8, sandals9,
  ]),
  ...buildProducts('loafers', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [
    loafers0, loafers1, loafers2, loafers3, loafers4, loafers5,
  ]),
  ...buildProducts('sneakers', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [
    sneakers0, sneakers1, sneakers2, sneakers3, sneakers4, sneakers5,
  ]),
  ...buildProducts('homewear', 'Midnight Black Essential Stole Chiffon • Light weight Flow', [
    homewear0, homewear1, homewear2, homewear3, homewear4, homewear5, homewear6, homewear7,
  ]),
]
