function LegalPage({ title, updated, sections }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-10">
      <h1 className="mb-2 text-2xl font-bold text-[#0F1E3D] lg:text-3xl">{title}</h1>
      {updated && <p className="mb-8 text-xs text-gray-400">Last updated: {updated}</p>}

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-2 text-base font-bold text-[#0F1E3D]">{section.heading}</h2>
            {section.paragraphs?.map((p, i) => (
              <p key={i} className="mb-2 text-sm leading-relaxed text-gray-600">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="ml-5 list-disc space-y-1 text-sm leading-relaxed text-gray-600">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

export default LegalPage
