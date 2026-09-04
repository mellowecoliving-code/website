import api from './client'

export const signup = (data) => api.post('/auth/signup', data).then((res) => res.data)
export const login = (data) => api.post('/auth/login', data).then((res) => res.data)
export const logout = () => api.post('/auth/logout').then((res) => res.data)
export const getMe = () => api.get('/auth/me').then((res) => res.data)

export const sendOtp = (phone) => api.post('/auth/phone/send-otp', { phone }).then((res) => res.data)
export const verifyOtp = (phone, code) =>
  api.post('/auth/phone/verify-otp', { phone, code }).then((res) => res.data)

export const googleLogin = (credential) =>
  api.post('/auth/google', { credential }).then((res) => res.data)
