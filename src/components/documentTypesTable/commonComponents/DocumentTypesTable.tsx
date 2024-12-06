import DocumentType from './DocumentType'
import { DocumentTypesTableProps } from '../types'
import { DocumentType as DocumentTypeType } from '@/types/sharedTypes'
import { Loader } from '@/components/loader'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/constants'
import {
  Box,
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
  Modal,
} from '@mui/material'
import EditDocumentObserver from '@/components/editDocumentType/EditDocType'
import React from 'react'

const DocumentTypesTable = observer((props: DocumentTypesTableProps) => {
  const ref = React.createRef()
  const { types, error, loading } = documentTypeListStore
  const [loaderIsOpen, setLoaderIsOpen] = useState(true)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const handleModalClose = () => {
    setEditModalOpen(false)
  }
  const handleModalOpen = () => {
    setEditModalOpen(true)
  }
  const [typeToEdit, setTypeToEdit] = useState<DocumentTypeType>({
    id: 0,
    name: '',
    attributes: [],
  })
  const navigate = useNavigate()
  useEffect(() => {
    void documentTypeListStore.fetchDocumentTypes({
      showOnlyAlive: props.showOnlyAlive,
    })
  }, [props.showOnlyAlive])
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  return (
    <>
      <Paper
        sx={{ p: { xs: '.3rem', md: '1rem', lg: '1.5rem' }, overflow: 'auto' }}
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
                fontSize: { xs: '10px', md: '14px', lg: '14px' },
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
                    sx={{ fontSize: { xs: '11px', md: '14px', lg: '14px' } }}
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
                      setTypeToEdit={setTypeToEdit}
                      handleModalOpen={handleModalOpen}
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
      <Modal
        open={editModalOpen}
        onClose={handleModalClose}
        sx={{ overflow: 'auto', maxWidth: '100%', maxHeight: '100%' }}
      >
        <EditDocumentObserver type={typeToEdit} ref={ref} />
      </Modal>
      <Modal
        open={loading && loaderIsOpen}
        onClick={() => setLoaderIsOpen(false)}
        closeAfterTransition
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Loader />
        </Box>
      </Modal>
    </>
  )
})

export default DocumentTypesTable
