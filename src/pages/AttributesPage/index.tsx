import AttributeTable from '@/pages/AttributesPage/components/AttributeTable'
import { Attribute, DocumentType, NewAttribute } from '@/types/sharedTypes.ts'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SerializedError } from '@/api/core/serializedError.ts'
import attributeListStore from '@/stores/AttributeListStore'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import { GridRenderCellParams } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import { Alert, IconButton, SelectChangeEvent, Snackbar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import {
  AttributesWithDocumentTypes,
  DocumentTypeWithoutAttributesArray,
} from '@/pages/AttributesPage/attributesPageTypes.ts'
import DocumentTypeId from '@/pages/CreateAttributePage/components/DocumentTypeId'
import ModalEditAttribute from '@/pages/AttributesPage/components/ModalEditAttribute'

interface Props {
  aliveTable: boolean
}
const AttributesPage = (props: Props) => {
  const [aliveRows, setAliveRows] = useState<AttributesWithDocumentTypes[]>([])
  const [deadRows, setDeadRows] = useState<AttributesWithDocumentTypes[]>([])
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [snackBarIsOpen, setSnackbarIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [errorEdit, setErrorEdit] = useState<string | null>(null)
  const [successEdit, setSuccessEdit] = useState<string | null>(null)
  const [snackbarEditIsOpen, setSnackbarEditIsOpen] = useState(false)
  const [selectAliveRow, setSelectAliveRow] = useState<NewAttribute>({
    documentTypesIds: [],
    name: '',
    required: false,
  })
  const [countAttributeTypes, setCountAttributeTypes] = useState<number>(1)
  const [selectAliveRowId, setSelectAliveRowId] = useState<number>(-1)
  const [attributeBeforeChanges, setAttributeBeforeChanges] =
    useState<NewAttribute>()
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [totalAliveCount, setTotalAliveCount] = useState<number>(0)
  const [totalDeadCount, setTotalDeadCount] = useState<number>(0)
  useEffect(() => {
    if (props.aliveTable) void fetchAliveData()
  }, [paginationModel, props.aliveTable])
  useEffect(() => {
    if (!props.aliveTable) void fetchDeadData()
  }, [paginationModel, props.aliveTable])
  useEffect(() => {
    setSuccess(null)
    //setSnackbarIsOpen(true)
  }, [error])
  useEffect(() => {
    setError(null)
    if (props.aliveTable) {
      void fetchAliveData()
    } else {
      void fetchDeadData()
    }
    //setSnackbarIsOpen(true)
  }, [success])
  const fetchAliveData = async () => {
    try {
      // const { page, pageSize } = paginationModel
      await attributeListStore.fetchAttributes({
        showOnlyAlive: true,
        // page: page,
        // size: pageSize,
      })
      const fetchedAliveAttributes = getAttributes()
      await documentTypeListStore.fetchDocumentTypes()
      const fetchedDocumentTypes = getDocumentTypes()
      const fetchedAliveRows = bindAttributeWithDocumentType(
        fetchedAliveAttributes,
        fetchedDocumentTypes
      )
      setDocumentTypes(fetchedDocumentTypes)
      await attributeListStore.countTotalAttributes({ showOnlyAlive: true })
      setTotalAliveCount(attributeListStore.attributesSize)
      setAliveRows(fetchedAliveRows)
      //console.log(`aliveCount->${attributeListStore.attributesSize}`)
    } catch (errorFetchData: unknown) {
      if (errorFetchData instanceof SerializedError) {
        setError(
          `Ошибка при получении активных атрибутов->${errorFetchData.message}`
        )
      }
    }
  }
  const fetchDeadData = async () => {
    try {
      // const { page, pageSize } = paginationModel
      await attributeListStore.fetchAttributes({
        showOnlyAlive: false,
        // page: page,
        // size: pageSize,
      })
      const fetchedDeadAttributes = getAttributes()
      await documentTypeListStore.fetchDocumentTypes()
      const fetchedDocumentTypes = getDocumentTypes()
      const fetchedDeadRows = bindAttributeWithDocumentType(
        fetchedDeadAttributes,
        fetchedDocumentTypes
      )
      setDeadRows(fetchedDeadRows)
      await attributeListStore.countTotalAttributes({ showOnlyAlive: true })
      const aliveCount = attributeListStore.attributesSize
      await attributeListStore.countTotalAttributes({ showOnlyAlive: false })
      setTotalDeadCount(
        Math.abs(aliveCount - attributeListStore.attributesSize)
      )
      // console.log(
      //   `deadCount->${aliveCount}->${Math.abs(aliveCount - attributeListStore.attributesSize)}`
      // )
    } catch (errorFetchData: unknown) {
      if (errorFetchData instanceof SerializedError) {
        setError(
          `Ошибка при получении удаленных атрибутов->${errorFetchData.message}`
        )
        setSnackbarIsOpen(true)
      }
    }
  }
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
    //console.log(`delete attrID->${id}`)
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
    //console.log(`restore attrID->${id}`)
  }
  const openEditModal = (id: number) => () => {
    const attribute = aliveRows.find((value) => {
      return value.id === id
    })
    if (attribute !== undefined) {
      const attributeDocumentTypesLength = attribute.documentTypes.length
      setAttributeBeforeChanges({
        name: attribute.name,
        required: attribute.required,
        documentTypesIds: attribute.documentTypes.map((value) => {
          return value.id
        }),
      })
      setSelectAliveRow({
        name: attribute.name,
        required: attribute.required,
        documentTypesIds: attribute.documentTypes.map((value) => {
          return value.id
        }),
      })
      setCountAttributeTypes(attributeDocumentTypesLength)
      setSelectAliveRowId(id)
      setModalEditIsOpen(true)
      //console.log(`open edit modal for->${id}`)
    }
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
      <IconButton aria-label={'edit'} onClick={openEditModal(params.row.id)}>
        <EditIcon />
      </IconButton>
      <IconButton
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
  const getDocumentTypesSelect = () => {
    const array: JSX.Element[] = []
    for (let i = 0; i < countAttributeTypes; i++) {
      array.push(
        <DocumentTypeId
          key={i}
          i={i}
          attribute={selectAliveRow}
          documentTypesIds={documentTypes}
          handleChangeSelect={handleChangeSelect}
          deleteDocumentTypesNames={deleteDocumentTypesNames}
        />
      )
    }
    return array
  }
  const deleteDocumentTypesNames =
    (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setSelectAliveRow((prev) => {
        const newDocumentTypesIds = prev.documentTypesIds.filter(
          (_, i) => i !== index
        )
        return {
          ...prev,
          documentTypesIds: newDocumentTypesIds,
        }
      })
      setCountAttributeTypes(countAttributeTypes - 1)
    }
  const addDocumentTypesNames = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCountAttributeTypes(countAttributeTypes + 1)
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setSelectAliveRow((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }
  const handleChangeSelect = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target
    if (name.startsWith('documentTypesIds')) {
      setSelectAliveRow((prev) => {
        const index = parseInt(name.replace('documentTypesIds', ''), 10)
        const newDocumentTypesIds: number[] = [...prev.documentTypesIds]
        newDocumentTypesIds[index] = parseInt(value as string, 10)
        return {
          ...prev,
          documentTypesIds: newDocumentTypesIds,
        }
      })
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let isSameArray = true
    selectAliveRow.documentTypesIds.forEach((value) => {
      if (!attributeBeforeChanges?.documentTypesIds.includes(value)) {
        isSameArray = false
      }
    })
    if (
      attributeBeforeChanges?.name !== selectAliveRow.name ||
      attributeBeforeChanges?.required !== selectAliveRow.required ||
      !isSameArray
    ) {
      const fetchedAttributeStore = attributeListStore.attributes.find(
        (value) => {
          return value.data.id === selectAliveRowId
        }
      )
      if (fetchedAttributeStore !== undefined) {
        void fetchedAttributeStore
          .patchAttribute(selectAliveRow)
          .then(() => {
            changeEdit(
              true,
              null,
              `Аттрибут с ID->${selectAliveRowId} успешно изменен`
            )
            void fetchAliveData()
            setTimeout(() => setModalEditIsOpen(false), 3500)
          })
          .catch((errorApi: SerializedError) => {
            changeEdit(
              true,
              `Ошибка->${errorApi.message} при изменении атрибута с ID->${selectAliveRowId}`,
              null
            )
          })
      }
    } else {
      changeEdit(true, 'Необходимо изменить хотя бы одно поле аттрибута', null)
    }
    console.log(attributeBeforeChanges, selectAliveRow, isSameArray)
  }
  const changeEdit = (
    openSnackbar: boolean,
    errorText: string | null,
    successText: string | null
  ) => {
    setSnackbarEditIsOpen(openSnackbar)
    setErrorEdit(errorText)
    setSuccessEdit(successText)
  }
  return (
    <>
      {props.aliveTable ? (
        <>
          <h1 style={{ textAlign: 'left' }}>Атрибуты</h1>
          <AttributeTable
            key={0}
            documentTypesNamesCell={getDocumentTypesNamesCell()}
            actionCell={getAliveCell()}
            rows={aliveRows}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={totalAliveCount}
            aliveTable={props.aliveTable}
          />
          <ModalEditAttribute
            modalEditIsOpen={modalEditIsOpen}
            setModalEditIsOpen={setModalEditIsOpen}
            getDocumentTypesSelect={getDocumentTypesSelect}
            selectAliveRow={selectAliveRow}
            addDocumentTypesNames={addDocumentTypesNames}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            snackbarEditIsOpen={snackbarEditIsOpen}
            setSnackbarEditIsOpen={setSnackbarEditIsOpen}
            errorEdit={errorEdit}
            successEdit={successEdit}
          />
        </>
      ) : (
        <>
          <h1 style={{ textAlign: 'left' }}>Удаленные атрибуты</h1>
          <AttributeTable
            key={1}
            documentTypesNamesCell={getDocumentTypesNamesCell()}
            actionCell={getDeadCell()}
            rows={deadRows}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={totalDeadCount}
            aliveTable={props.aliveTable}
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
