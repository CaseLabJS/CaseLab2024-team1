import React, { ChangeEvent, useEffect, useState } from 'react'
import DocumentTypeId from '@/pages/CreateAttributePage/components/DocumentTypeId'
import CreateAttributeForm from '@/pages/CreateAttributePage/components/CreateAttributeForm'
import { observer } from 'mobx-react-lite'
import { DocumentType, NewAttribute } from '@/types/sharedTypes.ts'
import documentTypeListStore from '@/stores/DocumentTypeListStore/DocumentTypeListStore.ts'
import { SelectChangeEvent } from '@mui/material'
import attributeListStore from '@/stores/AttributeListStore/AttributeListStore.ts'

const CreateAttributePage = observer(() => {
  const [attribute, setAttribute] = useState<NewAttribute>({
    documentTypesIds: [],
    name: '',
    required: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const [countAttributeTypes, setCountAttributeTypes] = useState<number>(1)
  const [documentTypesIds, setDocumentTypesIds] = useState<DocumentType[]>([])
  useEffect(() => {
    const fetchDocumentTypesIds = async () => {
      await documentTypeListStore.fetchDocumentTypes()
    }
    void fetchDocumentTypesIds().then(() => {
      setDocumentTypesIds(getDocumentTypesIds)
    })
  }, [])

  const getDocumentTypesIds = () => {
    const array: DocumentType[] = documentTypeListStore.types.map((type) => ({
      id: type.data.id,
      name: type.data.name,
      attributes: type.data.attributes,
    }))
    return array
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setAttribute((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }
  const handleChangeSelect = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target
    if (name.startsWith('documentTypesIds')) {
      setAttribute((prev) => {
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
    console.log(attribute)
    const createAttribute = async () => {
      await attributeListStore.createAttribute(attribute)
    }
    void createAttribute()
      .then(() => {
        setSuccess('Атрибут успешно создан!')
        setError(null)
      })
      .catch((error) => {
        setError(`Ошибка при создании атрибута->${error}. Попробуйте еще раз.`)
        setSuccess(null)
      })
      .finally(() => {
        setSnackbarIsOpen(true)
        setTimeout(() => {
          setAttribute({
            documentTypesIds: [],
            name: '',
            required: false,
          })
        }, 1000)
      })
  }

  const getHtmlDocumentTypesIds = (count: number) => {
    const htmlElementsArray: JSX.Element[] = []
    for (let i = 0; i < count; i++) {
      htmlElementsArray.push(
        <DocumentTypeId
          key={i}
          i={i}
          attribute={attribute}
          documentTypesIds={documentTypesIds}
          handleChangeSelect={handleChangeSelect}
          deleteDocumentTypesNames={deleteDocumentTypesNames}
        />
      )
    }
    return htmlElementsArray
  }

  const deleteDocumentTypesNames =
    (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setAttribute((prev) => {
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

  return (
    <CreateAttributeForm
      attribute={attribute}
      countAttributeTypes={countAttributeTypes}
      error={error}
      success={success}
      snackbarIsOpen={snackbarIsOpen}
      setSnackbarIsOpen={setSnackbarIsOpen}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      getHtmlDocumentTypesIds={getHtmlDocumentTypesIds}
      addDocumentTypesNames={addDocumentTypesNames}
    />
  )
})

export default CreateAttributePage
