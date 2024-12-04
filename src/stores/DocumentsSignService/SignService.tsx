import { makeAutoObservable, runInAction } from 'mobx'
import DocumentStore from '../DocumentStore/DocumentStore'
import documentSignService from './DocumentsSignService'
import { Signature, User } from '@/types/sharedTypes'
import { SignatureRequestVersionMap, StartVoteProps, Censor } from './types'
import { isCurrentUser, isSameUser } from '@/lib'
import SR from '@/stores/SignatureRequestStore'
import SL from '@/stores/SignatureListStore'
import authorStore from '@/stores/AuthStore'
import { SignatureModel } from '@/api/signatureController'
import { filterFulfilled } from './helpers'

/** SR : SignatureRequest
 * SRs : SignatureRequests
 * SL : SignatureListStore
 * SRVersionMap : SignatureRequestVersionMap
 */

export class SignService {
  document
  SRVersionMap: SignatureRequestVersionMap

  constructor(document: DocumentStore) {
    if (typeof document !== 'object' || document === null) {
      throw new Error('The argument must be a non-null object.')
    }

    makeAutoObservable(this)

    this.document = document
    //! загрузить голосование если voteID не пустой
    this.SRVersionMap =
      documentSignService.signatureRequests[document.documentData.id] ?? {}
  }

  protected signByAuthor = async (signatureModel: SignatureModel) => {
    const signature = await SL.signDocumentByAuthor(
      this.document.documentData.id,
      { ...signatureModel, placeholderTitle: 'sign by author' }
    )

    if (signature) {
      runInAction(() => {
        this.document.documentData.documentVersions
          .at(-1)!
          .signatures.push(signature)
      })
    }
  }

  protected signByUser = async (signatureModel: SignatureModel) => {
    const promises = this.ownSR.map((sr) => sr.sign(signatureModel))

    const results = await Promise.allSettled(promises)

    const signatures = filterFulfilled<Signature | null>(results)

    runInAction(() => {
      this.lastVersion?.signatures.push(...signatures)
    })
  }

  sign = async (isApproved: boolean = true) => {
    const signatureModel: SignatureModel = {
      placeholderTitle: '',
      status: isApproved ? 'APPROVED' : 'REJECTED',
    }

    if (this.isUserAuthor) return await this.signByAuthor(signatureModel)

    void (await this.signByUser(signatureModel))
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
    return vote
  }

  cancelVote = (censors: User[]) => {
    console.log('startVote', censors)
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
    return this.isSignedBy(authorStore.user)
  }
  get isSignedByUser() {
    return this.isSignedBy(this.author)
  }

  protected get lastVersionSR(): SR[] {
    const lastVersionId = this.lastVersion?.id
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
}
