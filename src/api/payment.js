import api from './client'

// The server recomputes the price from item ids/quantities and re-validates
// the coupon itself — it does not trust any amount sent from here. See
// server/controllers/paymentController.js.
export const createRazorpayOrder = ({ items, addressId, couponCode }) =>
  api.post('/payment/create-order', { items, addressId, couponCode }).then((res) => res.data)

export const verifyPayment = (data) => api.post('/payment/verify', data).then((res) => res.data)
