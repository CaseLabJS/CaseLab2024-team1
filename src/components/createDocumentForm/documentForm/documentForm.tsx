import Box from '@mui/material/Box'
import { ChangeEvent, useCallback, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { IconButton, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { DocumentOptions } from '@/components/createDocumentForm/documentOptions/documentOptions.tsx'
import { testDocumentsType } from '@/stories/selectField/testData/testData.ts'
import { DynamicFormField } from '@/components/createDocumentForm/dynamicFormField/dynamicFormField.tsx'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { SelectField } from '@/components/selectField/selectField.tsx'
import { Attribute } from '@/types/sharedTypes.ts'
import { TextareaAutosize } from '@/components/styled/textareaAutosize.tsx'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import { FormValues } from '@/components/createDocumentForm/types.ts'

interface DocumentFormProps {
  /**
   * Represents the file being processed in the form.
   */
  file: Partial<File>

  /**
   * Indicates whether the document is selected (e.g., for state display).
   */
  isChecked: boolean

  /**
   * Callback function to handle changes in the request signature checkbox.
   * It receives the change event and a boolean indicating the new state of the checkbox.
   */
  onRequestSignatureChange: (toggle: boolean) => void

  /**
   * The index of the current file in the list of documents, used for managing state in dynamic forms.
   */
  fileIndex: number
}

export const DocumentForm = (props: DocumentFormProps) => {
  const { file, isChecked, onRequestSignatureChange, fileIndex } = props
  const theme = useTheme()

  const documentTypes = testDocumentsType
  const [attributes, setAttributes] = useState<Attribute[]>(
    documentTypes[0].attributes
  )

  const { control, register, formState } = useFormContext<FormValues>()
  const { replace } = useFieldArray({
    control: control,
    name: `items.${fileIndex}.attributes`,
  })

  const handleDocumentTypeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const selectedType = event.target.value

      const docType = documentTypes.find((type) => type.name === selectedType)
      if (docType) {
        setAttributes(docType.attributes)
        replace(
          docType.attributes.map((attribute) => {
            return {
              [attribute.name]: '',
            }
          })
        )
      } else {
        setAttributes([])
        replace([])
      }
    },
    [replace]
  )

  return (
    <Paper
      square
      variant="outlined"
      sx={{
        '&:hover': {
          boxShadow: theme.shadows[7],
        },
        '&:focus-within': {
          boxShadow: theme.shadows[7],
        },
      }}
    >
      {!isChecked && (
        <DocumentOptions
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.grey[400], 0.25),
            padding: '1rem',
          }}
          errorMessage={formState.errors.items?.[fileIndex]?.recipient?.message}
          {...register(`items.${fileIndex}.recipient`, {
            required: 'Отправитель обязателен',
          })}
        />
      )}

      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
          padding: '16px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.primary.main, fontWeight: '600' }}
          >
            {file.name}
          </Typography>
          <IconButton
            sx={{
              '&:hover': {
                color: theme.palette.error.main,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          <Typography
            variant="body2"
            sx={{ minWidth: { xs: '2rem', sm: '4rem', md: '6rem' } }}
          >
            Тип документа
          </Typography>
          <Controller
            name={`items.${fileIndex}.documentType`}
            rules={{ required: 'Тип документа обязателен' }}
            control={control}
            render={({ field }) => {
              return (
                <SelectField
                  options={documentTypes}
                  fullWidth
                  getOptionLabel={(option) => option.name}
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleDocumentTypeChange(e)
                  }}
                />
              )
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Controller
            name={`items.${fileIndex}.description`}
            control={control}
            render={({ field }) => {
              return (
                <TextareaAutosize
                  maxRows={4}
                  aria-label="description"
                  placeholder="Введите здесь своё описание..."
                  {...field}
                />
              )
            }}
          />
        </Box>

        {attributes.map((attr, index) => (
          <Controller
            rules={{
              required: attr.required ? `${attr.name} обязателен` : false,
            }}
            key={attr.id}
            name={`items.${fileIndex}.attributes.${index}.${attr.name}`}
            control={control}
            render={({ field, fieldState }) => (
              <DynamicFormField
                errorMessage={fieldState.error?.message}
                attr={attr}
                {...field}
              />
            )}
          />
        ))}

        <Controller
          name={`items.${fileIndex}.requestSignature`}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  role="checkbox"
                  checked={field.value}
                  onChange={(e) => {
                    const checked = e.target.checked
                    field.onChange(checked)
                    onRequestSignatureChange(checked)
                  }}
                  data-testid="checkbox-control"
                />
              }
              label="Запросить подпись контрагента"
            />
          )}
        />
      </Box>
    </Paper>
  )
}
