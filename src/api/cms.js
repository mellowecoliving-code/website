import api from './client'

export const getAllCmsContent = () => api.get('/cms').then((res) => res.data)
