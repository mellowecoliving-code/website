import { createContext, useContext, useEffect, useState } from 'react'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authApi
      .getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const signup = async (data) => {
    const newUser = await authApi.signup(data)
    setUser(newUser)
    return newUser
  }

  const login = async (data) => {
    const loggedInUser = await authApi.login(data)
    setUser(loggedInUser)
    return loggedInUser
  }

  const logout = async () => {
    await authApi.logout()
    setUser(null)
  }

  const sendOtp = (phone) => authApi.sendOtp(phone)

  const verifyOtp = async (phone, code) => {
    const loggedInUser = await authApi.verifyOtp(phone, code)
    setUser(loggedInUser)
    return loggedInUser
  }

  const googleLogin = async (credential) => {
    const loggedInUser = await authApi.googleLogin(credential)
    setUser(loggedInUser)
    return loggedInUser
  }

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: Boolean(user),
    signup,
    login,
    logout,
    sendOtp,
    verifyOtp,
    googleLogin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
