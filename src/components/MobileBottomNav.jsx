import { Heart, Home, Sparkles, Tag } from 'lucide-react'

function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-gray-100 bg-white py-2 lg:hidden">
      <a href="/" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[#013485]">
        <Home className="h-5 w-5" />
        <span className="text-[10px] font-medium">Home</span>
      </a>
      <a href="/new-arrivals" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[#013485]">
        <Tag className="h-5 w-5" />
        <span className="text-[10px] font-medium">New</span>
      </a>
      <a href="/#how-it-works" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[#013485]">
        <Sparkles className="h-5 w-5" />
        <span className="text-[10px] font-medium">Renew</span>
      </a>
      <a href="/wishlist" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[#013485]">
        <Heart className="h-5 w-5" />
        <span className="text-[10px] font-medium">Wishlist</span>
      </a>
    </nav>
  )
}

export default MobileBottomNav
