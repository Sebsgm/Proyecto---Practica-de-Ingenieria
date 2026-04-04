export const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000"

export const ADMIN_TOKEN_KEY = "cpanel_admin_token"
export const USER_TOKEN_KEY = "user_token"

export const getUserToken = () => localStorage.getItem(USER_TOKEN_KEY)
export const setUserToken = (token: string) => localStorage.setItem(USER_TOKEN_KEY, token)
export const removeUserToken = () => localStorage.removeItem(USER_TOKEN_KEY)
export const isLoggedIn = () => Boolean(getUserToken())
