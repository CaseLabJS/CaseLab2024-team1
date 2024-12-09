import { makeAutoObservable, runInAction } from 'mobx'
import DocumentStore from '@/stores/DocumentStore/DocumentStore.ts'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { documentControllerApi, DocumentModel } from '@/api/documentController'
import { SerializedError } from '@/api/core/serializedError.ts'
import type { QueryParams } from '@/api/core/types.ts'
import { DocumentVersion } from '@/types/sharedTypes.ts'

class DocumentsListStore {
  documents: InstanceType<typeof DocumentStore>[] = []
  documentsSize: number = 0
  loading: boolean = false
  error: SerializedError | null = null

  constructor() {
    makeAutoObservable(this)
  }

  fetchDocuments = async (queryParams?: QueryParams) => {
    const fetchedDocuments = await executeWithLoading(this, async () =>
      documentControllerApi.getDocuments(queryParams)
    )

    if (fetchedDocuments) {
      runInAction(() => {
        this.documents = fetchedDocuments.map(
          (documentData) => new DocumentStore(documentData)
        )
      })
    }
  }

  getDocumentById = async (documentId: number, isAlive?: boolean) => {
    const document = await executeWithLoading(this, async () =>
      documentControllerApi.getDocumentById(documentId, { isAlive })
    )

    if (document) {
      return new DocumentStore(document)
    }
  }

  createDocument = async (document: DocumentModel, isDraft?: boolean) => {
    const createdDocument = await executeWithLoading(this, () =>
      documentControllerApi.createDocument(document, { isDraft })
    )

    if (createdDocument) {
      runInAction(() => {
        this.documents = [...this.documents, new DocumentStore(createdDocument)]
      })
    }

    return createdDocument
  }

  deleteDocument = async (documentId: number) => {
    const documentExists = this.documents.some(
      (doc) => doc.documentData.id === documentId
    )
    if (!documentExists) {
      console.warn(`Document with ID ${documentId} does not exist.`)
      return
    }

    await executeWithLoading(this, () =>
      documentControllerApi.deleteDocument(documentId)
    )

    if (!this.error) {
      runInAction(() => {
        this.documents = this.documents.filter(
          (currentDocument) => currentDocument.documentData.id !== documentId
        )
      })
    }
  }

  recoverDocument = async (documentId: number) => {
    const documentExists = this.documents.some(
      (doc) => doc.documentData.id === documentId
    )
    if (!documentExists) {
      console.warn(`Document with ID ${documentId} does not exist.`)
      return
    }

    await executeWithLoading(this, () =>
      documentControllerApi.recover(documentId)
    )

    if (!this.error) {
      runInAction(() => {
        this.documents = this.documents.filter(
          (currentDocument) => currentDocument.documentData.id !== documentId
        )
      })
    }
  }

  countTotalDocuments = async (isAlive?: boolean, showDraft?: boolean) => {
    const countDocuments = await executeWithLoading(this, () =>
      documentControllerApi.getDocumentsCount({ isAlive, showDraft })
    )

    if (countDocuments) {
      runInAction(() => {
        this.documentsSize = countDocuments
      })
    }

    return countDocuments
  }

  updateDocumentVersion = (
    documentId: number,
    updatedVersion: DocumentVersion
  ) => {
    const findDocument = this.documents.find(
      (doc) => doc.documentData.id === documentId
    )

    if (!findDocument) {
      console.warn(`Document with ID ${documentId} does not exist.`)
      return
    }

    runInAction(() => {
      this.documents = this.documents.map((document) => {
        if (document.documentData.id === documentId) {
          document.documentData.documentVersions.push(updatedVersion)
        }
        return document
      })
    })
  }
}

const documentsListStore = new DocumentsListStore()
export default documentsListStore
