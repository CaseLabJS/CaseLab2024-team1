import { BaseApi } from '../core/baseApi'
import { publicApi } from '../core/public.api'
import { LoginData, AuthorizationModel } from './types'

const SERVICE_URL = '/auth/'
class AuthControllerApi extends BaseApi {
  login = (loginData: LoginData) =>
    this.createRequest<AuthorizationModel>({
      request: () => publicApi.post(`${SERVICE_URL}login`, loginData),
      mock: () => import('./mock/login'),
    })
}

export const authControllerApi = new AuthControllerApi()
