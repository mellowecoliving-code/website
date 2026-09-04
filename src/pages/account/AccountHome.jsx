import { LogOut, MapPin, Package, Shirt, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

const TILES = [
  {
    to: '/account/profile',
    icon: User,
    title: 'My Profile',
    desc: 'View and edit your personal details',
  },
  {
    to: '/account/addresses',
    icon: MapPin,
    title: 'Delivery Address',
    desc: 'Manage your saved addresses',
  },
  {
    to: '/account/orders',
    icon: Package,
    title: 'My Orders',
    desc: 'Track, return, or buy things again',
  },
  {
    to: '/account/wardrobe',
    icon: Shirt,
    title: 'My Wardrobe',
    desc: 'Every piece you own from Mellow',
  },
]

function AccountHome() {
  const { user, logout } = useAuth()

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <p className="mb-6 text-sm text-gray-600">
        {greeting()}! <span className="font-semibold text-[#0F1E3D]">{user?.firstName || user?.name}</span>
      </p>

      <div className="grid grid-cols-2 gap-3">
        {TILES.map(({ to, icon: Icon, title, desc }) => (
          <Link
            key={title}
            to={to}
            className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:bg-gray-50"
          >
            <Icon className="h-5 w-5 text-[#013485]" />
            <span className="text-sm font-semibold text-[#0F1E3D]">{title}</span>
            <span className="text-xs text-gray-500">{desc}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-red-600 shadow-sm transition-colors hover:border-red-100 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  )
}

export default AccountHome
