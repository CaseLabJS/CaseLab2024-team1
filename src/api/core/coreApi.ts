import axios, {
  type AxiosError,
  AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { apiPath } from '@/config'
import { RequestType, RequestTypeWithData } from './types'
import { SerializedError } from './serializedError'

export abstract class CoreApi {
  protected api = axios.create({
    baseURL: apiPath,
  })

  constructor() {
    this.api.interceptors.response.use(
      <T>(response: AxiosResponse<T>) => response.data,
      (error: AxiosError<string | { error: string }>) => {
        const { status, data } = error.response ?? {
          status: error.status,
          data: 'Unknown error',
        }

        if (error.status === 401) {
          return Promise.reject(
            new SerializedError({
              status,
              message:
                'Ошибка авторизации. Предоставлены не верные логин или пароль',
            })
          )
        }

        return Promise.reject(
          new SerializedError({
            status,
            message: typeof data === 'string' ? data : data.error,
          })
        )
      }
    )
  }

  get: RequestType = (...req) => this.api.get(...req)

  post: RequestTypeWithData = (...req) => this.api.post(...req)

  patch: RequestTypeWithData = (...req) => this.api.patch(...req)

  put: RequestTypeWithData = (...req) => this.api.put(...req)

  delete: RequestType = (...req) => this.api.delete(...req)

  request = <D>(config: AxiosRequestConfig<D>): Promise<D> =>
    this.api.request(config)
}
