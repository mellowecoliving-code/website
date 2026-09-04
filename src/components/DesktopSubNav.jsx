import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function DesktopSubNav({ subcategories, onSelect }) {
  const { showToast } = useStore()

  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-[1440px] overflow-x-auto px-10 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max items-center gap-6">
          {subcategories.map((sub, i) =>
            sub.href ? (
              <Link
                key={sub.label}
                to={sub.href}
                onClick={onSelect}
                className={`shrink-0 whitespace-nowrap text-xs font-medium tracking-wide transition-colors hover:text-[#013485] ${
                  i === 0 ? 'text-[#013485] underline underline-offset-4' : 'text-gray-600'
                }`}
              >
                {sub.label}
              </Link>
            ) : (
              <button
                key={sub.label}
                type="button"
                onClick={() => {
                  showToast(`${sub.label} coming soon`)
                  onSelect()
                }}
                className={`shrink-0 whitespace-nowrap text-xs font-medium tracking-wide transition-colors hover:text-[#013485] ${
                  i === 0 ? 'text-[#013485] underline underline-offset-4' : 'text-gray-600'
                }`}
              >
                {sub.label}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default DesktopSubNav
