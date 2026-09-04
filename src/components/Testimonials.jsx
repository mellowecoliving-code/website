import { Star } from 'lucide-react'
import { useState } from 'react'
import { useCmsContent } from '../hooks/useCmsContent'

const DEFAULT_REVIEWS = [
  {
    quote:
      'I really appreciate the thought behind every piece. The quality is excellent, and knowing the clothes can be renewed makes them even more special.',
    name: 'Rahul K',
    location: 'Bengaluru',
  },
  {
    quote:
      'Mellow has completely changed how I think about shopping for clothes. Beautiful designs, natural fabrics, and a much more thoughtful approach to fashion.',
    name: 'Sana',
    location: 'Mumbai',
  },
  {
    quote:
      'The shirt I ordered feels incredibly comfortable and well made. It has become one of those pieces I reach for almost every day.',
    name: 'Arjun R',
    location: 'Hyderabad',
  },
]

function chunk(arr, size) {
  const pages = []
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size))
  return pages
}

function Testimonials() {
  const cms = useCmsContent()
  const reviews = cms.testimonials?.reviews?.length ? cms.testimonials.reviews : DEFAULT_REVIEWS
  const REVIEWS = chunk(reviews, 3)
  const [page, setPage] = useState(0)
  const currentPage = Math.min(page, REVIEWS.length - 1)

  return (
    <section className="bg-white px-4 py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mb-10 text-center text-xl font-bold text-[#013485] lg:text-2xl">
          TESTIMONIALS
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {REVIEWS[currentPage].map((review, i) => (
            <div key={`${review.name}-${i}`} className="rounded-xl bg-[#FAF8F5] p-6 text-center">
              <div className="mb-4 flex justify-center gap-1 text-[#013485]">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5" fill="currentColor" />
                ))}
              </div>
              <p className="mb-5 text-sm text-gray-700">"{review.quote}"</p>
              <p className="text-sm font-bold text-gray-900">{review.name}</p>
              <p className="text-xs text-gray-500">{review.location}</p>
            </div>
          ))}
        </div>
        {REVIEWS.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonials page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-1.5 w-1.5 rounded-full ${i === currentPage ? 'bg-[#013485]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
