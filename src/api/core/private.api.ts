import { CoreApi } from './coreApi'
import { token } from '@/lib/tokenManager'

class PrivateApi extends CoreApi {
  constructor() {
    super()
    this.api.interceptors.request.use(
      (config) => {
        if (token.hasValue()) {
          config.headers.Authorization = `Bearer ${token.value}`
        }

        return config
      },
      (error) => {
        return Promise.reject(
          error instanceof Error ? error : new Error(String(error))
        )
      }
    )
  }
}

export const privateApi = new PrivateApi()
