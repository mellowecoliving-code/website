import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-5xl font-bold text-[#013485]">404</p>
      <h1 className="mb-2 text-xl font-bold text-[#0F1E3D]">Page not found</h1>
      <p className="mb-6 text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        to="/"
        className="rounded-full bg-[#013485] px-8 py-3 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b]"
      >
        BACK TO HOME
      </Link>
    </div>
  )
}

export default NotFound
