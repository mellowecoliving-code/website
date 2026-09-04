import api from './client'

export const validateCoupon = (code, cartTotal) =>
  api.post('/coupons/validate', { code, cartTotal }).then((res) => res.data)
