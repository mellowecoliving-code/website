import b0 from '../assets/collections/kids-nightwear/kn_boy_0.png'
import b1 from '../assets/collections/kids-nightwear/kn_boy_1.png'
import b2 from '../assets/collections/kids-nightwear/kn_boy_2.png'
import b3 from '../assets/collections/kids-nightwear/kn_boy_3.png'
import b4 from '../assets/collections/kids-nightwear/kn_boy_4.png'
import b5 from '../assets/collections/kids-nightwear/kn_boy_5.png'
import b6 from '../assets/collections/kids-nightwear/kn_boy_6.png'
import b7 from '../assets/collections/kids-nightwear/kn_boy_7.png'
import g0 from '../assets/collections/kids-nightwear/kn_girl_0.png'
import g1 from '../assets/collections/kids-nightwear/kn_girl_1.png'
import g2 from '../assets/collections/kids-nightwear/kn_girl_2.png'
import g3 from '../assets/collections/kids-nightwear/kn_girl_3.png'
import g4 from '../assets/collections/kids-nightwear/kn_girl_4.png'
import g5 from '../assets/collections/kids-nightwear/kn_girl_5.png'
import g6 from '../assets/collections/kids-nightwear/kn_girl_6.png'
import g7 from '../assets/collections/kids-nightwear/kn_girl_7.png'
import g8 from '../assets/collections/kids-nightwear/kn_girl_8.png'
import tabAll from '../assets/collections/kids-nightwear/kn_tab_all.png'
import tabBoys from '../assets/collections/kids-nightwear/kn_tab_boys.png'
import tabGirls from '../assets/collections/kids-nightwear/kn_tab_girls.png'

export const kidsNightwearSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'boys', label: 'Boys', img: tabBoys },
  { id: 'girls', label: 'girls', img: tabGirls },
]

function item(subTab, name, img) {
  return { id: `kids-nightwear-${subTab}-${name}`, name, price: '1,832', category: 'Kids', subTab, img }
}

export const kidsNightwearProducts = [
  item('boys', 'Blue Check Cotton Pajama Set', b0),
  item('boys', 'Navy Check Sleep Set', b1),
  item('boys', 'Sky Blue Stripe Pajama Set', b2),
  item('boys', 'Powder Blue Cotton Sleep Set', b3),
  item('boys', 'Sky Blue Short Pajama Set', b4),
  item('boys', 'Blue Printed Pajama Set', b5),
  item('boys', 'Natural Cotton Romper Set', b6),
  item('boys', 'Teal Check Pajama Set', b7),
  item('girls', 'Ivory Cotton Pajama Set', g0),
  item('girls', 'White Ruffle Nightdress', g1),
  item('girls', 'Cream Ribbed Sleep Set', g2),
  item('girls', 'Rust Floral Pajama Set', g3),
  item('girls', 'Peach Button Sleep Set', g4),
  item('girls', 'Lilac Relaxed Nightdress', g5),
  item('girls', 'White Cotton Nightdress', g6),
  item('girls', 'Pastel Floral Sleep Dress', g7),
  item('girls', 'Ivory Embroidered Nightdress', g8),
]
