import { ChevronLeft, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../../api/account'
import StatusBadge from '../../components/StatusBadge'

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => setError('Failed to load orders.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <Link to="/account" className="mb-4 flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900">
        <ChevronLeft className="h-4 w-4" />
        BACK
      </Link>

      <h1 className="mb-6 text-lg font-bold text-[#0F1E3D]">My Orders</h1>

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#013485]">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <p className="text-sm text-gray-500">
            You haven&apos;t placed any orders yet.
            <br />
            Looks like you haven&apos;t made any purchases yet.
          </p>
          <Link
            to="/new-arrivals"
            className="rounded-full bg-[#013485] px-8 py-3 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b]"
          >
            VIEW PRODUCT
          </Link>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-xs text-gray-500">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
                <StatusBadge status={order.status} />
              </div>
              <div className="mb-2 divide-y divide-gray-100 border-y border-gray-100">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 py-2">
                    <div>
                      <p className="text-sm text-gray-800">
                        {item.name} × {item.quantity}
                      </p>
                      {item.variantLabel && <p className="text-xs text-gray-400">{item.variantLabel}</p>}
                      {item.taxInclusive !== undefined && (
                        <p className="text-xs text-gray-400">
                          {item.taxInclusive ? 'Price incl. GST' : 'Price excl. GST'}
                          {item.hsnCode ? ` · HSN ${item.hsnCode}` : ''}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-sm text-gray-700">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-900">
                ₹{order.totalAmount.toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
