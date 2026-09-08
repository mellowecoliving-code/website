import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'How to Measure',
    paragraphs: [
      'Use a soft measuring tape and measure directly against your body, over light clothing. For the most accurate fit, compare your measurements to the size chart below rather than relying on your usual size — cuts vary between styles.',
    ],
    list: [
      'Bust/Chest — measure around the fullest part of your chest',
      'Waist — measure around the narrowest part of your natural waistline',
      'Hips — measure around the fullest part of your hips',
    ],
  },
  {
    heading: 'Women’s Size Chart (in inches)',
    list: [
      'XS — Bust 32–33 · Waist 25–26 · Hips 35–36',
      'S — Bust 34–35 · Waist 27–28 · Hips 37–38',
      'M — Bust 36–37 · Waist 29–30 · Hips 39–40',
      'L — Bust 38–40 · Waist 31–33 · Hips 41–43',
      'XL — Bust 41–43 · Waist 34–36 · Hips 44–46',
    ],
  },
  {
    heading: 'Men’s Size Chart (in inches)',
    list: [
      'S — Chest 36–37 · Waist 30–31',
      'M — Chest 38–39 · Waist 32–33',
      'L — Chest 40–42 · Waist 34–36',
      'XL — Chest 43–45 · Waist 37–39',
    ],
  },
  {
    heading: 'Between Sizes?',
    paragraphs: [
      'If your measurements fall between two sizes, we generally recommend sizing up for a more relaxed, comfortable fit — most of our silhouettes are designed to be worn easy rather than fitted.',
    ],
  },
  {
    heading: 'Still Unsure?',
    paragraphs: ['Write to us at info@mellowecoliving.com with your measurements and the product you’re looking at — we’re happy to help you pick a size.'],
  },
]

function SizeGuidePage() {
  return <LegalPage title="Size Guide" sections={sections} />
}

export default SizeGuidePage
