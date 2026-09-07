import api from './client'

export const getProducts = (params) => api.get('/products', { params }).then((res) => res.data)
export const getProduct = (id) => api.get(`/products/${id}`).then((res) => res.data)
