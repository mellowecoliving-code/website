import { ChevronLeft, Shirt } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../../api/account'
import { getProductById } from '../../data/searchIndex'

function MyWardrobe() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => setError('Failed to load your wardrobe.'))
      .finally(() => setLoading(false))
  }, [])

  // Orders only store id/name/price/quantity snapshots (not images — the
  // catalog is static client-side data, not a DB collection), so pieces are
  // re-hydrated with real product details by id and grouped: buying the same
  // item across two orders should read as "2 units you own," not two rows.
  const pieces = useMemo(() => {
    const byProduct = new Map()
    orders
      .filter((order) => order.paymentStatus !== 'Failed')
      .forEach((order) => {
        order.items.forEach((item) => {
          const existing = byProduct.get(item.product)
          const purchasedAt = order.createdAt
          if (existing) {
            existing.qty += item.quantity
            if (purchasedAt > existing.purchasedAt) existing.purchasedAt = purchasedAt
          } else {
            byProduct.set(item.product, {
              id: item.product,
              name: item.name,
              qty: item.quantity,
              purchasedAt,
              product: getProductById(item.product),
            })
          }
        })
      })
    return Array.from(byProduct.values()).sort((a, b) => (a.purchasedAt < b.purchasedAt ? 1 : -1))
  }, [orders])

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <Link to="/account" className="mb-4 flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900">
        <ChevronLeft className="h-4 w-4" />
        BACK
      </Link>

      <h1 className="mb-1 text-lg font-bold text-[#0F1E3D]">My Wardrobe</h1>
      <p className="mb-6 text-xs text-gray-500">Every piece you own from Mellow, in one place.</p>

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {!loading && !error && pieces.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#013485]">
            <Shirt className="h-7 w-7" />
          </div>
          <p className="text-sm text-gray-500">
            Nothing here yet — your wardrobe fills up as you shop.
          </p>
          <Link
            to="/new-arrivals"
            className="rounded-full bg-[#013485] px-8 py-3 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b]"
          >
            START SHOPPING
          </Link>
        </div>
      )}

      {!loading && pieces.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {pieces.map((piece) => (
            <Link
              key={piece.id}
              to={piece.product ? `/product/${piece.id}` : '#'}
              className="rounded-xl border border-gray-200 p-2 hover:border-gray-300 hover:bg-gray-50"
            >
              <div className="mb-2 aspect-[397/466] w-full overflow-hidden rounded-lg bg-gray-100">
                {piece.product ? (
                  <img src={piece.product.img} alt={piece.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-300">
                    <Shirt className="h-8 w-8" />
                  </div>
                )}
              </div>
              <p className="line-clamp-2 text-xs font-medium text-gray-800">{piece.name}</p>
              <p className="mt-0.5 text-[11px] text-gray-400">
                {piece.qty > 1 ? `${piece.qty} owned · ` : ''}
                Purchased {new Date(piece.purchasedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyWardrobe
