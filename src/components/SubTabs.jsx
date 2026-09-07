function SubTabs({ tabs, activeId, onSelect }) {
  return (
    <div className="flex justify-center gap-6 overflow-x-auto px-4 py-8 lg:gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onSelect(tab.id)}
          className="flex shrink-0 flex-col items-center gap-2"
        >
          <span
            className={`block h-20 w-20 overflow-hidden rounded-xl ring-2 ring-offset-2 transition-all lg:h-24 lg:w-24 ${
              activeId === tab.id ? 'ring-[#013485]' : 'ring-transparent'
            }`}
          >
            <img src={tab.img} alt={tab.label} className="h-full w-full object-cover" />
          </span>
          <span
            className={`text-xs font-medium ${activeId === tab.id ? 'text-[#013485]' : 'text-gray-600'}`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  )
}

export default SubTabs
