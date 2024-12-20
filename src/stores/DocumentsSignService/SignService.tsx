import { makeAutoObservable, runInAction } from 'mobx'
import DocumentStore from '../DocumentStore/DocumentStore'
import documentSignService from './DocumentsSignService'
import { Signature, User } from '@/types/sharedTypes'
import { StartVoteProps, Censor } from './types'
import { isCurrentUser, isSameUser } from '@/lib'
import SR from '@/stores/SignatureRequestStore'
import SL from '@/stores/SignatureListStore'
import authorStore from '@/stores/AuthStore'
import { SignatureModel, Vote } from '@/api/signatureController'
import { filterFulfilled } from './helpers'
import { DocumentTransitions } from '@/api/documentController/types'
import { stateLabelMap } from '@/components/documentsJournal/constants'

/** SR : SignatureRequest
 * SRs : SignatureRequests
 * SL : SignatureListStore
 * SRVersionMap : SignatureRequestVersionMap
 */

export class SignService {
  document
  SRVersionMap: Record<string, SR[]> = {}
  votesMap: Record<string, Vote[]> = {}

  constructor(document: DocumentStore) {
    if (typeof document !== 'object' || document === null) {
      throw new Error('The argument must be a non-null object.')
    }

    makeAutoObservable(this)

    this.document = document
    const { id: documentId } = document.documentData
    this.SRVersionMap = documentSignService.signatureRequests[documentId] ?? {}
    this.votesMap = documentSignService.votes[documentId] ?? {}
  }

  protected signByAuthor = async (signatureModel: SignatureModel) => {
    const signature = await SL.signDocumentByAuthor(
      this.document.documentData.id,
      { ...signatureModel, placeholderTitle: 'sign by author' }
    )

    runInAction(() => {
      if (signature) {
        this.document.documentData.documentVersions
          .at(-1)!
          .signatures.push(signature)
      }
      this.document.documentData.state = DocumentTransitions.SIGNED_BY_AUTHOR
    })
  }

  protected fetchVotes = () => {
    const hasVote = this.lastVersionSR.some(({ votingId }) => votingId)
    if (hasVote) {
      void SL.fetchVotes()
    }
  }

  protected updateSRs = async () => {
    await SL.fetchSignatureRequests()

    runInAction(() => {
      this.SRVersionMap =
        documentSignService.signatureRequests[this.document.documentData.id]
    })
  }

  protected signByUser = async (signatureModel: SignatureModel) => {
    if (!this.ownSR.length) {
      await this.updateSRs()
    }
    const hasVote = this.lastVersionSR.some(({ votingId }) => votingId)
    const promises = this.ownSR.map((sr) => sr.sign(signatureModel))

    const results = await Promise.allSettled(promises)

    const signatures = filterFulfilled<Signature | null>(results)
    const successSignatures = signatures.filter(
      (signature) => signature.hash !== null
    )

    runInAction(() => {
      this.lastVersion?.signatures.push(...successSignatures)
      if (successSignatures.length) {
        this.document.documentData.state = DocumentTransitions.SIGNED
      } else if (hasVote) {
        this.document.documentData.state =
          DocumentTransitions.REJECTED_BY_VOTING
      } else {
        this.document.documentData.state = DocumentTransitions.SENT_ON_REWORK
      }
    })
  }

  sign = async (isApproved: boolean = true, placeholderTitle: string = '') => {
    const signatureModel: SignatureModel = {
      placeholderTitle,
      status: isApproved ? 'APPROVED' : 'REJECTED',
    }

    if (this.isUserAuthor) return await this.signByAuthor(signatureModel)
    void this.signByUser(signatureModel)
  }

  sendSignRequest = async (censors: Censor[]) => {
    const promises = censors.map((censor) =>
      SL.createSignatureRequest({
        documentId: this.document.documentData.id,
        documentVersionId: this.lastVersion!.versionId,
        userIdTo: censor.userData.id,
      })
    )
    const results = await Promise.allSettled(promises)

    const signatureRequestsStore = filterFulfilled<SR | null>(results)

    runInAction(() => {
      this.lastVersionSR.push(...signatureRequestsStore)
      this.document.documentData.state = DocumentTransitions.SENT_ON_SIGNING
    })
  }

  //! нужно обновить SR
  startVote = async ({
    censors,
    approvalThreshold,
    deadline,
  }: StartVoteProps) => {
    const vote = await SL.createVote({
      participantIds: censors.map((censor) => censor.userData.id),
      documentId: this.document.documentData.id,
      documentVersionId: this.lastVersion!.versionId,
      approvalThreshold,
      deadline:
        typeof deadline === 'string' ? deadline : deadline.toISOString(),
    })
    runInAction(() => {
      //this.vote = vote
      this.document.documentData.state = DocumentTransitions.SENT_ON_VOTING
    })

    return vote
  }

  addCensor = (user: User) => {
    this.censors.push(user)
  }

  isSignedBy = <T extends { id: number }>(user: T | null) => {
    if (!user) return false
    return this.lastVersion?.signatures.some((signature) =>
      isSameUser(signature.user, user)
    )
  }

  get lastVersion() {
    return this.document.documentData.documentVersions.at(-1)
  }

  get author() {
    return this.document.documentData.user
  }

  get isUserAuthor() {
    return !!authorStore.user && isSameUser(this.author, authorStore.user)
  }

  get isSignedByAuthor() {
    return (
      this.document.documentData.state ===
        DocumentTransitions.SIGNED_BY_AUTHOR || this.isSignedBy(this.author)
    )
  }
  get isSignedByUser() {
    return this.isSignedBy(authorStore.user)
  }

  get isSignedByCensors() {
    return this.censors.every((censor) => this.isSignedBy(censor))
  }

  protected get lastVersionSR(): SR[] {
    if (!this.SRVersionMap) return []
    const lastVersionId = this.lastVersion?.versionId
    return lastVersionId && lastVersionId in this.SRVersionMap
      ? this.SRVersionMap[lastVersionId]
      : []
  }

  get ownSR() {
    return this.lastVersionSR.filter(({ userTo }) => isCurrentUser(userTo))
  }

  get censors() {
    return this.lastVersionSR.map(({ userTo }) => userTo)
  }

  get id() {
    return this.document.documentData.id
  }

  get signState() {
    const { state } = this.document.documentData

    if (!this.isSignedByUser) return 'Не подписан'
    if (state === DocumentTransitions.SIGNED) return 'Подписан'
    if (this.isSignedByAuthor) {
      return stateLabelMap[state] || 'Ждет отправки на согласование'
    }

    return '?'
  }
}
