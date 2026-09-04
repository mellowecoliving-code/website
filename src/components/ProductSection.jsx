import ProductCard from './ProductCard'

function ProductSection({ id, title, products, ctaLabel, onCtaClick }) {
  return (
    <section id={id} className="scroll-mt-20 bg-[#FAF8F5] px-4 py-10 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mb-6 text-xl font-bold text-gray-900 lg:text-2xl">{title}</h2>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onCtaClick}
            className="rounded-full bg-[#013485] px-6 py-3 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#012a6b]"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
