import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'How long does delivery take?',
    paragraphs: ['3–5 business days for metro cities, 5–8 days for other cities, and 7–10 days for remote areas. See our Shipping Policy for full details.'],
  },
  {
    heading: 'What is your return policy?',
    paragraphs: ['Most items can be returned within 7 days of delivery if unused and in original packaging. See our Return & Refund Policy for exclusions and full details.'],
  },
  {
    heading: 'How do I track my order?',
    paragraphs: ['Go to My Orders in your account to see the current status of any order, or use the tracking link sent to your email once it ships.'],
  },
  {
    heading: 'What payment methods do you accept?',
    paragraphs: ['We accept all major credit/debit cards, UPI, net banking, and popular wallets through our secure payment partner, Razorpay.'],
  },
  {
    heading: 'Are your products really eco-friendly?',
    paragraphs: ['Yes — we work with natural, low-impact materials like organic cotton, linen, and bamboo, and prioritise fair, small-batch production over mass manufacturing. See Sustainability for more on how we approach this.'],
  },
  {
    heading: 'How do I know what size to order?',
    paragraphs: ['Check our Size Guide for detailed measurements. If you’re between sizes, we generally recommend sizing up for a relaxed fit.'],
  },
  {
    heading: 'Can I cancel or change my order after placing it?',
    paragraphs: ['Contact us as soon as possible at info@mellowecoliving.com or +91 6302111807 — we can usually accommodate changes if the order hasn’t shipped yet.'],
  },
  {
    heading: 'Do you ship outside India?',
    paragraphs: ['Not currently — we ship across India only. We’re working on international shipping and will announce it when available.'],
  },
]

function FaqsPage() {
  return <LegalPage title="Frequently Asked Questions" sections={sections} />
}

export default FaqsPage
