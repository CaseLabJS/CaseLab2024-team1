import { DocumentWithSignature } from '@/stores/DocumentsSignService'
import { GridPaginationModel, GridRowId } from '@mui/x-data-grid'

export type DocumentsJournalProps = {
  type: string
}

export type JournalState = {
  paginationModel: GridPaginationModel
  selectionModel: GridRowId[]
  filteredDocuments: DocumentWithSignature[]
  rows: DocumentWithSignature[]
}
