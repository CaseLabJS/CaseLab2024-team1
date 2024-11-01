import { makeAutoObservable } from 'mobx'
//import { authControllerApi } from '@/api/authController'
//import { token } from '@/lib/tokenManager'
import { SerializedError } from '@/api/core/serializedError'

class AuthStore {
  loading = false
  error: SerializedError | null = null
  isAuth = false
  isAdmin = false
  constructor() {
    makeAutoObservable(this)
  }
  login = async () => {}
  logout = async () => {}
}

export const authStore = new AuthStore()
export default authStore
