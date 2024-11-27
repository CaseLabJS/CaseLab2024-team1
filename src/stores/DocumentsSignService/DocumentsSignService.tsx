import { makeAutoObservable, runInAction, reaction } from 'mobx'
import documentsListStore from '../DocumentsListStore'
import signatureListStore from '../SignatureListStore'
import type { DocumentWithSignature, GroupedSignatureRequests } from './types'
import { combineDocumentWithSignature, groupSignatureRequests } from './helpers'
import DocumentStore from '../DocumentStore'

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
    /** Возможно необходима фильтрация по пользователю */
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
  wrapWithSignature = async (document: DocumentStore) => {
    await this.initialFetch()

    const documentWithSignature = combineDocumentWithSignature(
      document,
      this.signatureRequests[document.documentData.id]
    )
    //this.documents[document.documentData.id] = documentWithSignature
    return documentWithSignature
  }
  fetchDocumentById = async (documentId: number): Promise<void> => {
    try {
      if (!this.documents[documentId]) {
        const document = await documentsListStore.getDocumentById(documentId)

        if (!document) {
          throw new Error(`Document with ID ${documentId} not found.`)
        }
        const documentWithSignature = await this.wrapWithSignature(document)
        runInAction(() => {
          this.documents[documentId] = documentWithSignature
        })
      }
    } catch (error) {
      console.error(`Error fetching document with ID ${documentId}:`, error)
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
