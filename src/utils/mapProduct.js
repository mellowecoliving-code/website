// Real Product documents from the backend use a different shape than the
// old static collections did — this is the one place that translates a DB
// product into what ProductCard/Cart/Checkout/etc. expect. `price` stays a
// raw number end-to-end on the client; components format it with
// .toLocaleString('en-IN') only at render time.
export function toCardProduct(p) {
  return {
    id: p._id,
    name: p.name,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    img: p.image || p.images?.[0],
    images: p.images || [],
    category: p.category,
    subcategory: p.subcategory,
    subTab: p.subTab,
    fabricType: p.fabricType,
    stock: p.stock,
    variants: p.variants || [],
    hasVariants: (p.variants?.length || 0) > 0,
    colorImages: p.colorImages || [],
  }
}
