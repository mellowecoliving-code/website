import { Fragment } from 'react'
import { FaFacebookF, FaInstagram, FaPinterestP, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { useStore } from '../context/StoreContext'
import { resolveMediaUrl, useCmsContent } from '../hooks/useCmsContent'

// Mirrors the main nav structure — not CMS-editable on purpose.
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

// Not CMS-editable — these link to pages that don't exist yet, so there's
// nothing meaningful for an admin to configure beyond the label text.
const COLUMNS = [
  {
    title: 'CUSTOMER CARE',
    links: ['Shipping Policy', 'Return & Refund Policy', 'Size Guide', 'FAQs', 'Care Instructions'],
  },
  {
    title: 'ABOUT',
    links: ['About Us', 'Our Story', 'Sustainability', 'Our Process'],
  },
]

const DEFAULT_CONTACT_PHONE = '+91 6302111807'
const DEFAULT_CONTACT_EMAIL = 'info@mellowecoliving.com'
const DEFAULT_COPYRIGHT = 'All rights reserved | © 2026 Mellow Eco Living Private Limited.'
const DEFAULT_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
  { label: 'Cookies Policy', href: '/cookies-policy' },
]

const SOCIAL_ICONS = [
  { key: 'instagram', Icon: FaInstagram, label: 'Instagram' },
  { key: 'facebook', Icon: FaFacebookF, label: 'Facebook' },
  { key: 'youtube', Icon: FaYoutube, label: 'YouTube' },
  { key: 'twitter', Icon: FaXTwitter, label: 'X' },
  { key: 'pinterest', Icon: FaPinterestP, label: 'Pinterest' },
]

function Footer() {
  const { showToast } = useStore()
  const cms = useCmsContent()
  const logoUrl = cms.logo?.url
  const footer = cms.footer || {}
  const contactPhone = footer.contactPhone || DEFAULT_CONTACT_PHONE
  const contactEmail = footer.contactEmail || DEFAULT_CONTACT_EMAIL
  const copyrightText = footer.copyrightText || DEFAULT_COPYRIGHT
  const legalLinks = footer.legalLinks?.length ? footer.legalLinks : DEFAULT_LEGAL_LINKS
  const socials = footer.socials || {}

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
                  <a href={link.href || '#'} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
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
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="hover:text-gray-900">
                  {contactPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:text-gray-900">
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        {logoUrl && <img src={resolveMediaUrl(logoUrl)} alt="Mellow" className="mb-6 h-7 w-auto" />}

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-600">{copyrightText}</p>
          <div className="flex items-center gap-4">
            {SOCIAL_ICONS.map(({ key, Icon, label }) => {
              const url = socials[key]
              return (
                <a
                  key={key}
                  href={url || '#'}
                  target={url ? '_blank' : undefined}
                  rel={url ? 'noreferrer' : undefined}
                  onClick={url ? undefined : notify(label)}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-800 hover:bg-gray-900 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              )
            })}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            {legalLinks.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 && <span>—</span>}
                <a
                  href={link.href || '#'}
                  onClick={link.href ? undefined : notify(link.label)}
                  className="hover:text-gray-900"
                >
                  {link.label}
                </a>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
