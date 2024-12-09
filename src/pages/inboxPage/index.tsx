import { DocumentsList } from '@/components/documentsList/documentsList'
import { Signature, User } from '@/types/sharedTypes.ts'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import { useEffect, useState, useMemo, useCallback } from 'react'
import signatureListStore from '@/stores/SignatureListStore'
import documentsListStore from '@/stores/DocumentsListStore'
import authStore from '@/stores/AuthStore'
import { observer } from 'mobx-react-lite'
import { options } from '@/utils/dateOptions'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

export interface RowData {
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
export const InboxPage = observer(() => {
  const {
    loading,
    documents,
    countTotalDocuments,
    documentsSize,
    fetchDocuments,
  } = documentsListStore
  const [countTotalForwardSize, setCountTotalForwardSize] = useState(0)
  const { signatureRequests } = signatureListStore
  const { user } = authStore

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
      await signatureListStore.fetchSignatureRequests()
    })()
  }, [
    countTotalDocuments,
    countTotalForwardSize,
    documentsSize,
    fetchDocuments,
  ])

  const rows = useMemo(() => {
    return signatureRequests
      .filter(({ userTo }) => user?.id === userTo.id)
      .map(({ documentId }) => {
        const documentMatch = documents.find(
          (document) => document.documentData.id === documentId
        )
        if (!documentMatch) return null
        const { documentData } = documentMatch
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
      .filter((row) => row !== null)
  }, [documents, signatureRequests, user?.id])

  const handleRowClick = useCallback(
    (params: GridRowParams) => {
      navigate(`${params.id}`)
    },
    [navigate]
  )

  return (
    <>
      <Typography variant="h4" sx={{ pb: 2 }}>
        Входящие
      </Typography>
      <DocumentsList
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick}
        paginationMode="client"
        loading={loading}
        checkboxSelection={false}
      />
    </>
  )
})
