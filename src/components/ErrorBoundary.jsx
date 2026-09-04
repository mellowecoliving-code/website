import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-lg font-bold text-[#0F1E3D]">Something went wrong.</p>
          <p className="text-sm text-gray-500">
            Please refresh the page. If this keeps happening, contact support.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-[#013485] px-6 py-2.5 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b]"
          >
            RELOAD
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
