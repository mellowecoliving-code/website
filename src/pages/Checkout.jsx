import { CheckCircle2, MapPin, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addAddress, getAddresses } from '../api/account'
import { createRazorpayOrder, verifyPayment } from '../api/payment'
import AddressForm from '../components/AddressForm'
import { useStore } from '../context/StoreContext'
import { useAuth } from '../context/AuthContext'
import { loadRazorpayScript } from '../utils/loadRazorpay'

function Checkout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cart, cartTotal, coupon, clearCart, showToast } = useStore()
  const cartItems = Object.values(cart)
  const finalTotal = Math.max(0, cartTotal - (coupon?.discountAmount || 0))

  const [addresses, setAddresses] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [placing, setPlacing] = useState(false)
  const [addingAddress, setAddingAddress] = useState(false)

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/', { replace: true })
      return
    }
    getAddresses()
      .then((data) => {
        setAddresses(data)
        const defaultAddr = data.find((a) => a.isDefault) || data[0]
        if (defaultAddr) setSelectedId(defaultAddr._id)
        else setShowAddressForm(true)
      })
      .catch(() => setError('Failed to load addresses.'))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddAddress = async (data) => {
    setAddingAddress(true)
    try {
      const updated = await addAddress(data)
      setAddresses(updated)
      const newest = updated[updated.length - 1]
      setSelectedId(newest._id)
      setShowAddressForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save address.')
    } finally {
      setAddingAddress(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (!selectedId) {
      setError('Please select or add a delivery address.')
      return
    }
    setPlacing(true)
    setError('')

    const items = cartItems.map(({ product, qty }) => ({
      id: product.id,
      name: product.name,
      quantity: qty,
    }))

    try {
      const razorpayOrder = await createRazorpayOrder({
        items,
        addressId: selectedId,
        couponCode: coupon?.code,
      })
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        setError('Could not load the payment gateway. Please check your connection and try again.')
        setPlacing(false)
        return
      }

      const razorpay = new window.Razorpay({
        key: razorpayOrder.keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.orderId,
        name: 'Mellow Eco Living',
        description: 'Order payment',
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: { color: '#013485' },
        handler: async (response) => {
          try {
            const order = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            clearCart()
            showToast('Payment successful! Order placed.')
            navigate('/account/orders', { state: { justPlacedOrderId: order._id } })
          } catch (err) {
            setError(err.response?.data?.message || 'Payment succeeded but order confirmation failed. Contact support.')
          } finally {
            setPlacing(false)
          }
        },
        modal: {
          ondismiss: () => setPlacing(false),
        },
      })

      razorpay.on('payment.failed', () => {
        setError('Payment failed. Please try again.')
        setPlacing(false)
      })

      razorpay.open()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start payment.')
      setPlacing(false)
    }
  }

  if (loading) return <p className="px-4 py-8 text-center text-sm text-gray-500">Loading...</p>

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold text-[#0F1E3D]">Checkout</h1>

      {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-wide text-gray-500">DELIVERY ADDRESS</h2>
          {!showAddressForm && (
            <button
              type="button"
              onClick={() => setShowAddressForm(true)}
              className="flex items-center gap-1 text-xs font-semibold text-[#013485] hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              Add new
            </button>
          )}
        </div>

        {showAddressForm ? (
          <AddressForm
            submitting={addingAddress}
            onSubmit={handleAddAddress}
            onCancel={() => setShowAddressForm(false)}
          />
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label
                key={addr._id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${
                  selectedId === addr._id ? 'border-[#013485] bg-blue-50/50' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectedId === addr._id}
                  onChange={() => setSelectedId(addr._id)}
                  className="mt-1 accent-[#013485]"
                />
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#013485]" />
                    <span className="text-sm font-semibold text-gray-900">
                      {addr.firstName} {addr.lastName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {addr.flatHouseNo}, {addr.areaStreet}, {addr.townCity} {addr.state} {addr.pincode}
                    <br />
                    Phone: {addr.contactNumber}
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xs font-bold tracking-wide text-gray-500">ORDER SUMMARY</h2>
        <div className="divide-y divide-gray-100 rounded-lg border border-gray-200">
          {cartItems.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-3 p-3">
              <img src={product.img} alt={product.name} className="h-14 w-14 rounded-md object-cover" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-500">Qty {qty}</p>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                ₹{(Number(product.price.replace(/,/g, '')) * qty).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          {coupon && (
            <div className="flex justify-between text-green-700">
              <span>Discount ({coupon.code})</span>
              <span>−₹{coupon.discountAmount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-200 pt-2 font-semibold text-gray-900">
            <span>Total</span>
            <span>₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={placing || showAddressForm}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#013485] py-3 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b] disabled:opacity-50"
      >
        <CheckCircle2 className="h-4 w-4" />
        {placing ? 'PLACING ORDER...' : 'PLACE ORDER'}
      </button>

      <p className="mt-4 text-center text-xs text-gray-400">
        <Link to="/" className="hover:underline">
          Continue shopping
        </Link>
      </p>
    </div>
  )
}

export default Checkout
