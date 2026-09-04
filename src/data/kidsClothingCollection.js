import b0 from '../assets/collections/kids-clothing/kc_boys_0.png'
import b1 from '../assets/collections/kids-clothing/kc_boys_1.png'
import b2 from '../assets/collections/kids-clothing/kc_boys_2.png'
import b3 from '../assets/collections/kids-clothing/kc_boys_3.png'
import b4 from '../assets/collections/kids-clothing/kc_boys_4.png'
import b5 from '../assets/collections/kids-clothing/kc_boys_5.png'
import b6 from '../assets/collections/kids-clothing/kc_boys_6.png'
import b7 from '../assets/collections/kids-clothing/kc_boys_7.png'
import g0 from '../assets/collections/kids-clothing/kc_girls_0.png'
import g1 from '../assets/collections/kids-clothing/kc_girls_1.png'
import g2 from '../assets/collections/kids-clothing/kc_girls_2.png'
import g3 from '../assets/collections/kids-clothing/kc_girls_3.png'
import g4 from '../assets/collections/kids-clothing/kc_girls_4.png'
import g5 from '../assets/collections/kids-clothing/kc_girls_5.png'
import g6 from '../assets/collections/kids-clothing/kc_girls_6.png'
import g7 from '../assets/collections/kids-clothing/kc_girls_7.png'
import tabAll from '../assets/collections/kids-clothing/kc_tab_all.png'
import tabBoys from '../assets/collections/kids-clothing/kc_tab_boys.png'
import tabGirls from '../assets/collections/kids-clothing/kc_tab_girls.png'

export const kidsClothingSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'boys', label: 'Boys', img: tabBoys },
  { id: 'girls', label: 'girls', img: tabGirls },
]

function item(subTab, name, img) {
  return { id: `kids-clothing-${subTab}-${name}`, name, price: '1,832', category: 'Kids', subTab, img }
}

export const kidsClothingProducts = [
  item('boys', 'White Linen Summer Set', b0),
  item('boys', 'Natural Printed Play Set', b1),
  item('boys', 'Ivory Button Summer Set', b2),
  item('boys', 'Sage Stripe Linen Set', b3),
  item('boys', 'Charcoal & Mint Casual Set', b4),
  item('boys', 'Rust & Cream Summer Set', b5),
  item('boys', 'Denim Blue Linen Set', b6),
  item('boys', 'Sage Mini Co-ord Set', b7),
  item('girls', "Natural Linen Girl's Set", g0),
  item('girls', 'Sage Ruffle Dress', g1),
  item('girls', 'Mocha & Sky Play Set', g2),
  item('girls', 'Ivory Summer Co-ord', g3),
  item('girls', 'Blush Cotton Dress', g4),
  item('girls', 'Sage Green Party Dress', g5),
  item('girls', 'Olive Linen Co-ord', g6),
  item('girls', 'Ivory & Mocha Casual Set', g7),
]
