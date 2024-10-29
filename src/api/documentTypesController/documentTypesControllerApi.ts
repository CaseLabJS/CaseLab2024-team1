import { DocumentType } from '@/types/sharedTypes'
import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import { DocumentTypesFields, DocumentTypesModel } from './types'

const SERVICE_URL = '/document-types'
class DocumentTypesControllerApi extends BaseApi {
  getDocumentTypesById = (id: number) =>
    this.createRequest<DocumentType>({
      request: () => privateApi.get(`${SERVICE_URL}/${id}`),
      mock: () => import('./mock/documentTypes'),
    })

  createDocumentTypes = (documentModel: DocumentTypesModel) =>
    this.createRequest<DocumentType>({
      request: () => privateApi.post(SERVICE_URL, documentModel),
      mock: () => import('./mock/documentTypes'),
    })

  updateDocumentTypes = (documentType: DocumentType) =>
    this.createRequest<DocumentType>({
      request: () =>
        privateApi.put(`${SERVICE_URL}/${documentType.id}`, documentType),
      mock: async () => {
        const type = await this.getDocumentTypesById(1)
        return () => ({ ...type, ...documentType })
      },
    })

  patchDocumentTypes = (id: number, DocumentTypesFields: DocumentTypesFields) =>
    this.createRequest<Document>({
      request: () =>
        privateApi.patch(`${SERVICE_URL}/${id}`, DocumentTypesFields),
      mock: async () => {
        const type = await this.getDocumentTypesById(1)
        return () => ({ ...type, ...DocumentTypesFields })
      },
    })

  deleteDocumentTypes = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.delete(`${SERVICE_URL}/${id}`),
    })

  getDocumentsTypes = () =>
    this.createRequest<Document[]>({
      request: () => privateApi.get(`${SERVICE_URL}`),
      mock: async () => {
        const document = await this.getDocumentTypesById(1)
        return () => [document]
      },
    })
}

export const documentTypesControllerApi = new DocumentTypesControllerApi()
