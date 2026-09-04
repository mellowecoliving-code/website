import p0 from '../assets/collections/kids-footwear/fw_t1.png'
import p1 from '../assets/collections/kids-footwear/fw_t2.png'
import p2 from '../assets/collections/kids-footwear/fw_r1_1.png'
import p3 from '../assets/collections/kids-footwear/fw_r1_2.png'
import p4 from '../assets/collections/kids-footwear/fw_r2_1.png'
import p5 from '../assets/collections/kids-footwear/fw_r2_2.png'
import p6 from '../assets/collections/kids-footwear/fw_r3_1.png'
import p7 from '../assets/collections/kids-footwear/fw_r3_2.png'
import p8 from '../assets/collections/kids-footwear/fw_r4_1.png'
import p9 from '../assets/collections/kids-footwear/fw_r4_2.png'
import p10 from '../assets/collections/kids-footwear/fw_r5_1.png'
import p11 from '../assets/collections/kids-footwear/fw_r5_2.png'

function item(name, img) {
  return { id: `kids-footwear-${name}`, name, price: '1,832', category: 'Kids', img }
}

export const kidsFootwearProducts = [
  item('Aurelia Gold Sandals', p0),
  item('Celeste Slingback Flats', p1),
  item('Rosé Flip-Flops', p2),
  item('Hazel Bow Slides', p3),
  item('Florence Lace-Up Sandals', p4),
  item('Milano Flat Mules', p5),
  item('CloudWalk EVA Flip-Flops', p6),
  item('Siena Cross Sandals', p7),
  item('Milan Classic Heels', p8),
  item('Rosalie Bloom Slides', p9),
  item('Camellia Petal Slides', p10),
  item('Verona Buckle Heels', p11),
]
