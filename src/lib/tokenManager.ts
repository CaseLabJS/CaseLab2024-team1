import { decodeJwt } from './jwtDecoder'
import { JwtHeader, JwtPayload } from './types'

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'

export class TokenManager {
  private token: string | null = null
  private storage: Storage = sessionStorage
  private decodedToken: { header: JwtHeader; payload: JwtPayload } | null = null

  private getTokenFromStorage(): string | null {
    return (
      sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
      localStorage.getItem(ACCESS_TOKEN_KEY)
    )
  }

  get value(): string | null {
    this.token ??= this.getTokenFromStorage()
    return this.token
  }

  set value(token: string | null) {
    this.token = token
    if (token) {
      this.storage.setItem(ACCESS_TOKEN_KEY, token)
    } else {
      sessionStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
  }

  get payload() {
    if (!this.value) return null
    this.decodedToken ??= decodeJwt(this.value)
    return this.decodedToken?.payload
  }

  get isExpired() {
    const exp = this.payload?.exp
    return exp ? exp * 1000 < Date.now() : true
  }

  set storageType(storageType: Storage) {
    this.storage = storageType
  }

  hasValue() {
    return !!this.value
  }

  clear() {
    this.value = null
    this.decodedToken = null
  }
}

export const token = new TokenManager()
