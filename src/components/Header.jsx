import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/StoreContext'
import { MEGA_MENU } from '../data/megaMenu'
import { resolveMediaUrl, useCmsContent } from '../hooks/useCmsContent'
import DesktopSubNav from './DesktopSubNav'
import MobileMenu from './MobileMenu'
import SearchWithOverlay from './SearchWithOverlay'

const RENEW_LINK = { label: 'RENEW', href: '/#how-it-works' }

function Logo({ className = '' }) {
  const cms = useCmsContent()
  const logoUrl = cms.logo?.url

  if (logoUrl) {
    return (
      <a href="/" className={`flex items-center ${className}`}>
        <img src={resolveMediaUrl(logoUrl)} alt="Mellow" className="h-8 w-auto" />
      </a>
    )
  }

  return (
    <a href="/" className={`flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 text-[#013485]" fill="currentColor">
        <path d="M16 3c-1.6 0-3 1-3.5 2.5C11.2 5 9.8 5.3 9 6.4 8.2 7.5 8.3 9 9.2 10 8 10.5 7 11.7 7 13.2c0 1.9 1.6 3.5 3.5 3.5.3 0 .6 0 .9-.1-.3.7-.4 1.4-.4 2.2 0 2.9 2.3 5.2 5.2 5.2s5.2-2.3 5.2-5.2c0-.8-.1-1.5-.4-2.2.3.1.6.1.9.1 1.9 0 3.5-1.6 3.5-3.5 0-1.5-1-2.7-2.2-3.2.9-1 1-2.5.2-3.6-.8-1.1-2.2-1.4-3.5-.9C18.6 4.8 17 3.5 16 3z" />
        <rect x="14.5" y="20" width="3" height="9" rx="1.2" />
      </svg>
      <span className="text-2xl font-bold tracking-tight text-[#0F1E3D]">mellow</span>
    </a>
  )
}

function IconBadge({ count }) {
  if (!count) return null
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#013485] text-[10px] font-bold text-white">
      {count > 9 ? '9+' : count}
    </span>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const { cartCount, wishlistCount } = useStore()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const goToAccount = () => navigate(isAuthenticated ? '/account' : '/login')

  const closeMobileMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 text-[#0F1E3D] lg:hidden">
        <button type="button" aria-label="Open menu" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <button
          type="button"
          aria-label="Search"
          onClick={() => setSearchOpen((open) => !open)}
        >
          <Search className="h-5 w-5" />
        </button>
        <Logo className="absolute left-1/2 -translate-x-1/2" />
        <div className="ml-auto flex items-center gap-4">
          <Link to="/wishlist" className="relative" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            <IconBadge count={wishlistCount} />
          </Link>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            <IconBadge count={cartCount} />
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-gray-100 px-4 py-3 lg:hidden">
          <SearchWithOverlay value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
        </div>
      )}

      <div className="hidden lg:block" onMouseLeave={() => setHoveredCategory(null)}>
        <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-8 px-10">
          <Logo />

          <nav className="flex items-center gap-7">
            {MEGA_MENU.map((cat) => (
              <Link
                key={cat.label}
                to="/#shop-by-category"
                onMouseEnter={() => setHoveredCategory(cat.label)}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-[#013485] ${
                  hoveredCategory === cat.label ? 'text-[#013485]' : 'text-[#0F1E3D]'
                }`}
              >
                {cat.label}
              </Link>
            ))}
            <Link
              to={RENEW_LINK.href}
              onMouseEnter={() => setHoveredCategory(null)}
              className="text-sm font-semibold tracking-wide text-[#0F1E3D] transition-colors hover:text-[#013485]"
            >
              {RENEW_LINK.label}
            </Link>
          </nav>

          <SearchWithOverlay className="ml-auto w-64 xl:w-80" value={query} onChange={(e) => setQuery(e.target.value)} />

          <div className="flex items-center gap-5">
            <button type="button" aria-label="Account" onClick={goToAccount}>
              <User className="h-5 w-5 text-[#0F1E3D]" />
            </button>
            <Link to="/wishlist" className="relative" aria-label="Wishlist">
              <Heart className="h-5 w-5 text-[#0F1E3D]" />
              <IconBadge count={wishlistCount} />
            </Link>
            <Link to="/cart" className="relative" aria-label="Cart">
              <ShoppingBag className="h-5 w-5 text-[#0F1E3D]" />
              <IconBadge count={cartCount} />
            </Link>
          </div>
        </div>

        {hoveredCategory && (
          <DesktopSubNav
            subcategories={MEGA_MENU.find((c) => c.label === hoveredCategory).subcategories}
            onSelect={() => setHoveredCategory(null)}
          />
        )}
      </div>

      <MobileMenu open={menuOpen} onClose={closeMobileMenu} onSelect={closeMobileMenu} />
    </header>
  )
}

export default Header
