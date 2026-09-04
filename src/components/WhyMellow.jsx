import bgImg from '../assets/sections/why_mellow_bg.png'
import { resolveMediaUrl, useCmsContent } from '../hooks/useCmsContent'

const DEFAULT_BADGES = [
  { label: 'Organic Cotton', sub: '100% Handwoven' },
  { label: 'Organic Cotton', sub: '100% Handwoven' },
  { label: 'Organic Cotton', sub: '100% Handwoven' },
  { label: 'Naturally Dyed', sub: 'From Plants and Fruits' },
]
const DEFAULT_TAGLINE = '0% Toxins. 100% Love'

function WhyMellow() {
  const cms = useCmsContent()
  const cmsData = cms.whyMellow
  const backgroundSrc = cmsData?.backgroundUrl ? resolveMediaUrl(cmsData.backgroundUrl) : bgImg
  const badges = cmsData?.badges?.length ? cmsData.badges : DEFAULT_BADGES
  const tagline = cmsData?.tagline || DEFAULT_TAGLINE

  return (
    <section className="relative overflow-hidden px-4 py-16 text-white lg:py-24">
      <div
        className="absolute -inset-4 scale-105 blur-md"
        style={{
          backgroundImage: `url(${backgroundSrc})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/15" />
      <div className="relative mx-auto max-w-[1440px] text-center">
        <h2 className="mb-10 text-2xl font-bold tracking-wide lg:mb-14 lg:text-3xl">WHY MELLOW</h2>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center gap-1 border-white/20 sm:border-l sm:first:border-l-0">
              <span className="text-[11px] text-white/70">{badge.sub}</span>
              <span className="text-base font-bold lg:text-lg">{badge.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-white/90 lg:mt-14">{tagline}</p>
      </div>
    </section>
  )
}

export default WhyMellow
