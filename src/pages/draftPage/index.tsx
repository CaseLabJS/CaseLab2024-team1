import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DocumentsList,
} from '@/components/documentsList/documentsList.tsx'
import { Document, User } from '@/types/sharedTypes.ts'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react-lite'
import { useNotifications } from '@toolpad/core'
import { useCallback, useEffect, useMemo, useState } from 'react'
import documentsListStore from '@/stores/DocumentsListStore'
import DeleteIcon from '@mui/icons-material/Delete'
import { GridRowId } from '@mui/x-data-grid/models/gridRows'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/constants.ts'
import { options } from '@/utils/dateOptions.ts'
import { ToolbarButton } from '@/types/types.ts'
import { PageContainer } from '@toolpad/core/PageContainer'

interface RowData {
  id: number
  documentName: string
  author: User
  file: string | null
  date: string
}

const columns: GridColDef<RowData>[] = [
  {
    field: 'documentName',
    headerName: 'Черновики',
    editable: false,
    type: 'string',
    flex: 2,
    minWidth: 150,
  },
  {
    field: 'author',
    headerName: 'Автор',
    valueGetter: (user: User) => `${user.name} ${user.surname}`,
    editable: false,
    type: 'string',
    flex: 2,
    minWidth: 150,
  },
  {
    field: 'file',
    headerName: 'Файл',
    valueGetter: (base64: string | null) => base64?.split(',')[1],
    editable: false,
    type: 'boolean',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'date',
    headerName: 'Дата',
    editable: false,
    flex: 1,
    minWidth: 150,
  },
]

export const DraftPage = observer(() => {
  const {
    loading,
    deleteDocument,
    fetchDocuments,
    documents,
    countTotalDocuments,
  } = documentsListStore
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [countTotalDraftSize, setCountTotalDraftSize] = useState(0)

  useEffect(() => {
    void (async () => {
      const result = await countTotalDocuments(true, true)
      if (result) {
        setCountTotalDraftSize(result)
      }

      await fetchDocuments({
        page: DEFAULT_PAGE,
        size: DEFAULT_PAGE_SIZE,
        showDraft: true,
      })
    })()
  }, [countTotalDocuments, fetchDocuments])

  const notifications = useNotifications()
  const navigate = useNavigate()

  const rows = useMemo(() => {
    return documents.map(({ documentData }): RowData => {
      const lastDocumentVersions =
        documentData.documentVersions[documentData.documentVersions.length - 1]

      return {
        id: documentData.id,
        documentName: lastDocumentVersions.title,
        author: documentData.user,
        file: lastDocumentVersions.base64Content,
        date: new Date(lastDocumentVersions.createdAt).toLocaleDateString(
          'ru-RU',
          options
        ),
      }
    })
  }, [documents])

  const handleChange = useCallback(
    (newSelectionModel: GridRowSelectionModel) => {
      setSelectionModel([...newSelectionModel])
    },
    []
  )

  const handlePaginationModelChange = useCallback(
    (paginationModel: GridPaginationModel) => {
      void fetchDocuments({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        showDraft: true,
      })
    },
    [fetchDocuments]
  )

  const handleRowClick = useCallback(
    (params: GridRowParams) => {
      navigate(ROUTES.app(`new-document?draftId=${params.id}`))
    },
    [navigate]
  )

  const handleDelete = useCallback(async () => {
    const promises: Promise<void | Document>[] = []

    selectionModel.map((selectedId) => {
      promises.push(deleteDocument(+selectedId))
    })
    const results = await Promise.all(promises)
    await countTotalDocuments()

    if (selectionModel.some((_, index) => results[index])) {
      notifications.show('Ошибка при удалении', {
        severity: 'error',
        autoHideDuration: 5000,
      })
    } else {
      notifications.show('Успешно удалено', {
        severity: 'success',
        autoHideDuration: 2000,
      })
    }
  }, [countTotalDocuments, selectionModel, deleteDocument, notifications])

  const buttons: ToolbarButton[] = [
    {
      content: <DeleteIcon />,
      onClick: handleDelete,
      disabled: selectionModel.length === 0,
    },
  ]

  return (
    <PageContainer
      breadcrumbs={[]}
      sx={{
        '& .MuiStack-root': { margin: 0 },
        '&.MuiContainer-root': {
          maxWidth: 'none',
          padding: 0,
        },
      }}
    >
      <DocumentsList
        columns={columns}
        rows={rows}
        buttons={buttons}
        onSelectionChange={handleChange}
        onPaginationModelChange={handlePaginationModelChange}
        totalDocuments={countTotalDraftSize}
        onRowClick={handleRowClick}
        loading={loading}
      />
    </PageContainer>
  )
})
