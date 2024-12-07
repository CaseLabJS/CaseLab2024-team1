import { Document, DocumentVersion } from '@/types/sharedTypes.ts'
import { SerializedError } from '@/api/core/serializedError.ts'
import { makeAutoObservable, runInAction } from 'mobx'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { documentControllerApi } from '@/api/documentController'
import documentsListStore from '@/stores/DocumentsListStore'

class SearchStore {
  allDocuments: Document[] = []
  loading: boolean = false
  error: SerializedError | null = null
  searchHistory: DocumentVersion[] = []

  constructor() {
    makeAutoObservable(this)
  }

  fetchAllDocuments = async () => {
    const { documentsSize } = documentsListStore

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
}

const searchStore = new SearchStore()
export default searchStore
