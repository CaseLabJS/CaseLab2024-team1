import { makeAutoObservable } from 'mobx'
import {
  documentControllerApi,
  DocumentVersionModel,
} from '@/api/documentController'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { Document } from '@/types/sharedTypes.ts'

class DocumentStore {
  documentData: Document
  loading: boolean = false
  error: string | null = null

  constructor(document: Document) {
    makeAutoObservable(this)

    this.documentData = document
  }

  async patchDocumentVersion(
    versionId: number,
    fields: Partial<DocumentVersionModel>
  ) {
    const patchedDocument = await executeWithLoading(this, () =>
      documentControllerApi.patchDocumentVersion(versionId, fields)
    )

    if (patchedDocument) {
      this.documentData = patchedDocument
    }
  }

  async createDocumentVersion(
    documentId: number,
    documentVersion: DocumentVersionModel
  ) {
    const createDocumentVersion = await executeWithLoading(this, () =>
      documentControllerApi.createDocumentVersion(documentId, documentVersion)
    )

    if (createDocumentVersion) {
      this.documentData.documentVersions.push(createDocumentVersion)
    }
  }
}

export default DocumentStore
