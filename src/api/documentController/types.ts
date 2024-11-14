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

export enum DocumentStatus {
  CREATED = 'CREATED',
  SIGNED_BY_AUTHOR = 'SIGNED_BY_AUTHOR',
  MODIFIED = 'MODIFIED',
  DELETED = 'DELETED',
}
