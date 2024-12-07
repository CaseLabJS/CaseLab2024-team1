import { DocumentsList } from '@/components/documentsList/documentsList.tsx'
import { Document, Signature, User } from '@/types/sharedTypes.ts'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import { useCallback, useEffect, useMemo, useState } from 'react'
import documentsListStore from '@/stores/DocumentsListStore'
import { ToolbarButton } from '@/types/types'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNotifications } from '@toolpad/core'
import { GridRowId } from '@mui/x-data-grid/models/gridRows'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import { observer } from 'mobx-react-lite'
import { options } from '@/utils/dateOptions'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import authStore from '@/stores/AuthStore'
import searchStore from '@/stores/SearchStore'
import { DocumentTransitions } from '@/api/documentController/types.ts'

interface RowData {
  id: number
  documentName: string
  sender: User
  signatures: Signature[]
  file: string | null
  date: string
}

const columns: GridColDef<RowData>[] = [
  {
    field: 'documentName',
    headerName: 'Документы',
    editable: false,
    type: 'string',
    flex: 2,
    minWidth: 150,
  },
  {
    field: 'sender',
    headerName: 'Отправитель',
    valueGetter: (user: User) => `${user.name} ${user.surname}`,
    editable: false,
    type: 'string',
    flex: 2,
    minWidth: 150,
  },
  {
    field: 'signatures',
    headerName: 'Подпись',
    valueGetter: (signatures: Signature[]) => signatures.length,
    editable: false,
    type: 'boolean',
    flex: 1,
    minWidth: 100,
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

export const ForwardPage = observer(() => {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [countTotalForwardSize, setCountTotalForwardSize] = useState(0)
  const {
    loading,
    fetchDocuments,
    deleteDocument,
    documents,
    countTotalDocuments,
    documentsSize,
  } = documentsListStore
  const { user } = authStore

  const notifications = useNotifications()
  const navigate = useNavigate()

  useEffect(() => {
    void (async () => {
      const result = await countTotalDocuments()
      if (result) {
        setCountTotalForwardSize(result)
      }

      if (countTotalForwardSize) {
        await fetchDocuments({
          size: countTotalForwardSize,
        })
      }
    })()
  }, [
    countTotalDocuments,
    countTotalForwardSize,
    documentsSize,
    fetchDocuments,
  ])

  const rows = useMemo(() => {
    return documents
      .filter(({ documentData }) => documentData.user.id === user?.id)
      .map(({ documentData }): RowData => {
        const lastDocumentVersions =
          documentData.documentVersions[
            documentData.documentVersions.length - 1
          ]

        return {
          id: documentData.id,
          documentName: lastDocumentVersions.title,
          sender: documentData.user,
          signatures: lastDocumentVersions.signatures,
          file: lastDocumentVersions.base64Content,
          date: new Date(lastDocumentVersions.createdAt).toLocaleDateString(
            'ru-RU',
            options
          ),
        }
      })
  }, [documents, user])

  const handleChange = useCallback(
    (newSelectionModel: GridRowSelectionModel) => {
      setSelectionModel([...newSelectionModel])
    },
    []
  )

  const handleRowClick = useCallback(
    (params: GridRowParams) => {
      navigate(`${params.id}`)
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
      disabled:
        selectionModel.length === 0 ||
        selectionModel.some((id) => {
          const document = searchStore.findDocumentById(+id)
          return (
            document && document.state === DocumentTransitions.SENT_ON_VOTING
          )
        }),
    },
  ]

  return (
    <>
      <Typography variant="h4" sx={{ pb: 2 }}>
        Исходящие
      </Typography>
      <DocumentsList
        columns={columns}
        rows={rows}
        buttons={buttons}
        onSelectionChange={handleChange}
        onRowClick={handleRowClick}
        paginationMode="client"
        loading={loading}
      />
    </>
  )
})
