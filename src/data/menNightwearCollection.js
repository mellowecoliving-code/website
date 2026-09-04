import bannerImage from '../assets/collections/men-nightwear/nightwear_banner.png'
import n0 from '../assets/collections/men-nightwear/nightwear_0.png'
import n1 from '../assets/collections/men-nightwear/nightwear_1.png'
import n2 from '../assets/collections/men-nightwear/nightwear_2.png'
import n3 from '../assets/collections/men-nightwear/nightwear_3.png'
import n4 from '../assets/collections/men-nightwear/nightwear_4.png'
import n5 from '../assets/collections/men-nightwear/nightwear_5.png'

export { bannerImage }

export const menNightwearProducts = [n0, n1, n2, n3, n4, n5].map((img, i) => ({
  id: `men-nightwear-${i}`,
  name: 'Midnight Black Essential Stole Chiffon • Light weight Flow',
  price: '1,832',
  category: 'Men',
  img,
}))
