import { Document, DocumentVersion, Comment } from '@/types/sharedTypes'
import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import {
  DocumentModel,
  DocumentTransitions,
  DocumentVersionFields,
  DocumentVersionModel,
} from './types'
import type { QueryParams } from '../core/types'

const SERVICE_URL = '/documents'
class DocumentControllerApi extends BaseApi {
  getDocumentById = (id: number, params?: QueryParams) =>
    this.createRequest<Document>({
      request: () =>
        privateApi.get(`${SERVICE_URL}/${id}`, params && { params }),
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

  getDocuments = (params?: QueryParams) =>
    this.createRequest<Document[]>({
      request: () => privateApi.get(`${SERVICE_URL}`, params && { params }),
      mock: async () => {
        const document = await this.getDocumentById(1)
        return () => [document]
      },
    })

  getDocumentVersion = (
    documentId: number,
    versionId: number,
    params?: QueryParams
  ) =>
    this.createRequest<DocumentVersion>({
      request: () =>
        privateApi.get(
          `${SERVICE_URL}/${documentId}/${versionId}`,
          params && { params }
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

  getTransitions = (id: number, params?: QueryParams) =>
    this.createRequest<DocumentTransitions[]>({
      request: () =>
        privateApi.get(
          `${SERVICE_URL}/${id}/transitions`,
          params && { params }
        ),
      mock: () => import('./mock/status'),
    })

  getDocumentsCount = (params?: QueryParams) =>
    this.createRequest<number>({
      request: () =>
        privateApi.get(`${SERVICE_URL}/countDocuments`, params && { params }),
      mock: async () => {
        const count = await Promise.resolve(1)
        return () => count
      },
    })
}

export const documentControllerApi = new DocumentControllerApi()
