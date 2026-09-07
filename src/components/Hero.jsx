import heroImg from '../assets/sections/hero.png'
import { resolveMediaUrl, useCmsContent, useCmsLoading } from '../hooks/useCmsContent'

function Hero() {
  const cms = useCmsContent()
  const loading = useCmsLoading()
  const hero = cms.hero

  return (
    <section className="relative">
      {loading ? (
        <div className="aspect-[1436/776] w-full animate-pulse bg-gray-200" />
      ) : hero?.url ? (
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
    </section>
  )
}

export default Hero
