import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'Natural Materials First',
    paragraphs: [
      'We prioritise natural, minimally processed fibres — organic cotton, linen, bamboo, and similar materials — over synthetics that shed microplastics and take centuries to break down.',
    ],
  },
  {
    heading: 'Made to Last, Not to Discard',
    paragraphs: [
      'Every piece is designed with longevity in mind: sturdier construction, timeless styling, and fabrics that soften and improve with age rather than wear out — the opposite of a fast-fashion mindset.',
    ],
  },
  {
    heading: 'Small-Batch Production',
    paragraphs: [
      'We produce in small batches based on real demand rather than mass-manufacturing and discounting excess stock — this means less waste and fewer unsold garments ending up in landfill.',
    ],
  },
  {
    heading: 'Thoughtful Packaging',
    paragraphs: [
      'Our packaging uses recyclable and biodegradable materials wherever possible, and we’re continually working to reduce plastic across our supply chain.',
    ],
  },
  {
    heading: 'A Work in Progress',
    paragraphs: [
      'Sustainability isn’t a checkbox we’ve ticked — it’s an ongoing commitment we revisit as we grow. We’ll keep sharing what we learn and improve along the way.',
    ],
  },
]

function SustainabilityPage() {
  return <LegalPage title="Sustainability" sections={sections} />
}

export default SustainabilityPage
