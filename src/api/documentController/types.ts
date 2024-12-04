import { Signature, Value } from '@/types/sharedTypes'

export type DocumentModel = {
  title: string
  userId: number
  documentTypeId: number
  description?: string
  values: Value[]
  base64Content: string
  signatures?: Signature[]
}

export type DocumentVersionModel = Omit<
  DocumentModel,
  'userId' | 'documentTypeId'
>

export type DocumentVersionFields = Partial<DocumentVersionModel>

export enum DocumentTransitions {
  CREATED = 'CREATED',
  SIGNED_BY_AUTHOR = 'SIGNED_BY_AUTHOR',
  MODIFIED = 'MODIFIED',
  DELETED = 'DELETED',
  SENT_ON_REWORK = 'SENT_ON_REWORK',
  SENT_ON_SIGNING = 'SENT_ON_SIGNING',
  SIGNED = 'SIGNED',
  SENT_ON_VOTING = 'SENT_ON_VOTING',
  APPROVED_BY_VOTING = 'APPROVED_BY_VOTING',
  REJECTED_BY_VOTING = 'REJECTED_BY_VOTING',
}
