import { DocumentVersion, User } from '@/types/sharedTypes'
export type { Signature } from '@/types/sharedTypes'
/** модель - это экземпляр сущности без id, созданный на клиенте для отправки на сервер */
export type SignatureRequestModel = {
  userIdTo: number
  documentVersionId: number
  documentId: number
}

export type SignatureRequestStatus =
  | 'APPROVED'
  | 'REJECTED'
  | 'PENDING'
  | 'APPROVED_BY_VOTING'
  | 'REJECTED_BY_VOTING'

export type SignatureRequest = {
  id: number
  userTo: User
  documentId: number
  documentVersionId: number
  status: SignatureRequestStatus
  votingId: number | null
}

export type SignatureModel = {
  placeholderTitle: string
  status: SignatureRequestStatus
}

export type VoteModel = {
  participantIds: number[]
  documentId: number
  documentVersionId: number
  approvalThreshold: number
  deadline: string //YYYY-MM-DD
}

export type Vote = {
  participants: User[]
  documentId: number
  documentVersion: DocumentVersion
  approvalThreshold: number
  deadline: string //YYYY-MM-DD
  status: string
}

export type VoteCanceled = {
  id: number
  status: string
}

export type SignatureQueryParams = {
  signByRequest?: boolean
}
