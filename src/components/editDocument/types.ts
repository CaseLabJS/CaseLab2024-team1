import { Value } from '@/types/sharedTypes'
import { Document } from '@/types/sharedTypes'
import { FieldArrayWithId } from 'react-hook-form'
import { DocumentVersion } from '@/types/sharedTypes'
import { UseFormRegister } from 'react-hook-form'
import { Attribute } from '@/types/sharedTypes'
type Fields = FieldArrayWithId<DocumentVersion, 'values', 'id'>[]
type Register = UseFormRegister<DocumentVersion>

export interface AttributeInputsProps {
  fields: Fields
  register: Register
  defaultDocumentValues: FormData
  attrValues: Value[]
  attributes: Attribute[]
}

export interface CreateDocumentVersionProps {
  document: Document
}
export interface FormData {
  title: string
  description: string
  values: Value[]
  base64Content: string
}
