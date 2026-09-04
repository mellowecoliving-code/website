function sub(label, href = null) {
  return { label, href }
}

export const MEGA_MENU = [
  {
    label: 'WOMEN',
    subcategories: [
      sub('Clothing', '/women/clothing'),
      sub('Nightwear', '/women/nightwear'),
      sub('Innerwear', '/women/innerwear'),
      sub('Activewear'),
      sub('Footwear', '/women/footwear'),
      sub('Bags', '/women/bags'),
      sub('Accessories'),
    ],
  },
  {
    label: 'MEN',
    subcategories: [
      sub('Clothing', '/men/clothing'),
      sub('Nightwear', '/men/nightwear'),
      sub('Innerwear', '/men/innerwear'),
      sub('Activewear'),
      sub('Footwear'),
      sub('Bags'),
      sub('Accessories'),
    ],
  },
  {
    label: 'KIDS',
    subcategories: [
      sub('Clothing', '/kids/clothing'),
      sub('Nightwear', '/kids/nightwear'),
      sub('Innerwear', '/kids/innerwear'),
      sub('Activewear'),
      sub('Footwear', '/kids/footwears'),
      sub('Toys'),
      sub('Stationery'),
      sub('Accessories'),
      sub('Bags'),
    ],
  },
  {
    label: 'HOME',
    subcategories: [
      sub('Home Furnishing'),
      sub('Kitchen & Dining'),
      sub('Home Décor'),
      sub('Storage & Organisation'),
      sub('Bath & Laundry'),
      sub('Cleaning Essentials'),
      sub('Garden & Outdoor'),
    ],
  },
  {
    label: 'ECO LIVING',
    subcategories: [
      sub('Eco Living', '/eco-living'),
      sub('Personal care'),
      sub('Waste Management'),
      sub('Composting & Gardening'),
      sub('Eco Packaging'),
      sub('Reusable Essentials'),
      sub('Water & Energy Saving'),
      sub('Office & Stationery'),
      sub('Gifts'),
      sub('Celebrations'),
    ],
  },
]
