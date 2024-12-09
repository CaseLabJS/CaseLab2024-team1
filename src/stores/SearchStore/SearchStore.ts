import { Document, DocumentVersion } from '@/types/sharedTypes.ts'
import { SerializedError } from '@/api/core/serializedError.ts'
import { makeAutoObservable, runInAction } from 'mobx'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { documentControllerApi } from '@/api/documentController'

class SearchStore {
  allDocuments: Document[] = []
  loading: boolean = false
  error: SerializedError | null = null
  searchHistory: DocumentVersion[] = []

  constructor() {
    makeAutoObservable(this)
  }

  fetchAllDocuments = async (documentsSize: number) => {
    await this.loadDocuments(documentsSize)
  }

  private loadDocuments = async (size: number) => {
    const fetchedDocuments = await executeWithLoading(this, async () =>
      documentControllerApi.getDocuments({ size })
    )

    if (fetchedDocuments) {
      runInAction(() => {
        this.allDocuments = fetchedDocuments
      })
    }
  }

  addToSearchHistory = (documentVersion: DocumentVersion) => {
    if (!this.searchHistory.includes(documentVersion)) {
      runInAction(() => {
        this.searchHistory.push(documentVersion)
      })
    }
  }

  findDocumentById = (id: number) => {
    return this.allDocuments.find((document) => document.id === id) || null
  }
}

const searchStore = new SearchStore()
export default searchStore
