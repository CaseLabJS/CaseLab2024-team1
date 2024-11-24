import DocumentStore from '@/stores/DocumentStore/DocumentStore'
import { Attribute, Value } from '@/types/sharedTypes'

export type DocumentViewFormProps = { document: DocumentStore }

export type DocumentValuesProps = {
  attributes: Attribute[]
}

export type FormValues = {
  file: File | null
  title: string
  description: string
  values: Value[]
}
