import { Attribute } from '@/types/sharedTypes'
import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import { AttributeFields, AttributeModel } from './types'

const SERVICE_URL = '/attributes'
class AttributeControllerApi extends BaseApi {
  getAttributeById = (id: number) =>
    this.createRequest<Attribute>({
      request: () => privateApi.get(`${SERVICE_URL}/${id}`),
      mock: () => import('./mock/attribute'),
    })

  createAttribute = (attributeModel: AttributeModel) =>
    this.createRequest<Attribute>({
      request: () => privateApi.post(SERVICE_URL, attributeModel),
      mock: () => import('./mock/attribute'),
    })

  updateAttribute = (attribute: AttributeModel) =>
    this.createRequest<Attribute>({
      request: () =>
        privateApi.put(`${SERVICE_URL}/${attribute.id}`, attribute),
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

  getAttributes = () =>
    this.createRequest<Attribute[]>({
      request: () => privateApi.get(`${SERVICE_URL}`),
      mock: async () => {
        const attribute = await this.getAttributeById(1)
        return () => [attribute]
      },
    })
}

export const attributeControllerApi = new AttributeControllerApi()