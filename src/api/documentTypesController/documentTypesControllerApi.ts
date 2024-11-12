import { DocumentType, NewDocumentType } from '@/types/sharedTypes'
import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import { DocumentTypesFields } from './types'
import { QueryParams } from '../core/types'

const SERVICE_URL = '/document-types'
class DocumentTypesControllerApi extends BaseApi {
  getDocumentTypeById = (id: number, queryParams?: QueryParams) =>
    this.createRequest<DocumentType>({
      request: () =>
        privateApi.get(`${SERVICE_URL}/${id}`, queryParams && { queryParams }),
      mock: () => import('./mock/documentTypes'),
    })

  createDocumentType = (newDocumentType: NewDocumentType) =>
    this.createRequest<DocumentType>({
      request: () => privateApi.post(SERVICE_URL, newDocumentType),
      mock: () => import('./mock/documentTypes'),
    })

  updateDocumentType = (id: number, documentType: NewDocumentType) =>
    this.createRequest<DocumentType>({
      request: () => privateApi.put(`${SERVICE_URL}/${id}`, documentType),
      mock: async () => {
        const type = await this.getDocumentTypeById(1)
        return () => ({ ...type, ...documentType })
      },
    })

  patchDocumentTypes = (id: number, DocumentTypesFields: DocumentTypesFields) =>
    this.createRequest<DocumentType>({
      request: () =>
        privateApi.patch(`${SERVICE_URL}/${id}`, DocumentTypesFields),
      mock: async () => {
        const type = await this.getDocumentTypeById(1)
        return () => ({ ...type, ...DocumentTypesFields })
      },
    })

  deleteDocumentTypes = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.delete(`${SERVICE_URL}/${id}`),
    })

  getDocumentTypes = (queryParams?: QueryParams) =>
    this.createRequest<DocumentType[]>({
      request: () =>
        privateApi.get(`${SERVICE_URL}`, queryParams && { queryParams }),
      mock: async () => {
        const document = await this.getDocumentTypeById(1)
        return () => [document]
      },
    })

  recover = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.patch(`${SERVICE_URL}/${id}/recover`),
    })
}

export const documentTypesControllerApi = new DocumentTypesControllerApi()
