import { makeAutoObservable, runInAction, reaction } from 'mobx'
import documentsListStore from '../DocumentsListStore'
import signatureListStore from '../SignatureListStore'
import type { DocumentWithSignature, VersionGroup } from './types'
import { combineDocumentWithSignature, groupByVersions } from './helpers'
import DocumentStore from '../DocumentStore'
import SignatureRequestStore from '../SignatureRequestStore'
import { Vote } from '@/api/signatureController'

//* SRs - SignatureRequests

class DocumentSignService {
  isSRsFetched: boolean = false
  documents: { [key: string]: DocumentWithSignature } = {}
  signatureRequests: VersionGroup<SignatureRequestStore[]> = {}
  votes: VersionGroup<Vote[]> = {}
  constructor() {
    makeAutoObservable(this)

    reaction(
      () => [signatureListStore.signatureRequests, signatureListStore.votes],
      () => {
        this.groupVoteAndSRs()
      }
    )
  }

  groupVoteAndSRs = () => {
    const requests = signatureListStore.signatureRequests
    const votes = signatureListStore.votes
    runInAction(() => {
      this.signatureRequests = groupByVersions(requests)
      this.votes = groupByVersions(votes)
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
    if (!this.isSRsFetched) {
      await this.fetchSignatureRequests()
      await signatureListStore.fetchVotes()
      this.isSRsFetched = true
    }
  }
  wrapWithSignature = async (document: DocumentStore) => {
    await this.initialFetch()

    const documentWithSignature = combineDocumentWithSignature(document)
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
