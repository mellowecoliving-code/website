import { Check, ChevronLeft, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, getProducts } from '../api/products'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { COLOR_SWATCHES } from '../utils/colorSwatches'
import { toCardProduct } from '../utils/mapProduct'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cart, cartKeyFor, addToCart, toggleWishlist, isWishlisted, trackRecentlyViewed, showToast } = useStore()
  const [product, setProduct] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [related, setRelated] = useState([])
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [justAdded, setJustAdded] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setProduct(null)
    setRelated([])
    setNotFound(false)
    setQty(1)
    setSelectedSize(null)
    setSelectedColor(null)
    getProduct(id)
      .then((p) => {
        const mapped = toCardProduct(p)
        setProduct(mapped)
        trackRecentlyViewed(mapped)
        // Default to the first variant that's actually in stock, so a
        // shopper doesn't land on a sold-out combo by default.
        const firstInStock = mapped.variants.find((v) => v.stock > 0) || mapped.variants[0]
        if (firstInStock) {
          setSelectedSize(firstInStock.size || null)
          setSelectedColor(firstInStock.color || null)
        }
        return getProducts({ category: p.category, limit: 5 })
      })
      .then((data) => {
        if (data) setRelated(data.products.filter((p) => p._id !== id).slice(0, 4).map(toCardProduct))
      })
      .catch(() => setNotFound(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const sizes = useMemo(
    () => [...new Set((product?.variants || []).map((v) => v.size).filter(Boolean))],
    [product],
  )
  const colors = useMemo(
    () => [...new Set((product?.variants || []).map((v) => v.color).filter(Boolean))],
    [product],
  )
  // A color with its own photos (colorImages) takes over the gallery when
  // selected; anything else — no colorImages, or a color with an empty
  // images list — just shows the product's own images, unchanged.
  const galleryImages = useMemo(() => {
    const colorGroup = selectedColor
      ? (product?.colorImages || []).find((g) => g.color === selectedColor)
      : null
    if (colorGroup?.images.length) return colorGroup.images
    if (product?.images?.length) return product.images
    return product?.img ? [product.img] : []
  }, [product, selectedColor])

  useEffect(() => {
    setActiveImageIndex(0)
  }, [galleryImages])

  const selectedVariant = useMemo(() => {
    if (!product?.hasVariants) return null
    return (
      product.variants.find(
        (v) => (!sizes.length || v.size === selectedSize) && (!colors.length || v.color === selectedColor),
      ) || null
    )
  }, [product, sizes, colors, selectedSize, selectedColor])

  const availableStockForClamp = product
    ? product.hasVariants
      ? selectedVariant?.stock ?? 0
      : product.stock
    : 0

  useEffect(() => {
    setQty((q) => Math.max(1, Math.min(q, availableStockForClamp || 1)))
  }, [availableStockForClamp])

  if (!product) {
    if (!notFound) return null
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="mb-4 text-sm text-gray-500">We couldn&apos;t find that product.</p>
        <Link to="/new-arrivals" className="font-semibold text-[#013485] hover:underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  const cartProduct = product.hasVariants
    ? {
        ...product,
        variantSku: selectedVariant?.sku,
        variantLabel: [selectedVariant?.color, selectedVariant?.size].filter(Boolean).join(' / '),
        stock: selectedVariant?.stock ?? 0,
      }
    : product

  const availableStock = availableStockForClamp
  const outOfStock = product.hasVariants ? !selectedVariant || selectedVariant.stock <= 0 : availableStock <= 0

  const wishlisted = isWishlisted(product.id)
  const inCartQty = cart[cartKeyFor(cartProduct)]?.qty || 0

  const handleAddToCart = () => {
    if (outOfStock) return
    for (let i = 0; i < qty; i++) addToCart(cartProduct)
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
        <div>
          <img
            src={galleryImages[activeImageIndex] || product.img}
            alt={product.name}
            className="aspect-[397/466] w-full rounded-2xl object-cover"
          />
          {galleryImages.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {galleryImages.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                    i === activeImageIndex ? 'border-[#013485]' : 'border-transparent'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {product.category}
            </p>
          )}
          <h1 className="mb-2 text-xl font-bold text-[#0F1E3D] lg:text-2xl">{product.name}</h1>
          <p className="mb-6 flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-900">₹{Number(product.price).toLocaleString('en-IN')}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{Number(product.compareAtPrice).toLocaleString('en-IN')}
              </span>
            )}
          </p>

          <p className="mb-6 text-sm leading-relaxed text-gray-600">
            Thoughtfully made with natural, low-impact materials. Designed to be worn and loved for
            years, and repaired rather than replaced when it eventually shows wear.
          </p>

          {colors.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500">
                COLOR{selectedColor ? `: ${selectedColor}` : ''}
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const hasStock = product.variants.some((v) => v.color === c && v.stock > 0)
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      disabled={!hasStock}
                      title={c}
                      style={{ background: COLOR_SWATCHES[c] || '#cccccc' }}
                      className={`rounded-full border px-4 py-2 text-xs font-medium text-white transition-all ${
                        selectedColor === c
                          ? 'border-[#013485] ring-2 ring-[#013485] ring-offset-2'
                          : hasStock
                            ? 'border-transparent hover:opacity-90'
                            : 'border-transparent opacity-40 line-through'
                      }`}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500">SIZE</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => {
                  const hasStock = product.variants.some((v) => v.size === s && v.stock > 0)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      disabled={!hasStock}
                      className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors ${
                        selectedSize === s
                          ? 'border-[#013485] bg-[#013485] text-white'
                          : hasStock
                            ? 'border-gray-300 text-gray-700 hover:border-gray-900'
                            : 'border-gray-200 text-gray-300 line-through'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {product.hasVariants && (
            <p className="mb-6 text-xs font-medium text-gray-500">
              {outOfStock ? (
                <span className="text-red-600">Out of stock for this combination.</span>
              ) : (
                `${availableStock} in stock`
              )}
            </p>
          )}

          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500">QUANTITY</p>
            <div className="flex w-fit items-center gap-4 rounded-full border border-gray-300 px-3 py-2">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-4 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={qty >= availableStock}
                onClick={() => setQty((q) => Math.min(availableStock, q + 1))}
                className="disabled:opacity-30"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={outOfStock}
              onClick={justAdded ? undefined : inCartQty > 0 ? () => navigate('/cart') : handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-xs font-bold tracking-wide text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                justAdded ? 'bg-green-600' : 'bg-[#013485] hover:bg-[#012a6b]'
              }`}
            >
              {justAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              {justAdded ? 'ADDED' : outOfStock ? 'OUT OF STOCK' : inCartQty > 0 ? 'VIEW CART' : 'ADD TO CART'}
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
