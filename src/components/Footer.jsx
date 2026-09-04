import { FaFacebookF, FaInstagram, FaPinterestP, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { useStore } from '../context/StoreContext'

const CATEGORY_LINKS = [
  { label: 'Women', href: '/#shop-by-category' },
  { label: 'Men', href: '/#shop-by-category' },
  { label: 'Kids', href: '/#shop-by-category' },
  { label: 'Home', href: '/#shop-by-category' },
  { label: 'Eco-living', href: '/#shop-by-category' },
  { label: 'Bestseller', href: '/best-sellers' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Renew', href: '/#how-it-works' },
]

const PLACEHOLDER_COLUMNS = [
  {
    title: 'CUSTOMER CARE',
    links: ['Shipping Policy', 'Return & Refund Policy', 'Size Guide', 'FAQs', 'Care Instructions'],
  },
  {
    title: 'ABOUT',
    links: ['About Us', 'Our Story', 'Sustainability', 'Our Process'],
  },
]

const SOCIALS = [
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: FaFacebookF, label: 'Facebook' },
  { Icon: FaYoutube, label: 'YouTube' },
  { Icon: FaXTwitter, label: 'X' },
  { Icon: FaPinterestP, label: 'Pinterest' },
]

function Footer() {
  const { showToast } = useStore()
  const notify = (label) => (e) => {
    e.preventDefault()
    showToast(`${label} page coming soon`)
  }

  return (
    <footer className="bg-[#FAF8F5] px-4 py-12 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-wide text-gray-900">CATEGORIES</h3>
            <ul className="flex flex-col gap-2.5">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {PLACEHOLDER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-bold tracking-wide text-gray-900">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" onClick={notify(link)} className="text-sm text-gray-600 hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-wide text-gray-900">CONTACT</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-600">
              <li>
                <a href="tel:+916302111807" className="hover:text-gray-900">
                  +91 6302111807
                </a>
              </li>
              <li>
                <a href="mailto:info@mellowecoliving.com" className="hover:text-gray-900">
                  info@mellowecoliving.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-600">
            All rights reserved | © 2026 Mellow Eco Living Private Limited.
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                onClick={notify(label)}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-800 hover:bg-gray-900 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <a href="#" onClick={notify('Privacy Policy')} className="hover:text-gray-900">
              Privacy Policy
            </a>
            <span>—</span>
            <a href="#" onClick={notify('Terms & Conditions')} className="hover:text-gray-900">
              Terms &amp; Conditions
            </a>
            <span>—</span>
            <a href="#" onClick={notify('Cookies Policy')} className="hover:text-gray-900">
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
