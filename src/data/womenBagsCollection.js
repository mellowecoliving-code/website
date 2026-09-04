import c0 from '../assets/collections/women-bags/bg_clutchbag_0.png'
import c1 from '../assets/collections/women-bags/bg_clutchbag_1.png'
import c2 from '../assets/collections/women-bags/bg_clutchbag_2.png'
import c3 from '../assets/collections/women-bags/bg_clutchbag_3.png'
import c4 from '../assets/collections/women-bags/bg_clutchbag_4.png'
import c5 from '../assets/collections/women-bags/bg_clutchbag_5.png'
import c6 from '../assets/collections/women-bags/bg_clutchbag_6.png'
import c7 from '../assets/collections/women-bags/bg_clutchbag_7.png'
import h0 from '../assets/collections/women-bags/bg_handbag_0.png'
import h1 from '../assets/collections/women-bags/bg_handbag_1.png'
import h2 from '../assets/collections/women-bags/bg_handbag_2.png'
import h3 from '../assets/collections/women-bags/bg_handbag_3.png'
import h4 from '../assets/collections/women-bags/bg_handbag_4.png'
import h5 from '../assets/collections/women-bags/bg_handbag_5.png'
import h6 from '../assets/collections/women-bags/bg_handbag_6.png'
import h7 from '../assets/collections/women-bags/bg_handbag_7.png'
import sh0 from '../assets/collections/women-bags/bg_shoulderbag_0.png'
import sh1 from '../assets/collections/women-bags/bg_shoulderbag_1.png'
import sh2 from '../assets/collections/women-bags/bg_shoulderbag_2.png'
import sh3 from '../assets/collections/women-bags/bg_shoulderbag_3.png'
import sh4 from '../assets/collections/women-bags/bg_shoulderbag_4.png'
import sh5 from '../assets/collections/women-bags/bg_shoulderbag_5.png'
import sh6 from '../assets/collections/women-bags/bg_shoulderbag_6.png'
import sh7 from '../assets/collections/women-bags/bg_shoulderbag_7.png'
import sl0 from '../assets/collections/women-bags/bg_slingbag_0.png'
import sl1 from '../assets/collections/women-bags/bg_slingbag_1.png'
import sl2 from '../assets/collections/women-bags/bg_slingbag_2.png'
import sl3 from '../assets/collections/women-bags/bg_slingbag_3.png'
import sl4 from '../assets/collections/women-bags/bg_slingbag_4.png'
import sl5 from '../assets/collections/women-bags/bg_slingbag_5.png'
import sl6 from '../assets/collections/women-bags/bg_slingbag_6.png'
import sl7 from '../assets/collections/women-bags/bg_slingbag_7.png'
import tabAll from '../assets/collections/women-bags/bg_tab_all.png'
import tabClutchbag from '../assets/collections/women-bags/bg_tab_clutchbag.png'
import tabHandbag from '../assets/collections/women-bags/bg_tab_handbag.png'
import tabShoulderbag from '../assets/collections/women-bags/bg_tab_shoulderbag.png'
import tabSlingbag from '../assets/collections/women-bags/bg_tab_slingbag.png'

export const womenBagsSubTabs = [
  { id: 'all', label: 'All', img: tabAll },
  { id: 'handbag', label: 'Hand Bag', img: tabHandbag },
  { id: 'slingbag', label: 'Sling Bag', img: tabSlingbag },
  { id: 'shoulderbag', label: 'Sholder Bag', img: tabShoulderbag },
  { id: 'clutchbag', label: 'Clutch Bag', img: tabClutchbag },
]

function item(subTab, name, img) {
  return { id: `women-bags-${subTab}-${name}`, name, price: '1,832', category: 'Women', subTab, img }
}

export const womenBagsProducts = [
  item('handbag', 'Natural Canvas Everyday Tote', h0),
  item('handbag', 'Ivory & Green Market Tote', h1),
  item('handbag', 'Woven Everyday Tote', h2),
  item('handbag', 'Natural Cotton Garden Tote', h3),
  item('handbag', 'Natural Jute Shopper Bag', h4),
  item('handbag', 'Organic Cotton Utility Tote', h5),
  item('handbag', 'Forest Green Canvas Tote', h6),
  item('handbag', 'Natural Linen Carryall', h7),
  item('slingbag', 'Natural Woven Bucket Sling', sl0),
  item('slingbag', 'Camel Mini Crossbody Bag', sl1),
  item('slingbag', 'Ivory Soft Leather Sling', sl2),
  item('slingbag', 'Cream Crescent Sling Bag', sl3),
  item('slingbag', 'Natural Woven Flap Sling', sl4),
  item('slingbag', 'Beige Minimal Crossbody', sl5),
  item('slingbag', 'Rust Printed Sling Bag', sl6),
  item('slingbag', 'Mauve Round Crossbody Bag', sl7),
  item('shoulderbag', 'Ivory Structured Tote Bag', sh0),
  item('shoulderbag', 'Khaki Utility Tote', sh1),
  item('shoulderbag', 'Natural Canvas Shoulder Bag', sh2),
  item('shoulderbag', 'Cream Everyday Tote', sh3),
  item('shoulderbag', 'Natural Cotton Carryall', sh4),
  item('shoulderbag', 'Natural Woven Shoulder Bag', sh5),
  item('shoulderbag', 'Ivory Minimal Shoulder Bag', sh6),
  item('shoulderbag', 'Natural Rope Mini Bag', sh7),
  item('clutchbag', 'Natural Woven Chain Clutch', c0),
  item('clutchbag', 'Blush Pleated Clutch', c1),
  item('clutchbag', 'Mint Floral Pouch Clutch', c2),
  item('clutchbag', 'Green Leaf Woven Clutch', c3),
  item('clutchbag', 'Black & Natural Woven Clutch', c4),
  item('clutchbag', 'Natural Jute Envelope Clutch', c5),
  item('clutchbag', 'Beige Embroidered Clutch', c6),
  item('clutchbag', 'Cinnamon Gathered Clutch', c7),
]
