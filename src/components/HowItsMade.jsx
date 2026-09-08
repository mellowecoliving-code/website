import { Hand, Leaf, Lightbulb, PenTool, Recycle } from 'lucide-react'
import illustration from '../assets/sections/howmade_illustration.png'
import { resolveMediaUrl, useCmsContent } from '../hooks/useCmsContent'

const ICONS = [Lightbulb, PenTool, Leaf, Hand, Recycle]

const DEFAULT_STEPS = [
  {
    title: 'THE IDEA',
    desc: 'Every creation begins with an idea a need, a feeling, a story, or a better way of making everyday life more meaningful.',
  },
  {
    title: 'THE DESIGN',
    desc: 'We shape each idea with purpose, balancing beauty, function, detail, and simplicity to create things that feel thoughtful and truly useful.',
  },
  {
    title: 'THE MATERIALS',
    desc: 'We choose every material with care, considering its origin, quality, impact, feel, and ability to remain useful for longer.',
  },
  {
    title: 'THE MAKING',
    desc: 'Skilled hands bring every idea to life through thoughtful processes, honest workmanship, careful attention, and respect for the craft.',
  },
  {
    title: 'THE JOURNEY',
    desc: 'Every creation is made to live longer to be used, loved, cared for, repaired, and given another meaningful life.',
  },
]

function HowItsMade() {
  const cms = useCmsContent()
  const cmsData = cms.howItsMade
  const illustrationSrc = cmsData?.illustrationUrl ? resolveMediaUrl(cmsData.illustrationUrl) : illustration
  const STEPS = DEFAULT_STEPS.map((defaultStep, i) => ({
    title: cmsData?.steps?.[i]?.title || defaultStep.title,
    desc: cmsData?.steps?.[i]?.desc || defaultStep.desc,
    icon: ICONS[i],
  }))

  return (
    <section className="bg-[#FAF8F5] px-4 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="mb-6 text-xl font-bold text-gray-900 lg:text-2xl">HOW IT'S MADE</h2>
          <img src={illustrationSrc} alt="How it's made illustration" className="w-full object-contain" />
        </div>
        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex gap-4">
                <div className="relative shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#013485] text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  {/* Dotted connector down to the next icon — spans the fixed
                      gap-6 (24px) between rows, so it lines up regardless of
                      how many lines this row's description wraps to. */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute left-1/2 top-9 h-6 -translate-x-1/2 border-l-2 border-dotted border-[#013485]/40" />
                  )}
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-[#013485]">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItsMade
