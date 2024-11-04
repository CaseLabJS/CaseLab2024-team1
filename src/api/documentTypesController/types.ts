import { DocumentType } from '@/types/sharedTypes'

export type DocumentTypesModel = Omit<DocumentType, 'id'>

export type DocumentTypesFields = Partial<DocumentType>
