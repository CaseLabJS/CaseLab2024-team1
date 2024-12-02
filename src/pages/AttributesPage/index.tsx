import AttributeTable from '@/pages/AttributesPage/components/AttributeTable'
import { Attribute, DocumentType } from '@/types/sharedTypes.ts'
import { useEffect, useState } from 'react'
import { SerializedError } from '@/api/core/serializedError.ts'
import attributeListStore from '@/stores/AttributeListStore'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import { GridRenderCellParams } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import { Alert, IconButton, Modal, Snackbar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import {
  AttributesWithDocumentTypes,
  DocumentTypeWithoutAttributesArray,
} from '@/pages/AttributesPage/attributesPageTypes.ts'

interface Props {
  aliveTable: boolean
}
const AttributesPage = (props: Props) => {
  const [aliveRows, setAliveRows] = useState<AttributesWithDocumentTypes[]>([])
  const [deadRows, setDeadRows] = useState<AttributesWithDocumentTypes[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [snackBarIsOpen, setSnackbarIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await attributeListStore.fetchAttributes({ showOnlyAlive: true })
        const fetchedAliveAttributes = getAttributes()
        await documentTypeListStore.fetchDocumentTypes()
        const fetchedDocumentTypes = getDocumentTypes()
        const fetchedAliveRows = bindAttributeWithDocumentType(
          fetchedAliveAttributes,
          fetchedDocumentTypes
        )
        setAliveRows(fetchedAliveRows)
      } catch (errorFetchData: unknown) {
        if (errorFetchData instanceof SerializedError) {
          setError(
            `Ошибка при получении активных атрибутов->${errorFetchData.message}`
          )
          //console.log(`Error fetchData -> ${errorFetchData.message}`)
        }
      }
    }
    if (props.aliveTable) void fetchData()
  }, [aliveRows])
  useEffect(() => {
    const fetchData = async () => {
      try {
        await attributeListStore.fetchAttributes({ showOnlyAlive: false })
        const fetchedDeadAttributes = getAttributes()
        await documentTypeListStore.fetchDocumentTypes()
        const fetchedDocumentTypes = getDocumentTypes()
        const fetchedDeadRows = bindAttributeWithDocumentType(
          fetchedDeadAttributes,
          fetchedDocumentTypes
        )
        setDeadRows(fetchedDeadRows)
      } catch (errorFetchData: unknown) {
        if (errorFetchData instanceof SerializedError) {
          setError(
            `Ошибка при получении удаленных атрибутов->${errorFetchData.message}`
          )
          setSnackbarIsOpen(true)
          //console.log(`Error fetchData -> ${errorFetchData.message}`)
        }
      }
    }
    if (!props.aliveTable) void fetchData()
  }, [deadRows])
  useEffect(() => {
    setSuccess(null)
    //setSnackbarIsOpen(true)
  }, [error])
  useEffect(() => {
    setError(null)
    //setSnackbarIsOpen(true)
  }, [success])
  const getAttributes = () => {
    const array: Attribute[] = []
    attributeListStore.attributes.forEach((attribute) => {
      array.push({
        id: attribute.data.id,
        name: attribute.data.name,
        required: attribute.data.required,
      })
    })
    //console.log('getAttributes()', ...array)
    return array
  }
  const getDocumentTypes = () => {
    const array: DocumentType[] = []
    documentTypeListStore.types.forEach((documentType) => {
      array.push({
        id: documentType.data.id,
        name: documentType.data.name,
        attributes: documentType.data.attributes,
      })
    })
    //console.log('getDocumentTypes()', ...array)
    return array
  }
  const bindAttributeWithDocumentType = (
    attributes: Attribute[],
    documentTypes: DocumentType[]
  ) => {
    const array: AttributesWithDocumentTypes[] = []
    attributes.forEach((attribute) => {
      const receivedDocumentTypes: DocumentTypeWithoutAttributesArray[] = []
      documentTypes.forEach((documentType) => {
        documentType.attributes.forEach((attributeInDocumentType) => {
          if (attribute.id === attributeInDocumentType.id) {
            receivedDocumentTypes.push({
              id: documentType.id,
              name: documentType.name,
            })
          }
        })
      })
      array.push({
        id: attribute.id,
        name: attribute.name,
        required: attribute.required,
        documentTypes: receivedDocumentTypes,
      })
    })
    //console.log('bindAttributeWithDocumentType()', ...array)
    return array
  }
  const deleteAttribute = (id: number) => () => {
    attributeListStore
      .deleteAttribute(id)
      .then(() => {
        const updatedAliveRows = aliveRows.filter((aliveRow) => {
          return aliveRow.id !== id
        })
        setAliveRows(updatedAliveRows)
        setSuccess(`Атрибут с ID->${id} успешно удален`)
        setSnackbarIsOpen(true)
      })
      .catch((errorApi: SerializedError) => {
        setError(
          `Произошла ошибка->${errorApi.message} при удалении атрибута с ID->${id}`
        )
        setSnackbarIsOpen(true)
        //console.log(`Error deleting ${id}->${errorApi.message}`)
      })
    console.log(`delete attrID->${id}`)
  }
  const restoreAttribute = (id: number) => () => {
    attributeListStore
      .recoverAttribute(id)
      .then(() => {
        const updatedDeadRows = deadRows.filter((deadRow) => {
          return deadRow.id !== id
        })
        setDeadRows(updatedDeadRows)
        setSuccess(`Атрибут с ID->${id} успешно восстановлен`)
        setSnackbarIsOpen(true)
      })
      .catch((errorApi: SerializedError) => {
        setError(
          `Произошла ошибка->${errorApi.message} при восстановлении атрибута с ID->${id}`
        )
        setSnackbarIsOpen(true)
        //console.log(`Error recover ${id}->${errorApi.message}`)
      })
    console.log(`restore attrID->${id}`)
  }
  const openEditModal = (id: number) => () => {
    setModalEditIsOpen(true)
    console.log(`open edit modal for->${id}`)
  }
  const documentTypesNamesCell = (
    params: GridRenderCellParams<DocumentTypeWithoutAttributesArray[]>
  ) => {
    if (Array.isArray(params.value)) {
      return (
        <Box>
          {params.value.map(
            (documentType: DocumentTypeWithoutAttributesArray) => (
              <Box key={documentType.id}>{documentType.name}</Box>
            )
          )}
        </Box>
      )
    }
    return <Box>No Document Types</Box>
  }

  const getDocumentTypesNamesCell = () => documentTypesNamesCell
  const aliveCell = (
    params: GridRenderCellParams<AttributesWithDocumentTypes>
  ) => (
    <Box>
      <IconButton
        color={'error'}
        aria-label={'edit'}
        onClick={openEditModal(params.row.id)}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        color={'error'}
        aria-label={'delete'}
        onClick={deleteAttribute(params.row.id)}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  )
  const getAliveCell = () => aliveCell
  const deadCell = (
    params: GridRenderCellParams<AttributesWithDocumentTypes>
  ) => (
    <Box>
      <IconButton
        aria-label={'restore'}
        onClick={restoreAttribute(params.row.id)}
      >
        <RestoreFromTrashIcon />
      </IconButton>
    </Box>
  )
  const getDeadCell = () => deadCell
  return (
    <>
      {props.aliveTable ? (
        <>
          <h1 style={{ textAlign: 'center' }}>Аттрибуты</h1>
          <AttributeTable
            documentTypesNamesCell={getDocumentTypesNamesCell()}
            actionCell={getAliveCell()}
            rows={aliveRows}
          />
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
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <h2 style={{ textAlign: 'center' }}>Изменить аттрибут</h2>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Удаленные атрибуты</h1>
          <AttributeTable
            documentTypesNamesCell={getDocumentTypesNamesCell()}
            actionCell={getDeadCell()}
            rows={deadRows}
          />
        </>
      )}
      <Snackbar
        open={snackBarIsOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error : success}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AttributesPage
