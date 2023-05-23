import Cookies from 'js-cookie'

const TokenKey = 'work-token'
export const getToken = () => {
  return Cookies.get(TokenKey)
}
export const setToken = (token) => {
  return Cookies.set(TokenKey, token)
}

export function getTokenKey() {
  return TokenKey
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * @returns {string}
 */
export function getBaseHref() {
  return (
    window.location.protocol +
    '//' +
    window.location.host +
    (import.meta.env.BASE_URL.length > 1 ? import.meta.env.BASE_URL : '')
  )
}
