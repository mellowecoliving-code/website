import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RESEND_SECONDS = 14

function PhoneLoginForm({ onSuccessRedirect = '/account' }) {
  const { sendOtp, verifyOtp } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState('phone') // 'phone' | 'otp'
  const [phone, setPhone] = useState('')
  const [digits, setDigits] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const inputsRef = useRef([])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await sendOtp(phone)
      setStep('otp')
      setDigits(['', '', '', ''])
      setCooldown(RESEND_SECONDS)
      setTimeout(() => inputsRef.current[0]?.focus(), 50)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0) return
    setError('')
    try {
      await sendOtp(phone)
      setCooldown(RESEND_SECONDS)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.')
    }
  }

  const handleDigitChange = (i, value) => {
    const v = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < 3) inputsRef.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    const code = digits.join('')
    if (code.length !== 4) {
      setError('Enter the 4-digit code.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await verifyOtp(phone, code)
      navigate(onSuccessRedirect)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code.')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'phone') {
    return (
      <form onSubmit={handleSendOtp} className="space-y-3">
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
        <div className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-[#013485]">
          <span className="flex items-center bg-gray-50 px-3 text-sm text-gray-600">+91</span>
          <input
            type="tel"
            required
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full px-3 py-2.5 text-sm text-gray-900 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting || phone.length < 10}
          className="w-full rounded-full bg-[#013485] py-2.5 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b] disabled:opacity-50"
        >
          {submitting ? 'SENDING...' : 'SUBMIT'}
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleVerify} className="space-y-3">
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
      <p className="text-center text-xs text-gray-500">
        Verification code sent to +91 {phone}
      </p>
      <div className="flex justify-center gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleDigitChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-12 w-11 rounded-lg border border-gray-300 text-center text-lg font-semibold text-gray-900 focus:border-[#013485] focus:outline-none"
          />
        ))}
      </div>
      <p className="text-center text-xs text-gray-400">
        {cooldown > 0 ? (
          `Resend OTP in ${cooldown} Sec`
        ) : (
          <button type="button" onClick={handleResend} className="font-semibold text-[#013485] hover:underline">
            Resend OTP
          </button>
        )}
      </p>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[#013485] py-2.5 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b] disabled:opacity-50"
      >
        {submitting ? 'VERIFYING...' : 'SUBMIT'}
      </button>
    </form>
  )
}

export default PhoneLoginForm
