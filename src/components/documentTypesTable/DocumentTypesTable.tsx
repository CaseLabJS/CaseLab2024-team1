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
  Snackbar,
  Alert,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const DocumentTypesTable = observer(() => {
  const { types } = documentTypeListStore
  useEffect(() => {
    void documentTypeListStore.fetchDocumentTypes()
  }, [])
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const { error } = documentTypeListStore
  return (
    <>
      <Paper sx={{ p: '1.5rem' }}>
        <Typography variant="h5">Типы документов</Typography>
        <Button variant="outlined" sx={{ my: '8px' }}>
          Добавить тип документа
        </Button>
        {types.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '5%' }}>ID</TableCell>
                <TableCell sx={{ width: '25%' }}>Наименование</TableCell>
                <TableCell sx={{ width: '40%', textAlign: 'center' }}>
                  Атрибуты
                </TableCell>
                <TableCell sx={{ width: '30%', textAlign: 'end' }}>
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {types.map((type) => {
                return (
                  <DocumentType
                    key={type.data.name}
                    type={type.data}
                    setSnackBarOpen={setSnackbarIsOpen}
                  />
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="subtitle1">
            Типы документов отсутствуют
          </Typography>
        )}
      </Paper>
      <Snackbar
        open={snackbarIsOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error.message : 'Тип документа удален'}
        </Alert>
      </Snackbar>
    </>
  )
})

export default DocumentTypesTable
