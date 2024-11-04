import { makeAutoObservable, autorun, runInAction } from 'mobx'
import { authControllerApi } from '@/api/authController'
import { token } from '@/lib/tokenManager'
import { SerializedError } from '@/api/core/serializedError'

class AuthStore {
  loading = false
  error: SerializedError | null = null
  isAuth = false
  isAdmin = false
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
      this.isAdmin = token.payload?.sub === 'admin'
      this.isAuth = !!token.value && !token.isExpired
    })
  }
  private setToken(tokenValue: string | null, rememberMe: boolean): void {
    token.storageType = rememberMe ? localStorage : sessionStorage
    token.value = tokenValue ?? ''
  }
}

const authStore = new AuthStore()
export default authStore
