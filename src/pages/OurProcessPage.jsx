import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: '1. Design',
    paragraphs: [
      'Every piece starts with a question: will this still feel right to wear or use in five years? We design for longevity first, trends second.',
    ],
  },
  {
    heading: '2. Sourcing',
    paragraphs: [
      'We source natural fabrics and materials from mills and suppliers we’ve vetted for quality and fair practices, favouring organic and low-impact options wherever available.',
    ],
  },
  {
    heading: '3. Making',
    paragraphs: [
      'Production happens in small batches with artisans and manufacturing partners who share our standards — this keeps quality high and lets us stay accountable for how each piece is made.',
    ],
  },
  {
    heading: '4. Quality Check',
    paragraphs: [
      'Every batch is checked for stitching, fit, and finish before it’s approved for sale — we’d rather delay a launch than ship something that won’t hold up.',
    ],
  },
  {
    heading: '5. Packing & Delivery',
    paragraphs: [
      'Orders are packed in recyclable materials and shipped to you, ready to be worn and loved for years.',
    ],
  },
]

function OurProcessPage() {
  return <LegalPage title="Our Process" sections={sections} />
}

export default OurProcessPage
