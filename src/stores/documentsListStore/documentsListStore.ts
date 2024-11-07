import { makeAutoObservable } from 'mobx'
import DocumentStore from '@/stores/documentStore/documentStore.ts'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { documentControllerApi, DocumentModel } from '@/api/documentController'

class DocumentsListStore {
  documents: InstanceType<typeof DocumentStore>[] = []
  loading: boolean = false
  error: string | null = null

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
      this.documents.push(new DocumentStore(createdDocument))
    }
  }

  async deleteDocument(documentId: number) {
    await executeWithLoading(this, () =>
      documentControllerApi.deleteDocument(documentId)
    )

    this.documents = this.documents.filter(
      (currentDocument) => currentDocument.documentData.id !== documentId
    )
  }
}

export default DocumentsListStore
