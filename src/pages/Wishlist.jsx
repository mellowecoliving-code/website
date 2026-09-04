import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyWishlistIllustration } from '../components/EmptyStateIllustrations'
import ProductCard from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/StoreContext'

function Wishlist() {
  const { wishlist, addAllWishlistToCart, removeAllFromWishlist, showToast } = useStore()
  const { isAuthenticated } = useAuth()
  const wishlistItems = Object.values(wishlist)

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 lg:px-10">
      <h1 className="mb-1 text-xl font-bold text-[#0F1E3D] lg:text-2xl">My Wishlist</h1>

      {!isAuthenticated && wishlistItems.length > 0 && (
        <p className="mb-6 text-sm text-gray-500">
          Please login to save your wishlist across devices.{' '}
          <Link to="/login" className="font-semibold text-[#013485] hover:underline">
            Login
          </Link>
        </p>
      )}

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <EmptyWishlistIllustration className="h-24 w-24" />
          <p className="text-sm text-gray-500">
            There are no items in
            <br />
            this wishlist
          </p>
          <Link
            to="/new-arrivals"
            className="mt-2 rounded-full bg-[#013485] px-8 py-3 text-xs font-bold tracking-wide text-white hover:bg-[#012a6b]"
          >
            SHOP NOW
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} {...product} fluid />
            ))}
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs font-bold tracking-wide">
            <button
              type="button"
              onClick={() => {
                addAllWishlistToCart()
                showToast('All items added to cart')
              }}
              className="text-[#013485] hover:underline"
            >
              ADD ALL TO CART
            </button>
            <button
              type="button"
              onClick={removeAllFromWishlist}
              className="flex items-center gap-1 text-gray-400 hover:text-red-600 hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5" />
              REMOVE ALL FROM WISHLIST
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Wishlist
