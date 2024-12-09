import Box from '@mui/material/Box'
import EditAttributeForm from '@/pages/AttributesPage/components/EditAttributeForm'
import { Alert, Modal, Snackbar } from '@mui/material'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { NewAttribute } from '@/types/sharedTypes.ts'

interface Props {
  modalEditIsOpen: boolean
  setModalEditIsOpen: Dispatch<SetStateAction<boolean>>
  getDocumentTypesSelect: () => JSX.Element[]
  selectAliveRow: NewAttribute
  addDocumentTypesNames: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  snackbarEditIsOpen: boolean
  setSnackbarEditIsOpen: Dispatch<SetStateAction<boolean>>
  errorEdit: string | null
  successEdit: string | null
}

const ModalEditAttribute = (props: Props) => {
  const {
    modalEditIsOpen,
    setModalEditIsOpen,
    getDocumentTypesSelect,
    selectAliveRow,
    addDocumentTypesNames,
    handleChange,
    handleSubmit,
    snackbarEditIsOpen,
    setSnackbarEditIsOpen,
    errorEdit,
    successEdit,
  } = props
  return (
    <Modal
      open={modalEditIsOpen}
      onClose={() => {
        setModalEditIsOpen(false)
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          overflow: 'auto',
        }}
      >
        <EditAttributeForm
          documentTypes={getDocumentTypesSelect()}
          attribute={selectAliveRow}
          addDocumentTypesNames={addDocumentTypesNames}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Snackbar
          open={snackbarEditIsOpen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => {
            if (errorEdit !== null) {
              setSnackbarEditIsOpen(false)
            } else {
              setSnackbarEditIsOpen(false)
              setModalEditIsOpen(false)
            }
          }}
        >
          <Alert
            severity={errorEdit ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {errorEdit ? errorEdit : successEdit}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  )
}

export default ModalEditAttribute
