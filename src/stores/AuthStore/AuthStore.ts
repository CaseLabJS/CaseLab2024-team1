import { makeAutoObservable, autorun, runInAction } from 'mobx'
import { authControllerApi } from '@/api/authController'
import { token } from '@/lib/tokenManager'
import { SerializedError } from '@/api/core/serializedError'
import { getUserFromToken } from './helpers'
import type { TokenPayloadUser } from './types'
import { Roles } from '@/types/sharedTypes'

class AuthStore {
  loading = false
  error: SerializedError | null = null
  isAuth = false
  user: TokenPayloadUser | null = null
  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      this.checkAuth()
    })
  }
  login = async (
    { email, password }: { email: string; password: string },
    rememberMe: boolean = false
  ) => {
    this.loading = true
    this.error = null

    try {
      const { token: tokenValue } = await authControllerApi.login({
        email,
        password,
      })
      this.setToken(tokenValue, rememberMe)
      this.checkAuth()
    } catch (error) {
      this.error = error as SerializedError
    } finally {
      this.loading = false
    }
  }
  logout = () => {
    this.setToken(null, false)
    this.checkAuth()
  }
  checkAuth = (): void => {
    runInAction(() => {
      this.user = getUserFromToken(token)
      this.isAuth = !!token.value && !token.isExpired
    })
  }
  private setToken(tokenValue: string | null, rememberMe: boolean): void {
    token.storageType = rememberMe ? localStorage : sessionStorage
    token.value = tokenValue ?? ''
  }
  get isAdmin(): boolean {
    return this.user?.roles.includes(Roles.ADMIN) ?? false
  }
}

const authStore = new AuthStore()
export default authStore
