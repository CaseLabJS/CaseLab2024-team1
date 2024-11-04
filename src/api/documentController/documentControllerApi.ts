import { Document, DocumentVersion } from '@/types/sharedTypes'
import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import { DocumentModel, DocumentVersionFields, DocumentVersionModel } from './types'

const SERVICE_URL = '/documents'
class DocumentControllerApi extends BaseApi {
  getDocumentById = (id: number) =>
    this.createRequest<Document>({
      request: () => privateApi.get(`${SERVICE_URL}/${id}`),
      mock: () => import('./mock/document'),
    })
  //возвращает документ
  createDocument = (documentModel: DocumentModel) =>
    this.createRequest<Document>({
      request: () => privateApi.post(SERVICE_URL, documentModel),
      mock: () => import('./mock/document'),
    })
  //возвращает новую версию документа
  createDocumentVersion = (documentId: number, documentVersion: DocumentVersionModel) =>
    this.createRequest<DocumentVersion>({
      request: () => privateApi.put(`${SERVICE_URL}/${documentId}`, documentVersion),
      mock: () => Promise.resolve(() => documentVersion),
    })
  //возвращает новую версию документа
  patchDocumentVersion = (versionId: number, documentFields: DocumentVersionFields) =>
    this.createRequest<Document>({
      request: () => privateApi.patch(`${SERVICE_URL}/${versionId}`, documentFields),
      mock: async () => {
        const version = await this.getDocumentVersion(1, 1)
        return () => ({ ...version, ...documentFields })
      },
    })

  deleteDocument = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.delete(`${SERVICE_URL}/${id}`),
    })

  getDocuments = () =>
    this.createRequest<Document[]>({
      request: () => privateApi.get(`${SERVICE_URL}`),
      mock: async () => {
        const document = await this.getDocumentById(1)
        return () => [document]
      },
    })

  getDocumentVersion = (documentId: number, versionId: number) =>
    this.createRequest<Document>({
      request: () =>
        privateApi.get(`${SERVICE_URL}/${documentId}/${versionId}`),
      mock: async () => {
        const document = await this.getDocumentById(1)
        return () => document.documentVersions[0]
      },
    })
}

export const documentControllerApi = new DocumentControllerApi()
