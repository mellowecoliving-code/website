import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: '1. Return Window',
    paragraphs: [
      'Most items can be returned within 7 days of delivery, provided they are unused, unwashed, and in their original packaging with tags intact.',
    ],
  },
  {
    heading: '2. Items That Can’t Be Returned',
    list: [
      'Innerwear and nightwear, for hygiene reasons',
      'Items marked "Final Sale" at the time of purchase',
      'Products showing signs of use, washing, or damage not caused by us',
    ],
  },
  {
    heading: '3. How to Request a Return',
    paragraphs: [
      'Go to My Orders in your account, select the item, and choose "Return." Our team will arrange a pickup from your delivery address within 2–4 business days.',
    ],
  },
  {
    heading: '4. Refunds',
    paragraphs: [
      'Once we receive and inspect the returned item, your refund is processed to the original payment method within 5–7 business days. You’ll get an email once the refund is initiated.',
    ],
  },
  {
    heading: '5. Exchanges',
    paragraphs: [
      'Need a different size or color? Choose "Exchange" instead of "Return" from My Orders, subject to availability of the replacement item.',
    ],
  },
  {
    heading: '6. Damaged or Wrong Item Received',
    paragraphs: [
      'If your order arrives damaged or incorrect, contact us within 48 hours of delivery with photos of the item — we’ll arrange a free replacement or full refund, no questions asked.',
    ],
  },
  {
    heading: '7. Contact Us',
    paragraphs: ['For any return or refund query, write to info@mellowecoliving.com or call +91 6302111807.'],
  },
]

function ReturnRefundPolicyPage() {
  return <LegalPage title="Return & Refund Policy" updated="September 2026" sections={sections} />
}

export default ReturnRefundPolicyPage
