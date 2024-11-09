import { Attribute, NewAttribute } from '@/types/sharedTypes'
import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import { AttributeFields } from './types'
import { QueryParams } from '../core/types'

const SERVICE_URL = '/attributes'
class AttributeControllerApi extends BaseApi {
  getAttributeById = (id: number, queryParams?: QueryParams) =>
    this.createRequest<Attribute>({
      request: () =>
        privateApi.get(
          `${SERVICE_URL}/${id}`,
          queryParams ? { queryParams } : {}
        ),
      mock: () => import('./mock/attribute'),
    })

  createAttribute = (newAttribute: NewAttribute) =>
    this.createRequest<Attribute>({
      request: () => privateApi.post(SERVICE_URL, newAttribute),
      mock: () => import('./mock/attribute'),
    })

  updateAttribute = (id: number, attribute: NewAttribute) =>
    this.createRequest<Attribute>({
      request: () => privateApi.put(`${SERVICE_URL}/${id}`, attribute),
      mock: () => import('./mock/attribute'),
    })

  patchAttribute = (id: number, AttributeFields: AttributeFields) =>
    this.createRequest<Attribute>({
      request: () => privateApi.patch(`${SERVICE_URL}/${id}`, AttributeFields),
      mock: async () => {
        const type = await this.getAttributeById(1)
        return () => ({ ...type, ...AttributeFields })
      },
    })

  deleteAttribute = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.delete(`${SERVICE_URL}/${id}`),
    })

  getAttributes = (queryParams?: QueryParams) =>
    this.createRequest<Attribute[]>({
      request: () =>
        privateApi.get(`${SERVICE_URL}`, queryParams && { queryParams }),
      mock: async () => {
        const attribute = await this.getAttributeById(1)
        return () => [attribute]
      },
    })

  recover = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.patch(`${SERVICE_URL}/${id}/recover`),
    })
}
