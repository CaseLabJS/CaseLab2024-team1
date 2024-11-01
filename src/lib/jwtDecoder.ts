import { JwtHeader, JwtPayload } from './types'

function decodeBase64Url(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )

  return jsonPayload
}

export function decodeJwt(
  token: string
): { header: JwtHeader; payload: JwtPayload } | null {
  try {
    const [header, payload] = token.split('.').slice(0, 2).map(decodeBase64Url)
    return {
      header: JSON.parse(header) as JwtHeader,
      payload: JSON.parse(payload) as JwtPayload,
    }
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}
