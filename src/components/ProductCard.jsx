import { Check, Heart, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function ProductCard({ id, name, price, img, fluid = false }) {
  const { cart, addToCart, toggleWishlist, isWishlisted } = useStore()
  const navigate = useNavigate()
  const [justAdded, setJustAdded] = useState(false)
  const wishlisted = isWishlisted(id)
  const inCart = Boolean(cart[id])

  const handleAddToCart = () => {
    addToCart({ id, name, price, img })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  const handleCartButtonClick = () => {
    if (justAdded) return
    if (inCart) navigate('/cart')
    else handleAddToCart()
  }

  return (
    <div className={fluid ? 'w-full' : 'w-[188px] shrink-0 snap-start sm:w-[190px] lg:w-[200px]'}>
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img src={img} alt={name} className="aspect-[397/466] w-full rounded-2xl object-cover" />
        </Link>
        <button
          type="button"
          aria-label={wishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={wishlisted}
          onClick={() => toggleWishlist({ id, name, price, img })}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow transition-transform hover:scale-105"
        >
          <Heart
            className={`h-3.5 w-3.5 ${wishlisted ? 'text-red-500' : 'text-gray-700'}`}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>
      </div>
      <div className="mt-3">
        <Link to={`/product/${id}`}>
          <p className="text-sm text-gray-800 hover:text-[#013485]">{name}</p>
        </Link>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">₹{price}</span>
          <button
            type="button"
            aria-label={justAdded ? `${name} added to cart` : inCart ? 'View cart' : `Add ${name} to cart`}
            onClick={handleCartButtonClick}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-white transition-all hover:scale-105 ${
              justAdded ? 'bg-green-600' : 'bg-[#013485]'
            }`}
          >
            {justAdded ? (
              <Check className="h-4 w-4" />
            ) : inCart ? (
              <ShoppingBag className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
