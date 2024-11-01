import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { Dropzone } from '@/components/dropzone/dropzone'
import { DocumentForm } from '@/components/createDocumentForm/documentForm/documentForm'
import { ChangeEvent, useCallback, useState } from 'react'
import { SignerSection } from '@/components/createDocumentForm/signerSection/signerSection.tsx'
import { ActionButtons } from '@/components/createDocumentForm/actionButtons/actionButtons.tsx'
import { FormControl } from '@/components/createDocumentForm/formControl/formControl.tsx'
import { DocumentPackageInfo } from '@/components/createDocumentForm/documentPackageInfo/documentPackageInfo.tsx'
import { testDocumentsType } from '@/stories/selectField/testData/testData.ts'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { agreement } from '@/stories/selectField/selectField.stories.tsx'
import { useNotifications } from '@toolpad/core'
import { FormValues } from '@/components/createDocumentForm/types.ts'

export const CreateDocumentForm = () => {
  const [isChecked, setIsChecked] = useState(true)
  const [requestSignature, setRequestSignature] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const notifications = useNotifications()

  const initialDocumentType = testDocumentsType[0]

  const defaultValues = {
    items: [],
    recipient: '',
    status: agreement[0].text,
  }

  const form = useForm<FormValues>({
    defaultValues,
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const onFilesAccepted = useCallback(
    (files: File[]) => {
      form.setValue(
        'items',
        files.map((_file) => {
          return {
            documentType: initialDocumentType.name,
            requestSignature: false,
            recipient: '',
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
        })
      )
      setUploadedFiles((prevFiles) => [...prevFiles, ...files])
    },
    [form]
  )

  const handleRequestAllSignaturesChange = useCallback(
    (_event: ChangeEvent<HTMLInputElement>, toggle: boolean) => {
      setRequestSignature(toggle)
      fields.map((_field, index) => {
        form.setValue(`items.${index}.requestSignature`, toggle)
      })
    },
    [fields, form]
  )

  const handleRequestSignatureChange = useCallback((toggle: boolean) => {
    if (!toggle) {
      setRequestSignature(false)
    }
  }, [])

  const handleChangeChecked = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked
      setIsChecked(event.target.checked)

      if (checked) {
        uploadedFiles.forEach((_, index) => {
          form.setValue(`items.${index}.recipient`, '')
        })
      } else {
        form.setValue(`recipient`, '')
      }
    },
    [uploadedFiles, form]
  )

  const onSubmit = (data: FormValues) => {
    //TODO обработка документа и post запрос
    notifications.show('Документ успешно отправлен', {
      severity: 'success',
      autoHideDuration: 2000,
    })
    console.log('data', data)
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        padding: '2rem',
      }}
      elevation={6}
    >
      <Typography variant="h6" sx={{ fontWeight: '600' }}>
        {uploadedFiles.length
          ? `Загружено файлов: ${uploadedFiles.length}`
          : 'Создать новый документ'}
      </Typography>

      {!uploadedFiles.length ? (
        <Dropzone onFilesAccepted={onFilesAccepted} />
      ) : (
        <FormProvider {...form}>
          <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormControl
              isChecked={isChecked}
              handleChangeChecked={handleChangeChecked}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: isChecked ? 0 : '1.5rem',
              }}
            >
              {isChecked && (
                <DocumentPackageInfo
                  initialValue={uploadedFiles}
                  requestSignature={requestSignature}
                  onChange={handleRequestAllSignaturesChange}
                />
              )}

              {fields.map((field, index) => (
                <DocumentForm
                  file={uploadedFiles[index]}
                  isChecked={isChecked}
                  onRequestSignatureChange={handleRequestSignatureChange}
                  key={field.id}
                  fileIndex={index}
                />
              ))}
            </Box>

            <SignerSection />

            <ActionButtons />
          </Box>
        </FormProvider>
      )}
    </Paper>
  )
}
