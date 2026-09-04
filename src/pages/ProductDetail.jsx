import { Check, ChevronLeft, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { allProducts, getProductById } from '../data/searchIndex'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cart, addToCart, toggleWishlist, isWishlisted, trackRecentlyViewed, showToast } = useStore()
  const product = getProductById(id)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('M')
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (product) {
      trackRecentlyViewed(product)
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="mb-4 text-sm text-gray-500">We couldn&apos;t find that product.</p>
        <Link to="/new-arrivals" className="font-semibold text-[#013485] hover:underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  const wishlisted = isWishlisted(product.id)
  const inCartQty = cart[product.id]?.qty || 0
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    showToast(`${product.name} added to cart`)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4" />
        BACK
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <img
          src={product.img}
          alt={product.name}
          className="aspect-[397/466] w-full rounded-2xl object-cover"
        />

        <div>
          {product.category && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {product.category}
            </p>
          )}
          <h1 className="mb-2 text-xl font-bold text-[#0F1E3D] lg:text-2xl">{product.name}</h1>
          <p className="mb-6 text-lg font-semibold text-gray-900">₹{product.price}</p>

          <p className="mb-6 text-sm leading-relaxed text-gray-600">
            Thoughtfully made with natural, low-impact materials. Designed to be worn and loved for
            years, and repaired rather than replaced when it eventually shows wear.
          </p>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500">SIZE</p>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                    size === s
                      ? 'border-[#013485] bg-[#013485] text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500">QUANTITY</p>
            <div className="flex w-fit items-center gap-4 rounded-full border border-gray-300 px-3 py-2">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-4 text-center text-sm font-semibold">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={justAdded ? undefined : inCartQty > 0 ? () => navigate('/cart') : handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-xs font-bold tracking-wide text-white transition-colors ${
                justAdded ? 'bg-green-600' : 'bg-[#013485] hover:bg-[#012a6b]'
              }`}
            >
              {justAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              {justAdded ? 'ADDED' : inCartQty > 0 ? 'VIEW CART' : 'ADD TO CART'}
            </button>
            <button
              type="button"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={() => toggleWishlist(product)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-300 hover:border-gray-900"
            >
              <Heart className={`h-5 w-5 ${wishlisted ? 'text-red-500' : 'text-gray-700'}`} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {inCartQty > 0 && (
            <p className="mt-3 text-xs font-medium text-gray-500">
              <Check className="mr-1 inline h-3.5 w-3.5 text-green-600" />
              {inCartQty} {inCartQty === 1 ? 'unit' : 'units'} of this item in your cart —{' '}
              <button type="button" onClick={handleAddToCart} className="font-semibold text-[#013485] hover:underline">
                add {qty} more
              </button>
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-lg font-bold text-[#0F1E3D]">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} {...p} fluid />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
