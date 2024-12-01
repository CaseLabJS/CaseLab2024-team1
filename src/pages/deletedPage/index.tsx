import { DeletedDocs } from '@/components/deletedDocs/deletedDocs'
import { Signature, User } from '@/types/sharedTypes.ts'
import { GridColDef } from '@mui/x-data-grid'
import { useCallback, useEffect, useMemo, useState } from 'react'
import documentsListStore from '@/stores/DocumentsListStore'
import { ToolbarButton } from '@/types/types'
import { Unarchive as UnarchiveIcon } from '@mui/icons-material'
import { useNotifications } from '@toolpad/core'
import { GridRowId } from '@mui/x-data-grid/models/gridRows'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import { observer } from 'mobx-react-lite'
import { options } from '@/utils/dateOptions'
import { PageContainer } from '@toolpad/core'

export interface RowData {
  id: number
  documentName: string
  sender: User
  signatures: Signature[]
  file: string
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
export const DeletedPage = observer(() => {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const { recoverDocument, documents, countTotalDocuments } = documentsListStore

  const notifications = useNotifications()

  useEffect(() => {
    void countTotalDocuments(false)

    void documentsListStore.fetchDocuments({ isAlive: false })
  }, [countTotalDocuments])

  const rows = useMemo(() => {
    return documents.map(({ documentData }): RowData => {
      const lastDocumentVersions =
        documentData.documentVersions[documentData.documentVersions.length - 1]

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
  }, [documents])

  const handleChange = useCallback(
    (newSelectionModel: GridRowSelectionModel) => {
      setSelectionModel([...newSelectionModel])
    },
    []
  )

  const handleRecover = useCallback(async () => {
    const promises: Promise<void | Document>[] = []

    selectionModel.map((selectedId) => {
      promises.push(recoverDocument(+selectedId))
    })
    const results = await Promise.all(promises)
    await countTotalDocuments()

    if (selectionModel.some((_, index) => results[index])) {
      notifications.show('Ошибка при восстановлении', {
        severity: 'error',
        autoHideDuration: 5000,
      })
    } else {
      notifications.show('Восстановлено', {
        severity: 'success',
        autoHideDuration: 2000,
      })
    }
  }, [countTotalDocuments, selectionModel, recoverDocument, notifications])

  const buttons: ToolbarButton[] = [
    {
      content: <UnarchiveIcon />,
      onClick: handleRecover,
      disabled: selectionModel.length === 0,
    },
  ]

  return (
    <PageContainer
      breadcrumbs={[]}
      sx={{
        '&.MuiContainer-root': {
          maxWidth: 'none',
        },
      }}
    >
      <DeletedDocs
        columns={columns}
        rows={rows}
        buttons={buttons}
        onSelectionChange={handleChange}
      />
    </PageContainer>
  )
})
