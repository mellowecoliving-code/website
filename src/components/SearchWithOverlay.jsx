import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import SearchOverlay from './SearchOverlay'

function SearchWithOverlay({ className = '', value, onChange, autoFocus = false }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-gray-500" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setOpen(true)}
          autoFocus={autoFocus}
          placeholder="Search"
          className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none"
        />
        {value && (
          <button type="button" aria-label="Clear search" onClick={() => onChange({ target: { value: '' } })}>
            <X className="h-4 w-4 text-gray-400 hover:text-gray-700" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 w-full min-w-[320px] rounded-2xl border border-gray-100 bg-white shadow-xl sm:w-[420px]">
          <SearchOverlay query={value} />
        </div>
      )}
    </div>
  )
}

export default SearchWithOverlay
