import type { AxiosRequestConfig } from 'axios'

export type BaseApiRequest = {
  request: () => Promise<never>
  // any, т.к. lazy импорт нормально не типизируется
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mock?: () => Promise<any>
}

export type RequestType = <D, R>(
  url: string,
  config?: AxiosRequestConfig<D>
) => Promise<R>

export type RequestTypeWithData = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
) => Promise<R>
