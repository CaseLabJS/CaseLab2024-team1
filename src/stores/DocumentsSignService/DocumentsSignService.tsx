import { makeAutoObservable, runInAction, reaction } from 'mobx'
import documentsListStore from '../DocumentsListStore'
import signatureListStore from '../SignatureListStore'
import type { DocumentWithSignature, GroupedSignatureRequests } from './types'
import { combineDocumentWithSignature, groupSignatureRequests } from './helpers'

class DocumentSignService {
  documents: { [key: string]: DocumentWithSignature } = {}
  signatureRequests: GroupedSignatureRequests = {}
  constructor() {
    makeAutoObservable(this)

    reaction(
      () => signatureListStore.signatureRequests,
      () => {
        this.groupSignatureRequests()
      }
    )
  }

  groupSignatureRequests = () => {
    const requests = signatureListStore.signatureRequests
    runInAction(() => {
      this.signatureRequests = groupSignatureRequests(requests)
    })
  }

  fetchSignatureRequests = async () => {
    try {
      await Promise.all([signatureListStore.fetchSignatureRequests()])
    } catch (error) {
      console.error('Error fetching all data:', error)
    }
  }
  initialFetch = async () => {
    if (Object.keys(this.signatureRequests).length === 0) {
      await this.fetchSignatureRequests()
    }
  }
  getDocumentById = async (
    documentId: number
  ): Promise<DocumentWithSignature | null> => {
    await this.initialFetch()
    try {
      if (!this.documents[documentId]) {
        const document = await documentsListStore.getDocumentById(documentId)

        if (!document) {
          return null
        }

        const documentWithSignature = combineDocumentWithSignature(
          document,
          this.signatureRequests[documentId]
        )
        this.documents[document.documentData.id] = documentWithSignature
      }
      return this.documents[documentId]
    } catch (error) {
      console.error(`Error fetching document with ID ${documentId}:`, error)
      return null
    }
  }

  get loading() {
    return documentsListStore.loading || signatureListStore.loading
  }

  get error() {
    return documentsListStore.error || signatureListStore.error
  }
}
const documentSignService = new DocumentSignService()
export default documentSignService
