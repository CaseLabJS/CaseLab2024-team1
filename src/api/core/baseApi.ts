import { isMockEnv } from '@/config'
import { BaseApiRequest } from './types'

export abstract class BaseApi {
  createRequest = <T>({ mock, request }: BaseApiRequest<T>): Promise<T> => {
    if (isMockEnv && mock) {
      return mock()
        .then(
          (
            module: { default: AnyFunction<T> } | AnyFunction<T>
          ): AnyFunction<T> => {
            return 'default' in module ? module.default : module
          }
        )
        .then((fn) => fn())
    }

    if (isMockEnv) {
      return Promise.resolve<T>({} as T)
    }

    return request()
  }
}
