import { Heart, Home, Tag, User } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const TABS = [
  { to: '/', label: 'Home', Icon: Home, match: (path) => path === '/' },
  { to: '/new-arrivals', label: 'New', Icon: Tag, match: (path) => path.startsWith('/new-arrivals') },
  { to: '/wishlist', label: 'Wishlist', Icon: Heart, match: (path) => path.startsWith('/wishlist') },
]

function MobileBottomNav() {
  const { pathname } = useLocation()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const accountActive = pathname.startsWith('/account')
  const tabClass = (active) => `flex flex-col items-center gap-0.5 px-3 py-1 ${active ? 'text-[#013485]' : 'text-gray-400'}`

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-gray-100 bg-white py-2 lg:hidden">
      {TABS.map(({ to, label, Icon, match }) => {
        const active = match(pathname)
        return (
          <Link key={to} to={to} className={tabClass(active)} aria-current={active ? 'page' : undefined}>
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        )
      })}
      <button
        type="button"
        onClick={() => navigate(isAuthenticated ? '/account' : '/login')}
        className={tabClass(accountActive)}
        aria-current={accountActive ? 'page' : undefined}
      >
        <User className="h-5 w-5" />
        <span className="text-[10px] font-medium">Account</span>
      </button>
    </nav>
  )
}

export default MobileBottomNav
