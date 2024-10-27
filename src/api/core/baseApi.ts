import { isMockEnv } from '@/config'
import { BaseApiRequest } from '../types'

export abstract class BaseApi {
  createRequest = <T>({ mock, request }: BaseApiRequest): Promise<T> => {
    if (isMockEnv && mock) {
      return mock()
        .then((module) => {
          return 'default' in module ? module.default : module
        })
        .then((fn) => fn())
    }

    if (isMockEnv) {
      return Promise.resolve<T>({} as T)
    }

    return request()
  }
}
