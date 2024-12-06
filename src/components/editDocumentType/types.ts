import { DocumentType } from '@/types/sharedTypes'
import { NewDocumentType } from '@/types/sharedTypes'
import { UseFormRegister } from 'react-hook-form'
import AttributeStore from '@/stores/AttributeStore'
import { ForwardedRef } from 'react'
export interface AttributeTableProps {
  refObj: ForwardedRef<unknown>
  attributes: AttributeStore[]
  checkedIds: number[]
  register: UseFormRegister<NewDocumentType>
  handleSelect: (checkedId: number) => number[]
}
export interface EditDocumentTypeProps {
  type: DocumentType
}
