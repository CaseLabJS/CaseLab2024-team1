import DocumentType from './DocumentType'
import { DocumentTypesTableProps } from '../types'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/constants'
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
  const navigate = useNavigate()
  useEffect(() => {
    void documentTypeListStore.fetchDocumentTypes({
      showOnlyAlive: props.showOnlyAlive,
    })
  }, [])
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const { error } = documentTypeListStore
  return (
    <>
      <Paper
        sx={{ p: { xs: '.5rem', md: '1rem', lg: '1.5rem' }, overflow: 'auto' }}
      >
        <Typography variant="h5">
          {props.showOnlyAlive
            ? 'Типы документов'
            : 'Удаленные типы документов'}
        </Typography>
        {props.showOnlyAlive && (
          <Button
            onClick={() => navigate(ROUTES.admin('document-types/create'))}
            variant="outlined"
            sx={{ mt: '8px' }}
          >
            Добавить тип документа
          </Button>
        )}
        {types.length > 0 ? (
          <Table
            sx={{
              mt: '8px',
              '.MuiTableCell-root': {
                fontSize: { xs: '12px', md: '14px', lg: '14px' },
                padding: { xs: '2px' },
              },
            }}
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '5%' }}>ID</TableCell>
                <TableCell sx={{ width: '20%' }}>Имя</TableCell>
                <TableCell sx={{ width: '45%' }}>
                  <Typography
                    variant="subtitle2"
                    mx=".4rem"
                    sx={{ fontSize: { xs: '12px', md: '14px', lg: '14px' } }}
                  >
                    Атрибуты
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '30%', textAlign: 'end' }}>
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {types
                .map((type) => type)
                .sort((a, b) => a.data.id - b.data.id)
                .map((type) => {
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
          <Typography variant="subtitle1" sx={{ my: '1rem' }}>
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
              ? 'Тип документа удален'
              : 'Тип документа восстановлен'}
        </Alert>
      </Snackbar>
    </>
  )
})

export default DocumentTypesTable
