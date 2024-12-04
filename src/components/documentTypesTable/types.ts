import { DocumentType } from '@/types/sharedTypes'
import { Attribute } from '@/types/sharedTypes'

export interface DocumentTypesTableProps {
  showOnlyAlive: boolean
}

export interface DocumentTypeProps {
  type: DocumentType
  showOnlyAlive: boolean
  setSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>
  setTypeToEdit: React.Dispatch<React.SetStateAction<DocumentType>>
  handleModalOpen: () => void
}

export interface TypeAttributeProps {
  attributes: Attribute[]
}
