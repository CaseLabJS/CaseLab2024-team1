import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import {Dropzone} from '@/components/dropzone/dropzone'
import {DocumentForm} from '@/components/createDocumentForm/documentForm/documentForm'
import './createDocumentForm.css'
import {ChangeEvent, useCallback, useState} from 'react'
import {SignerSection} from '@/components/createDocumentForm/signerSection/signerSection.tsx'
import {ActionButtons} from '@/components/createDocumentForm/actionButtons/actionButtons.tsx'
import {FormControl} from '@/components/createDocumentForm/formControl/formControl.tsx'
import {DocumentPackageInfo} from '@/components/createDocumentForm/documentPackageInfo/documentPackageInfo.tsx'
import {testDocumentsType} from '@/stories/selectField/testData/testData.ts'
import {testFiles} from '@/stories/createDocumentForm/testData/testData.ts'
import {useForm, FormProvider, useFieldArray} from 'react-hook-form'
import {agreement} from "@/stories/selectField/selectField.stories.tsx";

interface CreateDocumentFormProps {
  /**
   * An array of files to be uploaded in the document form
   */
  files?: Partial<File>[]
}

export const CreateDocumentForm = (props: CreateDocumentFormProps) => {
  const {files = testFiles} = props

  const [isChecked, setIsChecked] = useState(true)
  const [requestSignature, setRequestSignature] = useState(false)

  const initialDocumentType = testDocumentsType[0]

  const defaultValues = {
    items: files.map((_file) => {
      return {
        documentType: initialDocumentType.name,
        requestSignature: false,
        recipient: "",
        attributes: initialDocumentType.attributes.reduce<Record<string, string>[]>(
          (acc, attr) => {
            acc.push({
              [attr.name]: ''
            });
            return acc
          },
          []
        ),
      }
    }),
    status: agreement[0].text,
  }

  const form = useForm({
    defaultValues
  })

  const {fields} = useFieldArray({
    control: form.control,
    name: "items"
  });

  const {replace} = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: `items.recipient`
  });

  const handleRequestAllSignaturesChange = useCallback(
    (_event: ChangeEvent<HTMLInputElement>, toggle: boolean) => {
      setRequestSignature(toggle)
      fields.map((_field, index) => {
        form.setValue(`items.${index}.requestSignature`, toggle)
      })
    },
    []
  )

  const handleRequestSignatureChange = useCallback(
    (toggle: boolean) => {
      if (!toggle) {
        setRequestSignature(false)
      }
    },
    []
  )

  const handleChangeChecked = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      setIsChecked(event.target.checked)

      if (checked) {
        files.forEach((_, index) => {
          form.setValue(`items.${index}.recipient`, '');
        });
      } else {
        replace([])
      }
    },
    []
  )

  const onSubmit = (data: any) => console.log('data', data)

  return (
    <Paper className="createDocumentFormContainer">
      <Typography variant="h6" sx={{fontWeight: '600'}}>
        {files.length
          ? `Загружено файлов: ${files.length}`
          : 'Создать новый документ'}
      </Typography>

      {!files.length ? (
        <Dropzone/>
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
                border: isChecked ? '1px solid #ccc' : '',
              }}
            >
              {isChecked && (
                <DocumentPackageInfo
                  requestSignature={requestSignature}
                  onChange={handleRequestAllSignaturesChange}
                />
              )}

              {fields.map((field, index) => (
                <DocumentForm
                  file={files[index]}
                  isChecked={isChecked}
                  onRequestSignatureChange={handleRequestSignatureChange}
                  key={field.id}
                  fileIndex={index}
                />
              ))}
            </Box>

            <SignerSection/>

            <ActionButtons />
          </Box>
        </FormProvider>
      )}
    </Paper>
  )
}
