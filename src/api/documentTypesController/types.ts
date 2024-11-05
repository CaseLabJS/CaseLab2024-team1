import { DocumentType, NewDocumentType } from '@/types/sharedTypes'

export type DocumentTypesModel = Omit<DocumentType, 'id'>

export type DocumentTypesFields = Partial<NewDocumentType>
