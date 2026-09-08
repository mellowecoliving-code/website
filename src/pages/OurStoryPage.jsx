import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'Where It Started',
    paragraphs: [
      'Mellow began with a simple frustration: it was hard to find clothing and home goods that felt good to wear and use, without contributing to fast fashion’s waste. We set out to build a brand around the opposite idea — fewer, better things, made to last.',
    ],
  },
  {
    heading: 'Choosing "Mellow"',
    paragraphs: [
      'The name reflects the pace we wanted to work at — unhurried, considered, and calm — a deliberate contrast to an industry built on speed and disposability.',
    ],
  },
  {
    heading: 'Where We Are Now',
    paragraphs: [
      'Today, Mellow spans clothing for women, men, and kids, along with home and eco-living essentials — all still guided by the same starting question: does this need to exist, and can we make it well?',
    ],
  },
]

function OurStoryPage() {
  return <LegalPage title="Our Story" sections={sections} />
}

export default OurStoryPage
