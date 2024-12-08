import { DocumentWithSignature } from '@/stores/DocumentsSignService'
import { GridColDef } from '@mui/x-data-grid'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../documentsList/documentsList'
import { DocumentTransitions } from '@/api/documentController/types'
import { JournalState } from './types'
import authStore from '@/stores/AuthStore'

export const stateLabelMap: Record<string, string> = {
  [DocumentTransitions.SENT_ON_REWORK]: 'Отправлен на доработку',
  [DocumentTransitions.SENT_ON_SIGNING]: 'На согласовании',
  [DocumentTransitions.SENT_ON_VOTING]: 'На согласовании',
}

export const columns: GridColDef[] = [
  {
    field: 'documentName',
    headerName: 'Документы',
    editable: false,
    type: 'string',
    flex: 2,
    minWidth: 150,
    valueGetter: (_, document: DocumentWithSignature) =>
      document.lastVersion?.title,
  },
  {
    field: 'sender',
    headerName: 'Отправитель',
    valueGetter: (_, document: DocumentWithSignature) =>
      `${document.author.name} ${document.author.surname}`,
    editable: false,
    type: 'string',
    flex: 2,
    minWidth: 150,
  },
  {
    field: 'signatures',
    headerName: 'Подпись',
    valueGetter: (_, document: DocumentWithSignature) =>
      document.isSignedByUser,
    editable: false,
    type: 'boolean',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'signState',
    headerName: 'Согласование',
    editable: false,
    type: 'string',
    flex: 1,
    minWidth: 240,
  },
  {
    field: 'date',
    headerName: 'Дата',
    width: 150,
    type: 'date',
    valueGetter: (_, document: DocumentWithSignature) =>
      document.lastVersion ? new Date(document.lastVersion?.createdAt) : '',
  },
  {
    field: 'documentType',
    headerName: 'Тип документа',
    width: 180,
    valueGetter: (_, document: DocumentWithSignature) =>
      document.documentData.documentType.name,
  },
]

export const filtersMap = {
  all: () => true,
  processing: (document: DocumentWithSignature) =>
    document.isSignedByUser &&
    document.documentData.state !== DocumentTransitions.SIGNED,
  processed: (document: DocumentWithSignature) =>
    document.documentData.state === DocumentTransitions.SIGNED &&
    (document.censors.some((c) => c.id === authStore.user?.id) ||
      document.isUserAuthor),
  signing: (document: DocumentWithSignature) => {
    const isAuthorAndNotSigned =
      document.isUserAuthor && !document.isSignedByUser
    const isReadyForSigningByNonAuthor =
      !document.isUserAuthor &&
      document.isSignedByAuthor &&
      !document.isSignedByUser

    return (
      isAuthorAndNotSigned ||
      (isReadyForSigningByNonAuthor &&
        document.ownSR.every((sr) => sr.status !== 'REJECTED'))
    )
  },
}

export const default_pagination_model = {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
}

export const initialState: JournalState = {
  selectionModel: [],
  paginationModel: default_pagination_model,
}

export const JournalTypeLabelMap = {
  all: 'Все документы',
  signing: 'Требующие подписания',
  processing: 'Требующие согласования',
  processed: 'Согласованные',
}
