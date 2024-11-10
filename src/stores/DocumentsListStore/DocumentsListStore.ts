import { makeAutoObservable } from 'mobx'
import DocumentStore from '@/stores/DocumentStore/DocumentStore.ts'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { documentControllerApi, DocumentModel } from '@/api/documentController'
import { SerializedError } from '@/api/core/serializedError.ts'

class DocumentsListStore {
  documents: InstanceType<typeof DocumentStore>[] = []
  loading: boolean = false
  error: SerializedError | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async fetchDocuments() {
    const fetchedDocuments = await executeWithLoading(this, async () =>
      documentControllerApi.getDocuments()
    )

    if (fetchedDocuments) {
      this.documents = fetchedDocuments.map(
        (documentData) => new DocumentStore(documentData)
      )
    }
  }

  async getDocumentById(documentId: number) {
    return await executeWithLoading(this, async () =>
      documentControllerApi.getDocumentById(documentId)
    )
  }

  async createDocument(document: DocumentModel) {
    const createdDocument = await executeWithLoading(this, () =>
      documentControllerApi.createDocument(document)
    )

    if (createdDocument) {
      this.documents = [...this.documents, new DocumentStore(createdDocument)]
    }
  }

  async deleteDocument(documentId: number) {
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
    this.documents = this.documents.filter(
      (currentDocument) => currentDocument.documentData.id !== documentId
    )
  }
}

export default DocumentsListStore
