import p0 from '../assets/collections/eco-living/el_00.png'
import p1 from '../assets/collections/eco-living/el_01.png'
import p2 from '../assets/collections/eco-living/el_02.png'
import p3 from '../assets/collections/eco-living/el_03.png'
import p4 from '../assets/collections/eco-living/el_04.png'
import p5 from '../assets/collections/eco-living/el_05.png'
import p6 from '../assets/collections/eco-living/el_06.png'
import p7 from '../assets/collections/eco-living/el_07.png'
import p8 from '../assets/collections/eco-living/el_08.png'
import p9 from '../assets/collections/eco-living/el_09.png'
import p10 from '../assets/collections/eco-living/el_10.png'
import p11 from '../assets/collections/eco-living/el_11.png'
import p12 from '../assets/collections/eco-living/el_12.png'
import p13 from '../assets/collections/eco-living/el_13.png'
import p14 from '../assets/collections/eco-living/el_14.png'
import p15 from '../assets/collections/eco-living/el_15.png'

function item(name, img) {
  return { id: `eco-living-${name}`, name, price: '1,832', category: 'Eco Living', img }
}

export const ecoLivingProducts = [
  item('Natural Fiber Bowls / Plates', p0),
  item('Bamboo Cutlery', p1),
  item('Terracotta Plant Pots', p2),
  item('Natural Wax / Wooden Candle Holder', p3),
  item('Egg Carton / Recycled Egg Tray', p4),
  item('Reusable Bamboo / Eco Straws', p5),
  item('Handwoven Natural Fiber Cloth / Scrubber', p6),
  item('Natural Loofah', p7),
  item('Natural Fiber / Coir Planting Blocks', p8),
  item('Bamboo Cups / Tumblers', p9),
  item('Woven Basket / Storage Basket', p10),
  item('Coconut Shell Planters', p11),
  item('Coconut Shell Bowls', p12),
  item('Wooden Comb', p13),
  item('Wooden Combs', p14),
  item('Bamboo Toothbrushes', p15),
]
