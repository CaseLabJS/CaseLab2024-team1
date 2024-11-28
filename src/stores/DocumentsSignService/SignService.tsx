import { makeAutoObservable, runInAction, toJS } from 'mobx'
import DocumentStore from '../DocumentStore/DocumentStore'
import { User } from '@/types/sharedTypes'
import {
  SignatureRequestVersionMap as SRVersionMap,
  StartVoteProps,
} from './types'
import { isCurrentUser, isSameUser } from '@/lib'
import SR from '@/stores/SignatureRequestStore'
import SL from '@/stores/SignatureListStore'
import authorStore from '@/stores/AuthStore'
//import { signatureModel } from './constants'
import { SignatureModel } from '@/api/signatureController'
import { Censor } from '@/components/signatureBlock/types'

/** SR : SignatureRequest
 * SL : SignatureListStore
 * SRVersionMap : SignatureRequestVersionMap
 */

export class SignService {
  document
  SRVersionMap
  status: string = 'created'
  isSignedByAuthor: boolean = false
  isSignedByUser: boolean = false
  constructor(document: DocumentStore, SRVersionMap: SRVersionMap) {
    if (typeof document !== 'object' || document === null) {
      throw new Error('The argument must be a non-null object.')
    }

    makeAutoObservable(this)

    this.document = document
    this.SRVersionMap = SRVersionMap ?? {}
    this.checkIsSigned()
  }

  protected checkIsSigned() {
    runInAction(() => {
      this.isSignedByAuthor = this.isSignedBy(authorStore.user)
      this.isSignedByUser = this.isSignedBy(this.author)
    })
    console.log(toJS(this.isSignedByAuthor))
  }

  protected signByAuthor = async (signatureModel: SignatureModel) => {
    const signature = await SL.signDocumentByAuthor(
      this.document.documentData.id,
      signatureModel
    )

    if (signature) {
      runInAction(() => {
        this.document.documentData.documentVersions
          .at(-1)!
          .signatures.push(signature)
      })
      this.checkIsSigned()
    }
  }

  protected signByUser = async (signatureModel: SignatureModel) => {
    const promises = this.lastVersionSR.map((sr) => sr.sign(signatureModel))

    const results = await Promise.allSettled(promises)

    const signatures = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value)
      .filter((signature) => signature !== undefined)

    runInAction(() => {
      this.lastVersion!.signatures.push(...signatures)
      this.checkIsSigned()
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
        documentVersionId: this.lastVersion!.id,
        userIdTo: censor.userData.id,
      })
    )
    return await Promise.allSettled(promises)
  }

  startVote = async ({
    censors,
    approvalThreshold,
    deadline,
  }: StartVoteProps) => {
    return await SL.createVote({
      participantIds: censors.map((censor) => censor.userData.id),
      documentId: this.document.documentData.id,
      documentVersionId: this.lastVersion!.id,
      approvalThreshold,
      deadline:
        typeof deadline === 'string' ? deadline : deadline.toISOString(),
    })
  }

  cancelVote = (censors: User[]) => {
    console.log('startVote', censors)
  }

  addCensor = (user: User) => {
    this.censors.push(user)
  }

  isSignedBy = <T extends { id: number }>(user: T | null) => {
    if (!user) return false
    return this.lastVersion!.signatures.some((signature) =>
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

  get SRWithStatus() {
    return this.lastVersionSR.map(({ userTo }) => ({ userTo, status }))
  }
}
