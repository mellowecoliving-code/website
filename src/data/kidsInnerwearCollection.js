import b0 from '../assets/collections/kids-innerwear/iw_boy_0.png'
import b1 from '../assets/collections/kids-innerwear/iw_boy_1.png'
import g0 from '../assets/collections/kids-innerwear/iw_girl_0.png'
import g1 from '../assets/collections/kids-innerwear/iw_girl_1.png'
import g2 from '../assets/collections/kids-innerwear/iw_girl_2.png'
import g3 from '../assets/collections/kids-innerwear/iw_girl_3.png'
import tabAll from '../assets/collections/kids-innerwear/iw_tab_all.png'
import tabBoys from '../assets/collections/kids-innerwear/iw_tab_boys.png'
import tabGirls from '../assets/collections/kids-innerwear/iw_tab_girls.png'

export const kidsInnerwearSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'boys', label: 'Boys', img: tabBoys },
  { id: 'girls', label: 'girls', img: tabGirls },
]

function item(subTab, name, img) {
  return { id: `kids-innerwear-${subTab}-${name}`, name, price: '1,832', category: 'Kids', subTab, img }
}

export const kidsInnerwearProducts = [
  item('boys', 'Essential Cotton Briefs Set', b0),
  item('boys', 'Blue Stripe Boxer Briefs Set', b1),
  item('girls', 'Pastel Cotton Cami Set', g0),
  item('girls', 'Pastel Everyday Briefs Set', g1),
  item('girls', 'Polka Dot Cotton Briefs', g2),
  item('girls', 'Floral Cotton Briefs Set', g3),
]
