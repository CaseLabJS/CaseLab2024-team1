import { GridRenderCellParams } from '@mui/x-data-grid'

export interface AttributesWithDocumentTypes {
  id: number
  name: string
  required: boolean
  documentTypes: DocumentTypeWithoutAttributesArray[]
}

export interface DocumentTypeWithoutAttributesArray {
  id: number
  name: string
}

export interface FunctionDocumentTypesNamesCell {
  (
    params: GridRenderCellParams<DocumentTypeWithoutAttributesArray[]>
  ): JSX.Element
}

export interface FunctionActionCell {
  (params: GridRenderCellParams<AttributesWithDocumentTypes>): JSX.Element
}

export const PaginationModel = {
  page: 0,
  pageSize: 10,
}
