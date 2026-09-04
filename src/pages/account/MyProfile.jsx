import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateProfile } from '../../api/account'
import { useAuth } from '../../context/AuthContext'

function MyProfile() {
  const { user, setUser } = useAuth()
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSaving(true)
    try {
      const updated = await updateProfile(form)
      setUser(updated)
      setMessage('Profile updated successfully.')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <Link to="/account" className="mb-4 flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900">
        <ChevronLeft className="h-4 w-4" />
        BACK
      </Link>

      <p className="mb-6 text-sm text-gray-600">
        {`Good day! `}
        <span className="font-semibold text-[#0F1E3D]">{user?.name}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {message && <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={form.firstName}
            onChange={handleChange('firstName')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={form.lastName}
            onChange={handleChange('lastName')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#013485] px-8 py-3 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b] disabled:opacity-50"
        >
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
      </form>
    </div>
  )
}

export default MyProfile
