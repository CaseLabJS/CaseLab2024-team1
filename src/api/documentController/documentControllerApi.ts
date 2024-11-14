import { Document, DocumentVersion, Comment } from '@/types/sharedTypes'
import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import {
  DocumentModel,
  DocumentVersionFields,
  DocumentVersionModel,
} from './types'
import type { QueryParams } from '../core/types'

const SERVICE_URL = '/documents'
class DocumentControllerApi extends BaseApi {
  getDocumentById = (id: number, queryParams?: QueryParams) =>
    this.createRequest<Document>({
      request: () =>
        privateApi.get(
          `${SERVICE_URL}/${id}`,
          queryParams ? { queryParams } : {}
        ),
      mock: () => import('./mock/document'),
    })
  //возвращает документ
  createDocument = (documentModel: DocumentModel) =>
    this.createRequest<Document>({
      request: () => privateApi.post(SERVICE_URL, documentModel),
      mock: () => import('./mock/document'),
    })
  //возвращает новую версию документа
  createDocumentVersion = (
    documentId: number,
    documentVersion: DocumentVersionModel
  ) =>
    this.createRequest<DocumentVersion>({
      request: () =>
        privateApi.put(`${SERVICE_URL}/${documentId}`, documentVersion),
      mock: () => Promise.resolve(() => documentVersion),
    })
  //возвращает новую версию документа
  patchDocumentVersion = (
    documentId: number,
    documentFields: DocumentVersionFields
  ) =>
    this.createRequest<Document>({
      request: () =>
        privateApi.patch(`${SERVICE_URL}/${documentId}`, documentFields),
      mock: async () => {
        const version = await this.getDocumentVersion(1, 1)
        return () => ({ ...version, ...documentFields })
      },
    })

  deleteDocument = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.delete(`${SERVICE_URL}/${id}`),
    })

  getDocuments = (queryParams?: QueryParams) =>
    this.createRequest<Document[]>({
      request: () =>
        privateApi.get(`${SERVICE_URL}`, queryParams && { queryParams }),
      mock: async () => {
        const document = await this.getDocumentById(1)
        return () => [document]
      },
    })

  getDocumentVersion = (
    documentId: number,
    versionId: number,
    queryParams?: QueryParams
  ) =>
    this.createRequest<Document>({
      request: () =>
        privateApi.get(
          `${SERVICE_URL}/${documentId}/${versionId}`,
          queryParams && { queryParams }
        ),
      mock: async () => {
        const document = await this.getDocumentById(1)
        return () => document.documentVersions[0]
      },
    })

  addComment = (documentId: number, comment: string) =>
    this.createRequest<Comment>({
      request: () =>
        privateApi.post(`${SERVICE_URL}/${documentId}/comment`, {
          content: comment,
        }),
      mock: async () => {
        const document = await this.getDocumentById(1)
        return () => ({
          author: document.user,
          id: 2,
          content: comment,
          createdAt: new Date().toISOString(),
        })
      },
    })

  recover = (documentId: number) =>
    this.createRequest<never>({
      request: () => privateApi.patch(`${SERVICE_URL}/${documentId}/recover`),
    })

  getTransactions = (id: number, queryParams?: QueryParams) =>
    this.createRequest<Document>({
      request: () =>
        privateApi.get(
          `${SERVICE_URL}/${id}/transactions`,
          queryParams ? { queryParams } : {}
        ),
      mock: () => import('./mock/status'),
    })
}

export const documentControllerApi = new DocumentControllerApi()
