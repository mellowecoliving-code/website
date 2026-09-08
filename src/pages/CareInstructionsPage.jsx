import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'Washing',
    list: [
      'Hand wash or use a gentle machine cycle in cold water, with similar colors.',
      'Use a mild, eco-friendly detergent — harsh detergents wear down natural fibres faster.',
      'Turn printed or embroidered pieces inside out before washing.',
      'Avoid soaking for long periods, especially for linen and naturally dyed fabrics.',
    ],
  },
  {
    heading: 'Drying',
    list: [
      'Dry flat or on a hanger in shade — direct sunlight can fade natural dyes over time.',
      'Avoid tumble drying; it shortens the life of natural fibres and can cause shrinkage.',
      'Reshape garments gently while damp for the best fit once dry.',
    ],
  },
  {
    heading: 'Ironing & Storage',
    list: [
      'Iron on a medium setting while the fabric is still slightly damp, especially linen and cotton.',
      'Store in a cool, dry place; natural fibres breathe better on hangers than folded in tight stacks.',
      'Use cotton garment bags rather than plastic covers to let fabric breathe.',
    ],
  },
  {
    heading: 'A Note on Natural Fabrics',
    paragraphs: [
      'Because our pieces are made from natural, minimally processed materials, some texture variation, minor shrinkage after the first wash, and softening over time is normal — it’s part of what makes natural fibres age well rather than wear out.',
    ],
  },
]

function CareInstructionsPage() {
  return <LegalPage title="Care Instructions" sections={sections} />
}

export default CareInstructionsPage
