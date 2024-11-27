import documentTypeListStore from '@/stores/DocumentTypeListStore'
import DocumentType from './DocumentType'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
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
      <Typography variant="h5">Типы документов</Typography>
      <Button variant="outlined" sx={{ my: '8px' }}>
        Добавить тип документа
      </Button>
      {types.length > 0 ? (
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
            {types.map((type) => {
              return <DocumentType key={type.data.name} type={type.data} />
            })}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="subtitle1">Типы документов отсутствуют</Typography>
      )}
    </Paper>
  )
})

export default DocumentTypesTable
