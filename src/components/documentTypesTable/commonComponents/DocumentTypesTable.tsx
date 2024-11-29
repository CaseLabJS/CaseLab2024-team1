import DocumentType from './DocumentType'
import { DocumentTypesTableProps } from '../types'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
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

const DocumentTypesTable = observer((props: DocumentTypesTableProps) => {
  const { types } = documentTypeListStore
  useEffect(() => {
    void documentTypeListStore.fetchDocumentTypes({
      showOnlyAlive: props.showOnlyAlive,
    })
  }, [])
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const { error } = documentTypeListStore
  return (
    <>
      <Paper sx={{ p: '1.5rem' }}>
        <Typography variant="h5">
          {props.showOnlyAlive
            ? 'Типы документов'
            : 'Удаленные типы документов'}
        </Typography>
        {props.showOnlyAlive && (
          <Button variant="outlined" sx={{ mt: '8px' }}>
            Добавить тип документа
          </Button>
        )}
        {types.length > 0 ? (
          <Table sx={{ mt: '8px' }} size="small">
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
                    showOnlyAlive={props.showOnlyAlive}
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
          {error
            ? error.message
            : props.showOnlyAlive
              ? 'Тип документа удале'
              : 'Тип документа восстановлен'}
        </Alert>
      </Snackbar>
    </>
  )
})

export default DocumentTypesTable
