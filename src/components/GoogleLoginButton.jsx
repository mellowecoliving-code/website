import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/StoreContext'
import { loadGoogleIdentityScript } from '../utils/loadGoogleIdentity'

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.88-3c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.92H1.3v3.09A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.31 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.3a12 12 0 0 0 0 10.82z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 1.3 6.59l4.01 3.09C6.25 6.87 8.89 4.77 12 4.77z" />
    </svg>
  )
}

const RAW_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const CLIENT_ID = RAW_CLIENT_ID && !RAW_CLIENT_ID.startsWith('your-') ? RAW_CLIENT_ID : null

function GoogleLoginButton({ label = 'Login with Google', onSuccessRedirect = '/account' }) {
  const { googleLogin } = useAuth()
  const { showToast } = useStore()
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!CLIENT_ID) return // not configured yet — fall back to the plain button below

    let cancelled = false

    loadGoogleIdentityScript().then((loaded) => {
      if (cancelled || !loaded || !window.google?.accounts?.id) return

      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: async (response) => {
          try {
            await googleLogin(response.credential)
            navigate(onSuccessRedirect)
          } catch (err) {
            showToast(err.response?.data?.message || 'Google sign-in failed.')
          }
        },
      })

      if (containerRef.current) {
        window.google.accounts.id.renderButton(containerRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
          width: containerRef.current.offsetWidth || 320,
        })
      }
      setReady(true)
    })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!CLIENT_ID) {
    // No real GOOGLE_CLIENT_ID yet — render inert rather than surfacing a
    // "coming soon" message. Starts working the moment VITE_GOOGLE_CLIENT_ID
    // is set to a real value (see loadGoogleIdentityScript branch above).
    return (
      <button
        type="button"
        aria-disabled="true"
        className="flex w-full cursor-default items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 text-sm font-medium text-gray-400"
      >
        <GoogleIcon className="opacity-50" />
        {label}
      </button>
    )
  }

  return (
    <div className="w-full">
      <div ref={containerRef} className={`w-full ${ready ? '' : 'hidden'}`} />
      {!ready && (
        <button
          type="button"
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 text-sm font-medium text-gray-400"
        >
          <GoogleIcon />
          {label}
        </button>
      )}
    </div>
  )
}

export default GoogleLoginButton
