import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: '1. What Are Cookies',
    paragraphs: [
      'Cookies are small text files placed on your device when you visit our website. They help the site function properly and let us understand how it is used.',
    ],
  },
  {
    heading: '2. How We Use Cookies',
    list: [
      'Essential cookies — required for core features like staying logged in, and keeping items in your cart.',
      'Preference cookies — remember choices you make, such as recently viewed products.',
      'Analytics cookies — help us understand how visitors use our site, so we can improve it.',
    ],
  },
  {
    heading: '3. Managing Cookies',
    paragraphs: [
      'Most browsers let you control or disable cookies through their settings. Please note that disabling essential cookies may affect the site’s functionality, including your ability to check out.',
    ],
  },
  {
    heading: '4. Third-Party Cookies',
    paragraphs: [
      'Some cookies may be set by third-party services we use, such as payment processors and analytics providers, to help those services function correctly.',
    ],
  },
  {
    heading: '5. Contact Us',
    paragraphs: ['Questions about our use of cookies can be sent to info@mellowecoliving.com or +91 6302111807.'],
  },
]

function CookiesPolicyPage() {
  return <LegalPage title="Cookies Policy" updated="September 2026" sections={sections} />
}

export default CookiesPolicyPage
