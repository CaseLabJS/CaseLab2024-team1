import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { DocumentForm } from '@/components/createDocumentForm/documentForm/documentForm'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { ActionButtons } from '@/components/createDocumentForm/actionButtons/actionButtons.tsx'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { FormItem, FormValues } from '@/components/createDocumentForm/types.ts'
import { AddDocumentButton } from '@/components/createDocumentForm/addDocumentButton/addDocumentButton.tsx'
import documentsListStore from '@/stores/DocumentsListStore'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import { observer } from 'mobx-react-lite'
import { useNotifications } from '@toolpad/core'
import { ROUTES } from '@/router/constants.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import { createFormItemFromDocument } from '@/components/createDocumentForm/createFormItemFromDocument.ts'
import DocumentStore from '@/stores/DocumentStore'
import { useDefaultDocumentForm } from '@/components/createDocumentForm/useFefaultDocumentForm.ts'
import { useDocumentActions } from '@/components/createDocumentForm/useDocumentActions.ts'

const MAX_UPLOADABLE_FILES = 10

export const CreateDocumentForm = observer(() => {
  const { getDocumentById } = documentsListStore

  const notifications = useNotifications()
  const navigate = useNavigate()

  const [isDraft, setIsDraft] = useState(false)
  const [draftData, setDraftData] = useState<FormItem | null>(null)
  const [draftDocument, setDraftDocument] = useState<DocumentStore | null>(null)

  const { getDefaultFormItem, getDraftFormItem } =
    useDefaultDocumentForm(draftData)
  const { updateDraftDocument, createDocuments } = useDocumentActions(
    draftDocument,
    isDraft
  )

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const draftId = queryParams.get('draftId')

  const form = useForm<FormValues>({
    defaultValues: {
      items: [getDefaultFormItem()],
    },
    values: {
      items: [getDraftFormItem()],
    },
  })

  useEffect(() => {
    void (async () => {
      if (draftId) {
        const draftDocument = await getDocumentById(+draftId)

        if (draftDocument) {
          const formItem = createFormItemFromDocument(
            draftDocument.documentData
          )
          setDraftData(formItem)
          setDraftDocument(draftDocument)
        }
      } else {
        form.reset({ items: [getDefaultFormItem()] })
        setIsDraft(false)
      }
    })()

    void documentTypeListStore.fetchDocumentTypes()
    // добавление form в зависимости вызовет бесконечный цикл
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftId])

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
      append(getDefaultFormItem())
    } else {
      notifications.show('Превышен лимит файлов', {
        severity: 'error',
        autoHideDuration: 2000,
      })
    }
  }, [append, fields.length, getDefaultFormItem, notifications])

  const onSubmit = useCallback(
    async (data: FormValues) => {
      let items = form.getValues('items')

      if (draftId) {
        const result = await updateDraftDocument(data.items[0])

        if (result) {
          items = []
        }
      } else {
        const results = await createDocuments(data.items)

        const removedIndexes = results.reduce<number[]>(
          (acc, result, index) => {
            if (result) {
              acc.push(index)
            }
            return acc
          },
          []
        )

        items = items.filter((_item, index) => {
          return !removedIndexes.includes(index)
        })
        form.setValue('items', items)
      }

      if (!items.length) {
        notifications.show('Успешно сохранено', {
          severity: 'success',
          autoHideDuration: 2000,
        })

        navigate(ROUTES.app(isDraft || draftId ? 'draft' : 'forward'))
      } else {
        notifications.show('Ошибка при операции', {
          severity: 'error',
          autoHideDuration: 5000,
        })
      }
    },
    [
      form,
      draftId,
      updateDraftDocument,
      createDocuments,
      notifications,
      navigate,
      isDraft,
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

  const handleSaveDraft = useCallback(() => {
    setIsDraft(true)
  }, [])

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
        {!draftId && (
          <>
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
              {`Добавлено документов: ${fields.length}`}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.500' }}>
              Максимум 10 документов
            </Typography>
          </>
        )}
      </Box>

      <FormProvider {...form}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {!draftId && (
            <AddDocumentButton
              onAddDocument={handleAddDocument}
              disabled={fields.length < MAX_UPLOADABLE_FILES}
            />
          )}

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
                  isDraft={isDraft}
                />
              )
            })}
          </Box>

          <ActionButtons onSaveDraft={handleSaveDraft} />
        </Box>
      </FormProvider>
    </Paper>
  )
})
