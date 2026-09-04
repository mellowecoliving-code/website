import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { useCmsContent } from '../hooks/useCmsContent'

function MailboxIcon(props) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 58 V36 A16 16 0 0 1 54 36 V58 Z" />
      <path d="M22 58 L22 40 L11 49 Z" />
      <path d="M14 46 L22 42 V52 Z" fill="currentColor" stroke="none" />
      <path d="M54 40 H67" />
      <path d="M67 40 V27" />
      <path d="M67 27 L78 33.5 L67 40" />
      <path d="M36 58 V85" />
      <path d="M25 85 H47" />
    </svg>
  )
}

function Newsletter() {
  const { showToast } = useStore()
  const cms = useCmsContent()
  const heading = cms.newsletter?.heading || 'Enjoying our content?'
  const subtext =
    cms.newsletter?.subtext || 'Subscribe to our newsletter get notified with the latest news and offers.'
  const [showInput, setShowInput] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!showInput) {
      setShowInput(true)
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showToast('Enter a valid email address')
      return
    }
    showToast('Subscribed! Check your inbox soon.')
    setEmail('')
    setShowInput(false)
  }

  return (
    <section className="bg-[#013485] px-4 py-14 text-center text-white lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <MailboxIcon className="mx-auto mb-6 h-14 w-14" />
        <h2 className="mb-2 text-2xl font-bold lg:text-3xl">{heading}</h2>
        <p className="mb-6 text-sm text-blue-100">{subtext}</p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm items-center justify-center gap-2">
          {showInput && (
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          )}
          <button
            type="submit"
            className="shrink-0 rounded-full bg-blue-100 px-8 py-3 text-xs font-bold tracking-wide text-[#013485] transition-colors hover:bg-white"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
