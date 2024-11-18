import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { DocumentForm } from '@/components/createDocumentForm/documentForm/documentForm'
import { FormEvent, useCallback, useMemo } from 'react'
import { ActionButtons } from '@/components/createDocumentForm/actionButtons/actionButtons.tsx'
import { testDocumentsType } from '@/stories/selectField/testData/testData.ts'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { FormValues } from '@/components/createDocumentForm/types.ts'
import { AddDocumentButton } from '@/components/createDocumentForm/addDocumentButton/addDocumentButton.tsx'
import documentsListStore from '@/stores/DocumentsListStore'
import authStore from '@/stores/AuthStore'
import { Value } from '@/types/sharedTypes.ts'
import { observer } from 'mobx-react-lite'
import { fileToBase64 } from '@/utils/fileToBase64.ts'
import { useNotifications } from '@toolpad/core'
import { ROUTES } from '@/router/constants.ts'
import { useNavigate } from 'react-router-dom'
import { Document } from '@/types/sharedTypes.ts'

const MAX_UPLOADABLE_FILES = 10

export const CreateDocumentForm = observer(() => {
  const initialDocumentType = testDocumentsType[0]
  const { createDocument } = documentsListStore
  const { user } = authStore

  const notifications = useNotifications()
  const navigate = useNavigate()

  const defaultFormItem = useMemo(() => {
    return {
      title: '',
      documentTypeId: initialDocumentType.id,
      description: '',
      attributes: initialDocumentType.attributes.reduce<
        Record<string, string>[]
      >((acc, attr) => {
        acc.push({
          [attr.name]: '',
        })
        return acc
      }, []),
    }
  }, [initialDocumentType])

  const form = useForm<FormValues>({
    defaultValues: {
      items: [defaultFormItem],
    },
  })

  const { fields, remove, append, update } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const fieldsValue = form.watch('items')

  const handleRemoveDocument = useCallback(
    (index: number) => {
      remove(index)
    },
    [remove]
  )

  const handleAddDocument = useCallback(() => {
    if (fields.length < MAX_UPLOADABLE_FILES) {
      append(defaultFormItem)
    } else {
      notifications.show('Превышен лимит файлов', {
        severity: 'error',
        autoHideDuration: 2000,
      })
    }
  }, [append, defaultFormItem, fields.length, notifications])

  const convertAttributesToValues = useCallback(
    (attributes: Record<string, string>[]): Value[] => {
      const values: Value[] = []

      attributes.forEach((attribute) => {
        for (const [key, value] of Object.entries(attribute)) {
          values.push({ attributeName: key, value: value.trim() })
        }
      })

      return values
    },
    []
  )

  const onSubmit = useCallback(
    async (data: FormValues) => {
      const promises: Promise<void | Document>[] = []

      for (const document of data.items) {
        const base64 = await fileToBase64(document.file ? document.file : null)

        promises.push(
          createDocument({
            title: document.title.trim(),
            userId: user ? user.id : 0,
            documentTypeId: document.documentTypeId,
            description: document.description,
            values: convertAttributesToValues(document.attributes),
            base64Content: base64,
          })
        )
      }

      const results = await Promise.all(promises)

      results.map((result, index) => {
        if (result) {
          remove(index)
        }
      })

      const items = form.getValues('items')

      if (!items.length) {
        notifications.show('Успешно сохранено', {
          severity: 'success',
          autoHideDuration: 2000,
        })

        navigate(ROUTES.app('forward'))
      } else {
        notifications.show('Ошибка при операции', {
          severity: 'error',
          autoHideDuration: 5000,
        })
      }
    },
    [
      form,
      createDocument,
      user,
      convertAttributesToValues,
      remove,
      notifications,
      navigate,
    ]
  )

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      void form.handleSubmit(onSubmit)(event)
    },
    [form, onSubmit]
  )

  const attachFileToDocument = useCallback(
    (index: number, file?: File) => {
      const documentToUpdate = fieldsValue[index]
      documentToUpdate.file = file
      update(index, documentToUpdate)
    },
    [update, fieldsValue]
  )

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1.5rem',
      }}
      elevation={6}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: '600' }}>
          {`Добавлено документов: ${fields.length}`}
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey.500' }}>
          Максимум 10 документов
        </Typography>
      </Box>

      <FormProvider {...form}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <AddDocumentButton
            onAddDocument={handleAddDocument}
            disabled={fields.length < MAX_UPLOADABLE_FILES}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {fields.map((field, index) => {
              const isSingleDocument = fields.length === 1

              return (
                <DocumentForm
                  file={fields[index].file}
                  key={field.id || index}
                  fileIndex={index}
                  onRemoveDocument={() => handleRemoveDocument(index)}
                  single={isSingleDocument}
                  addFile={attachFileToDocument}
                />
              )
            })}
          </Box>

          <ActionButtons />
        </Box>
      </FormProvider>
    </Paper>
  )
})
