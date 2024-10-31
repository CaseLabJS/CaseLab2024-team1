import { makeAutoObservable } from 'mobx'
import { authControllerApi } from '@/api/authController'
import { token } from '@/lib/tokenManager'
import { SerializedError } from '@/api/core/serializedError'

class AuthStore {
  loading = false
  error: SerializedError | null = null

  constructor() {
    makeAutoObservable(this)
  }
  async login(
    { email, password }: { email: string; password: string },
    rememberMe: boolean = false
  ) {
    this.loading = true
    this.error = null

    try {
      const { token: tokenValue } = await authControllerApi.login({
        email,
        password,
      })
      token.storageType = rememberMe ? 'localStorage' : 'sessionStorage'
      token.value = tokenValue
    } catch (error) {
      this.error = error as SerializedError
    } finally {
      this.loading = false
    }
  }

  get isAuth() {
    return token.value && !token.isExpired
  }

  get isAdmin() {
    return token.payload?.sub === 'admin'
  }
}

export const authStore = new AuthStore()
export default authStore
