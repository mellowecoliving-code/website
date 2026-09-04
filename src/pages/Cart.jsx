import { Minus, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EmptyCartIllustration } from '../components/EmptyStateIllustrations'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/StoreContext'

function Cart() {
  const { cart, setCartQty, removeFromCart, cartTotal, coupon, couponLoading, applyCoupon, removeCoupon } =
    useStore()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  const cartItems = Object.values(cart)
  const finalTotal = Math.max(0, cartTotal - (coupon?.discountAmount || 0))

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return
    setCouponError('')
    try {
      await applyCoupon(couponInput.trim())
      setCouponInput('')
    } catch (err) {
      setCouponError(err.response?.data?.message || 'Invalid coupon code.')
    }
  }

  const handlePlaceOrder = () => {
    navigate(isAuthenticated ? '/checkout' : '/login', {
      state: !isAuthenticated ? { from: '/checkout' } : undefined,
    })
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 lg:px-10">
        <h1 className="mb-1 text-xl font-bold text-[#0F1E3D] lg:text-2xl">Cart</h1>
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <EmptyCartIllustration className="h-24 w-24" />
          <p className="text-sm font-bold tracking-wide text-gray-900">YOUR CART IS EMPTY</p>
          {!isAuthenticated && (
            <p className="text-sm text-gray-500">
              Have an account?{' '}
              <Link to="/login" className="font-semibold text-[#013485] hover:underline">
                Log in
              </Link>{' '}
              to check out faster.
            </p>
          )}
          <Link
            to="/new-arrivals"
            className="mt-2 rounded-full border border-gray-300 px-8 py-3 text-xs font-bold tracking-wide text-gray-900 hover:bg-gray-50"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 lg:px-10">
      <h1 className="mb-6 text-xl font-bold text-[#0F1E3D] lg:text-2xl">Cart</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {cartItems.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 py-5">
              <img src={product.img} alt={product.name} className="h-24 w-24 shrink-0 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{product.name}</p>
                <p className="mb-2 text-sm font-semibold text-gray-900">₹{product.price}</p>
                <div className="flex w-fit items-center gap-3 rounded-full border border-gray-200 px-3 py-1.5">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setCartQty(product.id, qty - 1)}>
                    <Minus className="h-3.5 w-3.5 text-gray-600" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">{qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setCartQty(product.id, qty + 1)}>
                    <Plus className="h-3.5 w-3.5 text-gray-600" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Remove ${product.name} from cart`}
                onClick={() => removeFromCart(product.id)}
              >
                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl border border-gray-200 p-5">
          <p className="mb-1.5 text-xs font-semibold text-gray-500">Discount</p>
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#013485] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={couponLoading}
              className="rounded-md bg-gray-900 px-4 py-2 text-xs font-bold tracking-wide text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {couponLoading ? '...' : 'Apply'}
            </button>
          </div>
          {couponError && <p className="mb-3 text-xs text-red-600">{couponError}</p>}
          {coupon && (
            <div className="mb-3 flex items-center justify-between text-xs text-green-700">
              <span>
                &ldquo;{coupon.code}&rdquo; applied — −₹{coupon.discountAmount.toLocaleString('en-IN')}
              </span>
              <button type="button" onClick={removeCoupon} className="text-gray-400 hover:text-gray-700">
                Remove
              </button>
            </div>
          )}

          <div className="mb-1 flex items-center justify-between text-sm font-semibold text-gray-900">
            <span>Estimated total</span>
            <span>₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
          <p className="mb-4 text-xs text-gray-400">Tax included. Shipping calculated at checkout.</p>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full rounded-full bg-[#013485] py-3 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b]"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
