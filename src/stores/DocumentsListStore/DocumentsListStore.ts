import { makeAutoObservable, runInAction } from 'mobx'
import DocumentStore from '@/stores/DocumentStore/DocumentStore.ts'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { documentControllerApi, DocumentModel } from '@/api/documentController'
import { SerializedError } from '@/api/core/serializedError.ts'
import type { QueryParams } from '@/api/core/types.ts'

class DocumentsListStore {
  documents: InstanceType<typeof DocumentStore>[] = []
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

  getDocumentById = async (documentId: number, showOnlyAlive?: boolean) => {
    const document = await executeWithLoading(this, async () =>
      documentControllerApi.getDocumentById(documentId, { showOnlyAlive })
    )

    if (document) {
      return new DocumentStore(document)
    }
  }

  createDocument = async (document: DocumentModel) => {
    const createdDocument = await executeWithLoading(this, () =>
      documentControllerApi.createDocument(document)
    )

    if (createdDocument) {
      runInAction(() => {
        this.documents = [...this.documents, new DocumentStore(createdDocument)]
      })
    }
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
}

const documentsListStore = new DocumentsListStore()
export default documentsListStore