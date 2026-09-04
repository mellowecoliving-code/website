import b0 from '../assets/collections/women-innerwear/iw_bra_0.png'
import b1 from '../assets/collections/women-innerwear/iw_bra_1.png'
import b2 from '../assets/collections/women-innerwear/iw_bra_2.png'
import b3 from '../assets/collections/women-innerwear/iw_bra_3.png'
import b4 from '../assets/collections/women-innerwear/iw_bra_4.png'
import b5 from '../assets/collections/women-innerwear/iw_bra_5.png'
import p0 from '../assets/collections/women-innerwear/iw_panty_0.png'
import p1 from '../assets/collections/women-innerwear/iw_panty_1.png'
import p2 from '../assets/collections/women-innerwear/iw_panty_2.png'
import p3 from '../assets/collections/women-innerwear/iw_panty_3.png'
import p4 from '../assets/collections/women-innerwear/iw_panty_4.png'
import p5 from '../assets/collections/women-innerwear/iw_panty_5.png'
import pc0 from '../assets/collections/women-innerwear/iw_petticoats_0.png'
import pc1 from '../assets/collections/women-innerwear/iw_petticoats_1.png'
import pc2 from '../assets/collections/women-innerwear/iw_petticoats_2.png'
import pc3 from '../assets/collections/women-innerwear/iw_petticoats_3.png'
import pc4 from '../assets/collections/women-innerwear/iw_petticoats_4.png'
import tabAll from '../assets/collections/women-innerwear/iw_tab_all.png'
import tabBra from '../assets/collections/women-innerwear/iw_tab_bra.png'
import tabPanty from '../assets/collections/women-innerwear/iw_tab_panty.png'
import tabPetticoats from '../assets/collections/women-innerwear/iw_tab_petticoats.png'

export const womenInnerwearSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'bra', label: 'Bra', img: tabBra },
  { id: 'panty', label: 'Panty', img: tabPanty },
  { id: 'petticoats', label: 'Petticoats', img: tabPetticoats },
]

function item(subTab, name, img) {
  return { id: `women-innerwear-${subTab}-${name}`, name, price: '1,832', category: 'Women', subTab, img }
}

export const womenInnerwearProducts = [
  item('bra', 'Blush Cotton Everyday Bra', b0),
  item('bra', 'Nude Wireless Comfort Bra', b1),
  item('bra', 'Sage Green Triangle Bralette', b2),
  item('bra', 'Natural Linen Soft Bra', b3),
  item('bra', 'Cloud White Cotton Bralette', b4),
  item('bra', 'Terracotta Smocked Bralette', b5),
  item('panty', 'Everyday Cotton Boyshorts', p0),
  item('panty', 'Pastel Cotton Briefs Set', p1),
  item('panty', 'Essential Cotton Briefs', p2),
  item('panty', 'Blush Lace Brief', p3),
  item('panty', 'Soft Pink Cotton Brief', p4),
  item('panty', 'Pastel Everyday Briefs Set', p5),
  item('petticoats', 'Ivory Flared Cotton Petticoat', pc0),
  item('petticoats', 'Cream Full-Length Petticoat', pc1),
  item('petticoats', 'White Lace Cotton Petticoat', pc2),
  item('petticoats', 'Classic White Midi Petticoat', pc3),
  item('petticoats', 'Vintage Tiered Petticoat Skirt', pc4),
]
