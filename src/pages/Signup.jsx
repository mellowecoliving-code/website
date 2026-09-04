import { Eye, EyeOff, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CountryCodeSelect from '../components/CountryCodeSelect'
import GoogleLoginButton from '../components/GoogleLoginButton'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [notify, setNotify] = useState(true)
  const [error, setError] = useState('')
  const [accountExists, setAccountExists] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [touchedConfirm, setTouchedConfirm] = useState(false)

  const passwordsMismatch =
    touchedConfirm && form.confirmPassword.length > 0 && form.password !== form.confirmPassword

  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setAccountExists(false)
    setTouchedConfirm(true)

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      const digits = form.phone.replace(/\D/g, '')
      const { countryCode, confirmPassword, ...rest } = form
      await signup({ ...rest, phone: digits ? `${countryCode}${digits}` : '' })
      navigate('/account')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account.')
      setAccountExists(err.response?.data?.code === 'ACCOUNT_EXISTS')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-[#EEF2FA] px-4 py-12">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#013485] p-6 text-center text-white shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={() => navigate('/')}
          className="absolute right-4 top-4 text-white/70 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <svg viewBox="0 0 32 32" className="mx-auto mb-2 h-8 w-8 text-white" fill="currentColor">
          <path d="M16 3c-1.6 0-3 1-3.5 2.5C11.2 5 9.8 5.3 9 6.4 8.2 7.5 8.3 9 9.2 10 8 10.5 7 11.7 7 13.2c0 1.9 1.6 3.5 3.5 3.5.3 0 .6 0 .9-.1-.3.7-.4 1.4-.4 2.2 0 2.9 2.3 5.2 5.2 5.2s5.2-2.3 5.2-5.2c0-.8-.1-1.5-.4-2.2.3.1.6.1.9.1 1.9 0 3.5-1.6 3.5-3.5 0-1.5-1-2.7-2.2-3.2.9-1 1-2.5.2-3.6-.8-1.1-2.2-1.4-3.5-.9C18.6 4.8 17 3.5 16 3z" />
          <rect x="14.5" y="20" width="3" height="9" rx="1.2" />
        </svg>
        <p className="mb-1 text-lg font-bold tracking-tight">mellow</p>
        <p className="mb-6 text-xs font-medium uppercase tracking-wide text-blue-100">
          Thoughtfully made, for everyday living
        </p>

        <div className="rounded-xl bg-white p-5 text-left">
          <h1 className="mb-4 text-base font-bold text-[#0F1E3D]">Create your account</h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
                <p>{error}</p>
                {accountExists && (
                  <Link
                    to="/login"
                    className="mt-1 inline-block font-semibold text-[#013485] hover:underline"
                  >
                    Go to Login →
                  </Link>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="text"
                required
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange('firstName')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-[#013485] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange('lastName')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-[#013485] focus:outline-none"
              />
            </div>

            <input
              type="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={handleChange('email')}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-[#013485] focus:outline-none"
            />

            <div className="flex gap-2">
              <CountryCodeSelect
                value={form.countryCode}
                onChange={(countryCode) => setForm((p) => ({ ...p, countryCode }))}
                className="py-2.5"
              />
              <input
                type="tel"
                placeholder="Contact number"
                value={form.phone}
                onChange={handleChange('phone')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-[#013485] focus:outline-none"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="Password"
                value={form.password}
                onChange={handleChange('password')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 focus:border-[#013485] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onBlur={() => setTouchedConfirm(true)}
                  className={`w-full rounded-lg border px-4 py-2.5 pr-10 text-sm text-gray-900 focus:outline-none ${
                    passwordsMismatch
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#013485]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {passwordsMismatch && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || passwordsMismatch}
              className="w-full rounded-full bg-[#013485] py-2.5 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b] disabled:opacity-50"
            >
              {submitting ? 'CREATING ACCOUNT...' : 'SUBMIT'}
            </button>

            <GoogleLoginButton label="Sign up with Google" />

            <label className="flex items-center gap-2 pt-1 text-xs text-gray-500">
              <input
                type="checkbox"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                className="h-3.5 w-3.5 accent-[#013485]"
              />
              Notify me with offers & updates
            </label>
          </form>
        </div>

        <p className="mt-5 text-sm text-blue-100">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
