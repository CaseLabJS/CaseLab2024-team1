import { DocumentVersion } from '@/types/sharedTypes'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useEffect, useState } from 'react'
import AttributeInputs from './AttributeInputs'
import { CreateDocumentVersionProps } from './types'
import { FormData } from './types'
import HandleFileActions from './HandleFileActions'
import { base64ToFile } from '@/utils/base64ToFile'
import { observer } from 'mobx-react-lite'
const CreateDocumentVersion = observer((props: CreateDocumentVersionProps) => {
  const [document] = useState<DocumentVersion>(
    props.document.documentVersions[props.document.documentVersions.length - 1]
  )
  const documentBase64 = document.base64Content ? document.base64Content : ''
  const [defaultDocumentValues, setDefaultDocumentValues] = useState<FormData>({
    title: document.title,
    description: document.description,
    values: document.values,
    base64Content: documentBase64,
  })
  const [file, setFile] = useState<File | null>(null)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: defaultDocumentValues,
  })
  useEffect(() => {
    reset(defaultDocumentValues)
  }, [defaultDocumentValues, reset])
  const { fields } = useFieldArray({
    control,
    name: 'values',
  })

  const [title, description, attrValues] = watch([
    'title',
    'description',
    'values',
    'base64Content',
  ])
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    void props.updateDocument(data)
    setDefaultDocumentValues(data)
    setSnackbarIsOpen(true)
  }
  const resetAll = () => {
    const previousFile = base64ToFile(defaultDocumentValues.base64Content)
    if (previousFile) setFile(previousFile)
    reset()
  }
  return (
    <>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: '20px',
        }}
        elevation={4}
      >
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Редактируемый документ: {document.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Тип докуменнта: {props.document.documentType.name}
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          sx={{ width: '100%', my: 2 }}
        >
          <Box sx={{ display: 'grid' }}>
            <Box
              sx={{
                justifySelf: 'flex-end',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{ fontSize: { xs: '10px', md: '14px', lg: '14px' } }}
                variant="outlined"
                onClick={resetAll}
              >
                <ClearIcon />
                Отменить изменения
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              my: 2,
            }}
          >
            <HandleFileActions
              base64content={document.base64Content}
              setFile={setFile}
              file={file}
              setValue={setValue}
              register={register}
            />
            <Typography variant="subtitle2">Название</Typography>
            <TextField
              sx={{
                p: 0,
                '& .MuiInputBase-root': {
                  p: 0,
                },
              }}
              variant="outlined"
              fullWidth
              color={
                defaultDocumentValues.title !== title ? 'success' : 'primary'
              }
              focused={defaultDocumentValues.title !== title}
              {...register('title', {
                required: 'Title required',
              })}
              error={!!errors.title}
              placeholder="Поле обязательно для заполнения"
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              my: 2,
            }}
          >
            <Typography variant="subtitle2">Описание</Typography>
            <TextField
              sx={{
                '& .MuiInputBase-root': {
                  p: 1,
                  fontSize: '.8rem',
                  overflowY: 'auto',
                },
              }}
              variant="outlined"
              fullWidth
              maxLength={255}
              multiline
              rows={5}
              color={
                defaultDocumentValues.description !== description
                  ? 'success'
                  : 'primary'
              }
              focused={defaultDocumentValues.description !== description}
              {...register('description')}
            />
          </Box>
          <AttributeInputs
            fields={fields}
            register={register}
            defaultDocumentValues={defaultDocumentValues}
            attrValues={attrValues}
            attributes={props.document.documentType.attributes}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              type="submit"
              disabled={!isValid || !isDirty}
            >
              Обновить документ
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarIsOpen}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <Alert
          severity={props.error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {props.error ? props.error.message : 'Документ обновлен'}
        </Alert>
      </Snackbar>
    </>
  )
})
export default CreateDocumentVersion
