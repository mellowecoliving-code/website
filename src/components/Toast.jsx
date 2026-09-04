import { useStore } from '../context/StoreContext'

function Toast() {
  const { toast } = useStore()

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center transition-opacity ${
        toast ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="rounded-full bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white shadow-lg">
        {toast}
      </div>
    </div>
  )
}

export default Toast
