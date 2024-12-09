import { Value } from '@/types/sharedTypes'
import { Document } from '@/types/sharedTypes'
import { FieldArrayWithId } from 'react-hook-form'
import { DocumentVersion } from '@/types/sharedTypes'
import { DocumentVersionModel } from '@/api/documentController'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Attribute } from '@/types/sharedTypes'
import { SerializedError } from '@/api/core/serializedError'
type Fields = FieldArrayWithId<DocumentVersion, 'values', 'id'>[]
type Register = UseFormRegister<FormData>

export interface AttributeInputsProps {
  fields: Fields
  register: Register
  defaultDocumentValues: FormData
  attrValues: Value[]
  attributes: Attribute[]
}

export interface HandleFileActionsProps {
  base64content: string | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  file: File | null
  setValue: UseFormSetValue<FormData>
  register: Register
}

export interface CreateDocumentVersionProps {
  document: Document
  error: SerializedError | null
  updateDocument: (documentVersion: DocumentVersionModel) => Promise<void>
}
export interface FormData {
  title: string
  description: string
  values: Value[]
  base64Content: string
}
