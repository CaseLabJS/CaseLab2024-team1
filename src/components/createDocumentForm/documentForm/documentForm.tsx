import Box from '@mui/material/Box'
import { ChangeEvent, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import { IconButton, InputBase, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { DynamicFormField } from '@/components/createDocumentForm/dynamicFormField/dynamicFormField.tsx'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { SelectField } from '@/components/selectField/selectField.tsx'
import { TextareaAutosize } from '@/components/styled/textareaAutosize.tsx'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import Paper from '@mui/material/Paper'
import { FormValues } from '@/components/createDocumentForm/types.ts'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'

interface DocumentFormProps {
  /**
   * Represents the file being processed in the form.
   */
  file?: Partial<File>

  /**
   * The index of the current file in the list of documents, used for managing state in dynamic forms.
   */
  fileIndex: number

  /**
   * Callback function to remove the document from the form.
   */
  onRemoveDocument: () => void

  /**
   * Indicates whether only a single file can be uploaded.
   */
  single: boolean

  /**
   * Function to add a file to the form.
   * @param index - The index where the file should be added.
   * @param file - The file to be added, optional.
   */
  addFile: (index: number, file?: File) => void
}

export const DocumentForm = (props: DocumentFormProps) => {
  const { file, fileIndex, onRemoveDocument, single, addFile } = props
  const theme = useTheme()

  const documentTypes = documentTypeListStore.types

  const { control, getValues } = useFormContext<FormValues>()
  const { replace: replaceAttributes, fields: attributes } = useFieldArray({
    control: control,
    name: `items.${fileIndex}.attributes`,
  })

  const documentTypeId = getValues(`items.${fileIndex}.documentTypeId`)

  const getDocumentType = useCallback(
    (id: number | null) => {
      return documentTypes.find((documentType) => {
        return documentType.data.id === id
      })
    },
    [documentTypes]
  )

  const handleDocumentTypeChange = useCallback(
    (documentTypeId: number) => {
      const documentType = getDocumentType(documentTypeId)
      if (documentType) {
        replaceAttributes(
          documentType.data.attributes.map((attribute) => {
            return {
              [attribute.name]: '',
            }
          })
        )
      }
    },
    [getDocumentType, replaceAttributes]
  )

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files
      if (fileList && fileList.length > 0) {
        const selectedFile = fileList[0]
        addFile(fileIndex, selectedFile)
      } else {
        addFile(fileIndex)
      }
    },
    [addFile, fileIndex]
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
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          flexDirection: 'column',
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Typography
              variant="body1"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              {file ? file.name : 'Файл не загружен'}
            </Typography>
            <>
              <InputLabel
                htmlFor={`upload-file-to-document-input-${fileIndex}`}
                sx={{ color: 'primary.main', cursor: 'pointer' }}
              >
                {!file ? '(загрузить)' : '(изменить)'}
              </InputLabel>
              <InputBase
                type="file"
                id={`upload-file-to-document-input-${fileIndex}`}
                sx={{ display: 'none' }}
                inputProps={{
                  accept: '.pdf,.png,.jpg,.jpeg,.txt,.docx',
                  multiple: false,
                }}
                onChange={handleFileChange}
              />
            </>
          </Box>

          {!single && (
            <IconButton
              onClick={onRemoveDocument}
              sx={{
                '&:hover': {
                  color: 'error.main',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: '0.2rem', sm: '1rem' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '2.5rem',
              flexShrink: 0,
              minWidth: { xs: '2rem', sm: '4rem', md: '6rem' },
            }}
          >
            <Typography variant="body2">Название</Typography>
          </Box>

          <Controller
            name={`items.${fileIndex}.title`}
            rules={{
              required: 'Название документа обязательно',
              validate: (value) =>
                value.trim() !== '' ||
                'Название должно содержать хотя бы один символ',
            }}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  fullWidth
                  size="small"
                  slotProps={{
                    htmlInput: { ...field },
                  }}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                />
              )
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '0.2rem', sm: '1rem' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              flexShrink: 0,
              minWidth: { xs: '2rem', sm: '4rem', md: '6rem' },
            }}
          >
            Тип документа
          </Typography>
          <Controller
            name={`items.${fileIndex}.documentTypeId`}
            rules={{ required: 'Тип документа обязателен' }}
            control={control}
            render={({ field }) => {
              return (
                <SelectField
                  options={documentTypes.map((type) => ({
                    id: type.data.id,
                    data: type.data,
                  }))}
                  getOptionLabel={(option) => option.data.name}
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(+e.target.value)
                    handleDocumentTypeChange(+e.target.value)
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
            render={({ field }) => (
              <TextareaAutosize
                aria-label="description"
                placeholder="Введите здесь своё описание..."
                maxLength={255}
                minRows={3}
                {...field}
              />
            )}
          />
        </Box>

        {attributes.map((_field, index) => {
          const documentType = getDocumentType(documentTypeId)
          if (!documentType) return null
          const attr = documentType.data.attributes[index]

          return (
            <Controller
              rules={{
                required: attr.required ? `${attr.name} обязателен` : false,
                validate: (value) =>
                  !attr.required ||
                  value.trim() !== '' ||
                  'Название должно содержать хотя бы один символ',
              }}
              key={attr.id}
              name={`items.${fileIndex}.attributes.${index}.${attr.name}`}
              control={control}
              render={({ field, fieldState }) => (
                <DynamicFormField
                  errorMessage={fieldState.error?.message}
                  title={attr.name}
                  required={attr.required}
                  {...field}
                />
              )}
            />
          )
        })}
      </Box>
    </Paper>
  )
}
