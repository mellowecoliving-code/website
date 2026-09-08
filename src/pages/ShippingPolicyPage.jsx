import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: '1. Delivery Areas',
    paragraphs: [
      'We currently ship across India. At checkout, enter your pincode to confirm delivery is available in your area.',
    ],
  },
  {
    heading: '2. Processing Time',
    paragraphs: [
      'Orders are processed within 1–2 business days of payment confirmation. You will receive an email confirmation as soon as your order is placed, and a shipping update once it leaves our facility.',
    ],
  },
  {
    heading: '3. Delivery Timelines',
    list: [
      'Metro cities: 3–5 business days',
      'Other cities and towns: 5–8 business days',
      'Remote / rural areas: 7–10 business days',
    ],
  },
  {
    heading: '4. Shipping Charges',
    paragraphs: [
      'Shipping charges, if any, are calculated at checkout based on your order value and delivery location. We periodically run free-shipping offers above a minimum order value — any active offer will be shown in your cart.',
    ],
  },
  {
    heading: '5. Order Tracking',
    paragraphs: [
      'Once your order ships, you can track it from My Orders in your account, or via the tracking link sent to your email.',
    ],
  },
  {
    heading: '6. Delays',
    paragraphs: [
      'Occasionally, deliveries may be delayed due to weather, courier disruptions, or address issues beyond our control. We’ll keep you updated by email if this happens.',
    ],
  },
  {
    heading: '7. Contact Us',
    paragraphs: ['Questions about your delivery? Reach us at info@mellowecoliving.com or +91 6302111807.'],
  },
]

function ShippingPolicyPage() {
  return <LegalPage title="Shipping Policy" updated="September 2026" sections={sections} />
}

export default ShippingPolicyPage
