import l0 from '../assets/collections/women-nightwear/nw_long_0.png'
import l1 from '../assets/collections/women-nightwear/nw_long_1.png'
import l2 from '../assets/collections/women-nightwear/nw_long_2.png'
import l3 from '../assets/collections/women-nightwear/nw_long_3.png'
import l4 from '../assets/collections/women-nightwear/nw_long_4.png'
import l5 from '../assets/collections/women-nightwear/nw_long_5.png'
import s0 from '../assets/collections/women-nightwear/nw_short_0.png'
import s1 from '../assets/collections/women-nightwear/nw_short_1.png'
import s2 from '../assets/collections/women-nightwear/nw_short_2.png'
import s3 from '../assets/collections/women-nightwear/nw_short_3.png'
import s4 from '../assets/collections/women-nightwear/nw_short_4.png'
import s5 from '../assets/collections/women-nightwear/nw_short_5.png'
import s6 from '../assets/collections/women-nightwear/nw_short_6.png'
import s7 from '../assets/collections/women-nightwear/nw_short_7.png'
import tabAll from '../assets/collections/women-nightwear/nw_tab_all.png'
import tabLong from '../assets/collections/women-nightwear/nw_tab_long.png'
import tabShort from '../assets/collections/women-nightwear/nw_tab_short.png'

export const womenNightwearSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'short', label: 'Short', img: tabShort },
  { id: 'long', label: 'Long', img: tabLong },
]

function item(subTab, name, img) {
  return { id: `women-nightwear-${subTab}-${name}`, name, price: '1,832', category: 'Women', subTab, img }
}

export const womenNightwearProducts = [
  item('short', 'Mocha Linen Cami Set', s0),
  item('short', 'Floral Cotton Cami Set', s1),
  item('short', 'Sage Cami & Shorts Set', s2),
  item('short', 'Ivory Relaxed Lounge Set', s3),
  item('short', 'Sage Green Pajama Set', s4),
  item('short', 'Blush Floral Pajama Set', s5),
  item('short', 'Terracotta Printed Pajama Set', s6),
  item('short', 'Botanical Green Lounge Set', s7),
  item('long', 'Sage Embroidered Nightdress', l0),
  item('long', 'Cloud White Sleep Set', l1),
  item('long', 'Lavender Relaxed Nightdress', l2),
  item('long', 'Floral Comfort Pajama Set', l3),
  item('long', 'Natural Beige Lounge Set', l4),
  item('long', 'Ivory Relaxed Sleep Set', l5),
]
