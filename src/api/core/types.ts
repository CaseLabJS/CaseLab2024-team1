import type { AxiosRequestConfig } from 'axios'

export type BaseApiRequest<T> = {
  request: () => Promise<T>
  // any, т.к. lazy импорт нормально не типизируется
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mock?: () => Promise<any>
}

export type QueryParams = Partial<{
  showOnlyAlive: boolean
  page: number
  size: number
  ascending: boolean
}>

export interface CustomAxiosRequestConfig<T = unknown>
  extends AxiosRequestConfig<T> {
  queryParams?: QueryParams
}

export type RequestType = <D, R>(
  url: string,
  config?: CustomAxiosRequestConfig<D>
) => Promise<R>

export type RequestTypeWithData = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
) => Promise<R>
