import { DocumentWithSignature } from '@/stores/DocumentsSignService'
import { Attribute, Value } from '@/types/sharedTypes'

export type DocumentFormProps = { document: DocumentWithSignature }

export type DocumentValuesProps = {
  attributes: Attribute[]
}

export type FormValues = {
  file: File | null
  title: string
  description: string
  values: Value[]
}
