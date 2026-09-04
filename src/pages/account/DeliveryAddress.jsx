import { ChevronLeft, MapPin, Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addAddress, deleteAddress, getAddresses, updateAddress } from '../../api/account'
import AddressForm from '../../components/AddressForm'

function DeliveryAddress() {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getAddresses()
      setAddresses(data)
      if (data.length === 0) setShowForm(true)
    } catch (err) {
      setError('Failed to load addresses.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    try {
      const updated = editingAddress
        ? await updateAddress(editingAddress._id, data)
        : await addAddress(data)
      setAddresses(updated)
      setShowForm(false)
      setEditingAddress(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save address.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const updated = await deleteAddress(id)
      setAddresses(updated)
    } catch (err) {
      setError('Failed to remove address.')
    }
  }

  if (loading) {
    return <p className="px-4 py-8 text-sm text-gray-500">Loading...</p>
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <Link to="/account" className="mb-4 flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900">
        <ChevronLeft className="h-4 w-4" />
        BACK
      </Link>

      {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {showForm ? (
        <>
          <h1 className="mb-5 text-lg font-bold text-[#0F1E3D]">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h1>
          <AddressForm
            initial={editingAddress}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false)
              setEditingAddress(null)
            }}
          />
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="mb-6 flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-[#013485] hover:bg-gray-50"
          >
            Add a new address
            <Plus className="h-4 w-4" />
          </button>

          <h2 className="mb-3 text-xs font-bold tracking-wide text-gray-500">SAVED ADDRESSES</h2>
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr._id} className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#013485]" />
                    <span className="text-sm font-semibold text-gray-900">
                      {addr.firstName} {addr.lastName}
                    </span>
                    {addr.isDefault && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-[#013485]">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label="Edit address"
                      onClick={() => {
                        setEditingAddress(addr)
                        setShowForm(true)
                      }}
                    >
                      <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-900" />
                    </button>
                    <button
                      type="button"
                      aria-label="Remove address"
                      onClick={() => handleDelete(addr._id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {addr.flatHouseNo}, {addr.areaStreet}
                  {addr.landmark ? `, ${addr.landmark}` : ''}
                  <br />
                  {addr.townCity} {addr.state} {addr.pincode}
                  <br />
                  {addr.country}
                  <br />
                  Phone number: {addr.contactNumber}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default DeliveryAddress
