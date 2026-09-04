import { MessageCircle } from 'lucide-react'
import heroImg from '../assets/sections/hero.png'
import { resolveMediaUrl, useCmsContent } from '../hooks/useCmsContent'

function Hero() {
  const cms = useCmsContent()
  const hero = cms.hero

  return (
    <section className="relative">
      {hero?.url ? (
        hero.type === 'video' ? (
          <video
            src={resolveMediaUrl(hero.url)}
            className="h-auto w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img src={resolveMediaUrl(hero.url)} alt="Mellow Eco-Living" className="h-auto w-full object-cover" />
        )
      ) : (
        <img src={heroImg} alt="Mellow Eco-Living" className="h-auto w-full object-cover" />
      )}
      <a
        href="https://wa.me/916302111807"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
      >
        <MessageCircle className="h-5 w-5" fill="white" />
      </a>
    </section>
  )
}

export default Hero
