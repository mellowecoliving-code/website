import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or placing an order on mellowecoliving.com, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use this site.',
    ],
  },
  {
    heading: '2. Products and Pricing',
    paragraphs: [
      'We make every effort to display our products and their prices accurately. Prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to correct pricing errors and to modify or discontinue products without prior notice.',
    ],
  },
  {
    heading: '3. Orders and Payment',
    paragraphs: [
      'An order is confirmed only once payment has been successfully processed. We reserve the right to cancel any order due to stock unavailability, pricing errors, or suspected fraudulent activity, in which case any amount charged will be refunded.',
    ],
  },
  {
    heading: '4. Shipping and Delivery',
    paragraphs: [
      'Delivery timelines shown at checkout are estimates and may vary due to courier delays or circumstances beyond our control. Risk of loss and title for products pass to you upon delivery.',
    ],
  },
  {
    heading: '5. Returns and Cancellations',
    paragraphs: [
      'Eligible items may be returned or exchanged within the return window stated on the product page, provided they are unused and in their original packaging. Certain categories (such as innerwear, for hygiene reasons) may not be eligible for return.',
    ],
  },
  {
    heading: '6. Intellectual Property',
    paragraphs: [
      'All content on this site — including text, images, logos, and design — is the property of Mellow Eco Living Private Limited and may not be reproduced without our written permission.',
    ],
  },
  {
    heading: '7. Limitation of Liability',
    paragraphs: [
      'Mellow shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website, to the extent permitted by applicable law.',
    ],
  },
  {
    heading: '8. Governing Law',
    paragraphs: [
      'These Terms are governed by the laws of India, and any disputes will be subject to the exclusive jurisdiction of the courts where Mellow Eco Living Private Limited is registered.',
    ],
  },
  {
    heading: '9. Contact Us',
    paragraphs: ['For any questions about these Terms, reach us at info@mellowecoliving.com or +91 6302111807.'],
  },
]

function TermsConditionsPage() {
  return <LegalPage title="Terms & Conditions" updated="September 2026" sections={sections} />
}

export default TermsConditionsPage
