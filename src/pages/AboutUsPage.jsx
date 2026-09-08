import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'Who We Are',
    paragraphs: [
      'Mellow Eco Living is a slow-fashion and conscious-living brand, making clothing and home essentials from natural, low-impact materials. We believe getting dressed and setting up a home shouldn’t come at the planet’s expense.',
    ],
  },
  {
    heading: 'What We Make',
    paragraphs: [
      'From breathable linen and organic cotton clothing to thoughtfully made home and eco-living essentials, every piece is designed to be worn and used for years — repaired rather than replaced when it eventually shows wear.',
    ],
  },
  {
    heading: 'How We Work',
    paragraphs: [
      'We work in small batches with artisans and manufacturers who share our values, prioritising fair practices and quality craftsmanship over speed and volume.',
    ],
  },
  {
    heading: 'Get in Touch',
    paragraphs: ['We’d love to hear from you — reach us at info@mellowecoliving.com or +91 6302111807.'],
  },
]

function AboutUsPage() {
  return <LegalPage title="About Us" sections={sections} />
}

export default AboutUsPage
