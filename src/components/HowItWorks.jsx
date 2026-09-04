import chooseBetter from '../assets/sections/how_choose-better.png'
import repairReuse from '../assets/sections/how_repair-reuse.png'
import useItLonger from '../assets/sections/how_use-it-longer.png'
import { resolveMediaUrl, useCmsContent } from '../hooks/useCmsContent'

const DEFAULT_STEPS = [
  {
    title: 'Choose Better',
    desc: 'Thoughtfully made products using natural, low-impact and plastic-free materials wherever possible.',
    img: chooseBetter,
  },
  {
    title: 'Use It Longer',
    desc: 'Durable products designed to stay with you for years, not months.',
    img: useItLonger,
  },
  {
    title: 'Repair. Reuse. Waste Less.',
    desc: 'When something wears out, repair or restore it instead of replacing it.',
    img: repairReuse,
  },
]

function HowItWorks() {
  const cms = useCmsContent()
  const cmsSteps = cms.howItWorks?.steps

  const steps = DEFAULT_STEPS.map((defaultStep, i) => {
    const override = cmsSteps?.[i]
    if (!override) return defaultStep
    return {
      title: override.title || defaultStep.title,
      desc: override.desc || defaultStep.desc,
      img: override.imageUrl ? resolveMediaUrl(override.imageUrl) : defaultStep.img,
    }
  })

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[#013485] px-4 py-12 text-white lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mb-10 text-center text-xl font-bold lg:text-2xl">HOW IT WORKS</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <img src={step.img} alt={step.title} className="mb-5 h-40 w-40 rounded-2xl object-cover" />
              <h3 className="mb-2 font-bold">{step.title}</h3>
              <p className="max-w-xs text-sm text-blue-100">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
