import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: '1. Introduction',
    paragraphs: [
      'Mellow Eco Living Private Limited ("Mellow", "we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us when you visit mellowecoliving.com or make a purchase from us.',
    ],
  },
  {
    heading: '2. Information We Collect',
    paragraphs: ['We collect information you provide directly to us, and information collected automatically when you use our site:'],
    list: [
      'Account details — name, email address, phone number, and delivery addresses.',
      'Order information — items purchased, payment status, and order history.',
      'Payment details — processed securely by our payment partner; we do not store your card or UPI credentials.',
      'Usage data — pages visited, device and browser type, collected via cookies and similar technologies.',
    ],
  },
  {
    heading: '3. How We Use Your Information',
    list: [
      'To process and deliver your orders, and to communicate order and shipping updates.',
      'To provide customer support and respond to your enquiries.',
      'To send order-related notifications by SMS, WhatsApp, or email.',
      'To improve our products, website, and shopping experience.',
      'To send marketing communications, only if you have opted in — you can unsubscribe at any time.',
    ],
  },
  {
    heading: '4. Sharing Your Information',
    paragraphs: [
      'We do not sell your personal information. We share it only with trusted service providers who help us run our business — such as payment gateways, courier partners, and hosting providers — solely for the purpose of fulfilling your order and operating our services, and only to the extent necessary.',
    ],
  },
  {
    heading: '5. Data Security',
    paragraphs: [
      'We use industry-standard measures, including encrypted connections and access controls, to protect your information. No method of transmission over the internet is 100% secure, but we work to protect your data to the best of our ability.',
    ],
  },
  {
    heading: '6. Your Rights',
    paragraphs: [
      'You can access, update, or request deletion of your account information at any time from your account settings, or by contacting us at the details below.',
    ],
  },
  {
    heading: '7. Contact Us',
    paragraphs: [
      'If you have questions about this Privacy Policy, write to us at info@mellowecoliving.com or call +91 6302111807.',
    ],
  },
]

function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" updated="September 2026" sections={sections} />
}

export default PrivacyPolicyPage
