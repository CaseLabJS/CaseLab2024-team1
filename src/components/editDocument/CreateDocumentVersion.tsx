import { DocumentVersion } from '@/types/sharedTypes'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { Box, Typography, TextField, Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useEffect, useState } from 'react'
import AttributeInputs from './AttributeInputs'
import { CreateDocumentVersionProps } from './types'
import { FormData } from './types'
const CreateDocumentVersion = (props: CreateDocumentVersionProps) => {
  // current document properties' values
  const [document] = useState<DocumentVersion>(
    props.document.documentVersions[props.document.documentVersions.length - 1]
  )
  const [defaultDocumentValues, setDefaultDocumentValues] = useState<FormData>({
    title: document.title,
    description: document.description,
    values: document.values,
    base64Content: document.base64Content,
  })
  // this thing right here is for changing default form values if user updates the document

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<DocumentVersion>({
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
  const [title, description, attrValues, base64Content] = watch([
    'title',
    'description',
    'values',
    'base64Content',
  ])
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    console.log(base64Content)
    setDefaultDocumentValues(data)
    //setSnackbarIsOpen(true)
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="subtitle1">
        Редактируемый документ: {document.title}
      </Typography>
      <Typography variant="subtitle1">
        Тип докуменнта: {props.document.documentType.name}
      </Typography>
      <Typography variant="subtitle1">
        Редактируемая (последняя) версия документа: {document.versionId}
      </Typography>
      <Box
        component="form"
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        sx={{ width: '100%', my: 2 }}
      >
        <Box sx={{ display: 'grid' }}>
          <Button
            sx={{ justifySelf: 'flex-end' }}
            variant="outlined"
            onClick={() => reset()}
          >
            <ClearIcon />
            Отменить изменения
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            my: 2,
          }}
        >
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
          <Button variant="contained" type="submit" disabled={!isValid}>
            Обновить документ
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
export default CreateDocumentVersion
