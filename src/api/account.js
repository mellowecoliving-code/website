import api from './client'

export const updateProfile = (data) => api.put('/account/profile', data).then((res) => res.data)
export const getAddresses = () => api.get('/account/addresses').then((res) => res.data)
export const addAddress = (data) => api.post('/account/addresses', data).then((res) => res.data)
export const updateAddress = (id, data) =>
  api.put(`/account/addresses/${id}`, data).then((res) => res.data)
export const deleteAddress = (id) => api.delete(`/account/addresses/${id}`).then((res) => res.data)
export const getMyOrders = () => api.get('/account/orders').then((res) => res.data)
export const syncStore = (data) => api.post('/account/sync-store', data).then((res) => res.data)
