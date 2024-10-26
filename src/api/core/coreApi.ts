import axios, {
    type AxiosError,
    AxiosRequestConfig,
    type AxiosResponse,
} from 'axios'
import { apiPath } from '@/config'
import { RequestType, RequestTypeWithData } from '../types'

export abstract class CoreApi {
    protected api = axios.create({
        baseURL: apiPath,
    })

    constructor() {
        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                const { response, code } = error
                const statusCode = response?.status
                console.error(error, statusCode)

                if (statusCode === 401) {
                    return Promise.reject(error)
                }

                if (statusCode === 404) {
                    return Promise.reject(error)
                }

                if (statusCode === 500) {
                    return Promise.reject(error)
                }

                return Promise.reject({
                    ...(statusCode && { code: statusCode ?? code }),
                    message: JSON.stringify(error),
                })
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
