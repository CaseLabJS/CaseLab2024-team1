import documentTypeListStore from '@/stores/DocumentTypeListStore'
import DocumentType from './DocumentType'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const DocumentTypesTable = observer(() => {
  const { types } = documentTypeListStore
  useEffect(() => {
    void documentTypeListStore.fetchDocumentTypes()
  }, [])
  return (
    <Paper sx={{ p: '1.5rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Наименование</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Атрибуты</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {types.length > 0 ? (
            types.map((type) => {
              return <DocumentType key={type.data.name} type={type.data} />
            })
          ) : (
            <TableRow>
              <TableCell>Типы документов отсутствуют</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  )
})

export default DocumentTypesTable
