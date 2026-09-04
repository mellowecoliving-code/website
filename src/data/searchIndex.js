import { collectionProducts } from './collectionCatalog'
import { ecoLivingProducts } from './ecoLivingCollection'
import { kidsClothingProducts } from './kidsClothingCollection'
import { kidsFootwearProducts } from './kidsFootwearCollection'
import { kidsInnerwearProducts } from './kidsInnerwearCollection'
import { kidsNightwearProducts } from './kidsNightwearCollection'
import { menClothingProducts } from './menClothingCollection'
import { menInnerwearProducts } from './menInnerwearCollection'
import { menNightwearProducts } from './menNightwearCollection'
import { bestSellers, newArrivals } from './products'
import { womenBagsProducts } from './womenBagsCollection'
import { womenClothingProducts } from './womenClothingCollection'
import { womenFootwearProducts } from './womenFootwearCollection'
import { womenInnerwearProducts } from './womenInnerwearCollection'
import { womenNightwearProducts } from './womenNightwearCollection'

const byId = new Map()
;[
  ...collectionProducts,
  ...bestSellers,
  ...newArrivals,
  ...womenClothingProducts,
  ...womenFootwearProducts,
  ...womenNightwearProducts,
  ...womenInnerwearProducts,
  ...womenBagsProducts,
  ...menClothingProducts,
  ...menInnerwearProducts,
  ...menNightwearProducts,
  ...kidsClothingProducts,
  ...kidsNightwearProducts,
  ...ecoLivingProducts,
  ...kidsInnerwearProducts,
  ...kidsFootwearProducts,
].forEach((p) => {
  if (!byId.has(p.id)) byId.set(p.id, p)
})

export const allProducts = Array.from(byId.values())

export function searchProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return allProducts.filter((p) => p.name.toLowerCase().includes(q))
}

export function getProductById(id) {
  return byId.get(id)
}
