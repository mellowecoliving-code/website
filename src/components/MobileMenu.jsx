import { X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { MEGA_MENU } from '../data/megaMenu'

function MobileMenu({ open, onClose, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { showToast } = useStore()

  if (!open) return null

  const active = MEGA_MENU[activeIndex]

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex flex-1 gap-5 overflow-x-auto">
          {MEGA_MENU.map((cat, i) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 pb-1 text-xs font-semibold tracking-wide ${
                i === activeIndex
                  ? 'border-b-2 border-[#013485] text-[#013485]'
                  : 'text-gray-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button type="button" aria-label="Close menu" onClick={onClose} className="ml-4 shrink-0">
          <X className="h-5 w-5 text-[#0F1E3D]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <ul className="space-y-4">
          {active.subcategories.map((sub) => (
            <li key={sub.label}>
              {sub.href ? (
                <Link to={sub.href} onClick={onSelect} className="text-sm text-gray-800 hover:text-[#013485]">
                  {sub.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    showToast(`${sub.label} coming soon`)
                    onSelect()
                  }}
                  className="text-sm text-gray-800 hover:text-[#013485]"
                >
                  {sub.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <Link
            to="/#how-it-works"
            onClick={onSelect}
            className="text-sm font-semibold tracking-wide text-[#013485]"
          >
            RENEW
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
