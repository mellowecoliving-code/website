import { useState } from 'react'
import heroImg from '../assets/sections/hero.png'
import { resolveMediaUrl, useCmsContent, useCmsLoading } from '../hooks/useCmsContent'

function Hero() {
  const cms = useCmsContent()
  const loading = useCmsLoading()
  const hero = cms.hero
  // If the CMS-configured media 404s (e.g. a stale reference to a file that
  // no longer exists), fall back to the bundled default image instead of
  // rendering nothing — a broken <video src> just shows a blank section.
  const [mediaFailed, setMediaFailed] = useState(false)

  const useCmsMedia = hero?.url && !mediaFailed

  return (
    <section className="relative">
      {loading ? (
        <div className="aspect-[1436/776] w-full animate-pulse bg-gray-200" />
      ) : useCmsMedia ? (
        hero.type === 'video' ? (
          <video
            src={resolveMediaUrl(hero.url)}
            className="h-auto w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setMediaFailed(true)}
          />
        ) : (
          <img
            src={resolveMediaUrl(hero.url)}
            alt="Mellow Eco-Living"
            className="h-auto w-full object-cover"
            onError={() => setMediaFailed(true)}
          />
        )
      ) : (
        <img src={heroImg} alt="Mellow Eco-Living" className="h-auto w-full object-cover" />
      )}
    </section>
  )
}

export default Hero
