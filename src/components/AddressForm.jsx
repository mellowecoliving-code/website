import { useState } from 'react'

const STATES = [
  'Andhra Pradesh',
  'Delhi',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Tamil Nadu',
  'Telangana',
  'West Bengal',
]

function AddressForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState({
    firstName: initial?.firstName || '',
    lastName: initial?.lastName || '',
    contactNumber: initial?.contactNumber || '',
    flatHouseNo: initial?.flatHouseNo || '',
    areaStreet: initial?.areaStreet || '',
    landmark: initial?.landmark || '',
    country: initial?.country || 'India',
    state: initial?.state || '',
    townCity: initial?.townCity || '',
    pincode: initial?.pincode || '',
    isDefault: initial?.isDefault || false,
  })
  const [error, setError] = useState('')

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.firstName.trim() || !form.contactNumber.trim() || !form.flatHouseNo.trim()) {
      setError('First name, contact number, and address are required.')
      return
    }
    setError('')
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="addr-firstName" className="mb-1 block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="addr-firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange('firstName')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="addr-lastName" className="mb-1 block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="addr-lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange('lastName')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="addr-contactNumber" className="mb-1 block text-sm font-medium text-gray-700">
          Contact Number
        </label>
        <input
          id="addr-contactNumber"
          type="tel"
          value={form.contactNumber}
          onChange={handleChange('contactNumber')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="addr-flatHouseNo" className="mb-1 block text-sm font-medium text-gray-700">
          Flat, House no, Building, Company, Apartment
        </label>
        <input
          id="addr-flatHouseNo"
          type="text"
          value={form.flatHouseNo}
          onChange={handleChange('flatHouseNo')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="addr-areaStreet" className="mb-1 block text-sm font-medium text-gray-700">
          Area, Street, Sector, Village
        </label>
        <input
          id="addr-areaStreet"
          type="text"
          value={form.areaStreet}
          onChange={handleChange('areaStreet')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="addr-landmark" className="mb-1 block text-sm font-medium text-gray-700">
          Landmark
        </label>
        <input
          id="addr-landmark"
          type="text"
          value={form.landmark}
          onChange={handleChange('landmark')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="addr-townCity" className="mb-1 block text-sm font-medium text-gray-700">
          Town / City
        </label>
        <input
          id="addr-townCity"
          type="text"
          value={form.townCity}
          onChange={handleChange('townCity')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="addr-state" className="mb-1 block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            id="addr-state"
            value={form.state}
            onChange={handleChange('state')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
          >
            <option value="">Select a state</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="addr-pincode" className="mb-1 block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            id="addr-pincode"
            type="text"
            value={form.pincode}
            onChange={handleChange('pincode')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#013485] focus:outline-none"
          />
        </div>
      </div>

      <label htmlFor="addr-isDefault" className="flex items-center gap-2 text-sm text-gray-700">
        <input
          id="addr-isDefault"
          type="checkbox"
          checked={form.isDefault}
          onChange={handleChange('isDefault')}
        />
        Mark as default address
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-gray-300 px-6 py-3 text-xs font-bold tracking-wide text-gray-700 hover:bg-gray-50"
        >
          CANCEL
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-full bg-[#013485] py-3 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b] disabled:opacity-50"
        >
          {submitting ? 'SAVING...' : 'SAVE ADDRESS'}
        </button>
      </div>
    </form>
  )
}

export default AddressForm
