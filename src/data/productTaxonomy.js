// Mirrors server/models/Product.js's SUBTABS_BY_SUBCATEGORY and
// FABRIC_TYPES exactly — keep both sides in sync by hand if either changes.
// This is taxonomy/config, not product data, so it lives alongside
// megaMenu.js/countryCodes.js rather than coming from the API.
export const SUBTABS_BY_SUBCATEGORY = {
  Women: {
    Clothing: ['All', 'Ethnics', 'Co-ord set', 'Tunics', 'Pants'],
    Footwear: ['All', 'Flats', 'Sandals', 'Loafers', 'Sneakers'],
  },
  Men: {
    Clothing: ['All', 'Shirts', 'Trousers', 'Co-ords'],
    Innerwear: ['All', 'Boxer', 'Brief', 'Vest'],
  },
}

export const FABRIC_TYPES = [
  'Cotton',
  '100% Cotton',
  '100% Linen',
  'Bamboo',
  '100% Organic Cotton',
  'Modal',
  'Linen Blend',
  'Cotton Stretch',
]
