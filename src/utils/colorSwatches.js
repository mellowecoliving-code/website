// Mirrors admin/src/components/ProductForm.jsx's COLORS list so a variant's
// color name renders as the same swatch here as it does when an admin picks
// it. Not a shared package (client/admin are separate apps) — keep in sync
// by hand if that list changes.
export const COLOR_SWATCHES = {
  Black: '#000000',
  White: '#ffffff',
  Grey: '#9e9e9e',
  Beige: '#e8dcc4',
  Brown: '#795548',
  Red: '#e53935',
  Maroon: '#800000',
  Pink: '#ec407a',
  Orange: '#fb8c00',
  Yellow: '#fdd835',
  Green: '#43a047',
  Olive: '#808000',
  Teal: '#00897b',
  Blue: '#1e88e5',
  Navy: '#001f3f',
  Purple: '#8e24aa',
  Multicolor: 'linear-gradient(135deg, #e53935, #fdd835, #43a047, #1e88e5)',
}
