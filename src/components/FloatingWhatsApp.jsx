import { FaWhatsapp } from 'react-icons/fa'
import { useCmsContent } from '../hooks/useCmsContent'

const FloatingWhatsApp = () => {
  const cms = useCmsContent()
  const number = cms.footer?.whatsappNumber?.replace(/[^0-9]/g, '')

  if (!number) return null

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl lg:bottom-10"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  )
}

export default FloatingWhatsApp
