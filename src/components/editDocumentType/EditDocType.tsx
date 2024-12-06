import attributeListStore from '@/stores/AttributeListStore'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import { NewDocumentType } from '@/types/sharedTypes'
import { EditDocumentTypeProps } from './types'
import AttributeTable from './AttributeTable'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import React from 'react'
import DocumentTypeStore from '@/stores/DocumentTypeStore'
import { numberArraysAreDifferent } from '@/utils/numberArraysAreDifferent'
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

// this is a forwardRef bc React complained that it was not (for some reason), that's why "ref" is here
const EditDocumentType = React.forwardRef(function EditDocType(
  props: EditDocumentTypeProps,
  ref
) {
  const documentTypeStore = new DocumentTypeStore(props.type)
  const { error } = documentTypeStore
  const { attributes } = attributeListStore
  const [defaultValues, setDefaultValues] = useState<NewDocumentType>({
    name: props.type.name,
    attributeIds: [],
  })
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const [somethingChanged, setSomethingChanged] = useState(false)
  const [firstRender, setFirstRender] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<NewDocumentType>({
    mode: 'onChange',
    defaultValues: {
      name: props.type.name,
      attributeIds: [],
    },
  })
  const name = watch('name')

  const handleSelect = (checkedId: number) => {
    const newIds: number[] = checkedIds?.includes(checkedId)
      ? checkedIds?.filter((id) => id !== checkedId)
      : [...(checkedIds ?? []), checkedId]
    setCheckedIds(newIds)
    return newIds
  }
  const onSubmit: SubmitHandler<NewDocumentType> = async (data) => {
    setDefaultValues({
      name: name,
      attributeIds: checkedIds,
    })
    await documentTypeStore.updateDocumentType(data)
    if (error) console.log(error)
    else {
      void documentTypeListStore.fetchDocumentTypes({
        showOnlyAlive: true,
      })
      setSnackbarIsOpen(true)
    }
  }
  useEffect(() => {
    void attributeListStore.fetchAttributes()
  })

  // here linter complained about missing dependencies (defaultValues, props.type)
  // although dependency array was empty on purpose
  // if defaultValues is included, inputs on page cannot be changed
  // that's why dependency array is not empty && there is "firstRender" state in dependency array
  useEffect(() => {
    if (firstRender) {
      const ids = props.type.attributes.map((attr) => attr.id)
      setCheckedIds(ids)
      setDefaultValues({
        ...defaultValues,
        attributeIds: ids,
      })
      setFirstRender(false)
    }
  }, [firstRender, defaultValues, props.type])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])
  useEffect(() => {
    if (error) setSnackbarIsOpen(true)
  }, [error])
  useEffect(() => {
    if (defaultValues.name !== name) {
      setSomethingChanged(true)
      return
    }
    if (numberArraysAreDifferent(defaultValues.attributeIds, checkedIds)) {
      setSomethingChanged(true)
      return
    }
    setSomethingChanged(false)
  }, [setSomethingChanged, defaultValues, name, checkedIds])
  return (
    <>
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          m: { xs: 0, md: '1rem', lg: '1rem' },
          borderRadius: 2,
          p: {
            xs: '1.5rem',
            md: '3rem',
            lg: '3rem',
          },
          display: 'grid',
          width: {
            xs: '350px',
            md: '70%',
            lg: '70%',
          },
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          gutterBottom
          textAlign="center"
          m={0}
        >
          Отредактируйте тип документа
        </Typography>
        <Typography
          component="h1"
          variant="subtitle1"
          gutterBottom
          textAlign="center"
          m={0}
        >
          (ID типа: {props.type.id})
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ justifySelf: 'flex-end', m: '.5rem' }}
          onClick={() => {
            reset()
            setCheckedIds(defaultValues.attributeIds)
          }}
        >
          <ClearIcon sx={{ width: '20px', height: '20px' }} />
          <Typography variant="subtitle2" sx={{ height: '20px' }}>
            Отменить изменения
          </Typography>
        </Button>
        <Box
          component="form"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography component="h2" variant="subtitle1" gutterBottom>
            Название типа
          </Typography>
          <TextField
            sx={{ marginBottom: 2, width: '100%' }}
            variant="outlined"
            fullWidth
            {...register('name', {
              required: 'Название типа документа обязательно',
            })}
            error={!!errors.name}
          />
          <Typography component="h2" variant="subtitle1" gutterBottom>
            Атрибуты
          </Typography>
          <AttributeTable
            refObj={ref}
            attributes={attributes}
            register={register}
            handleSelect={handleSelect}
            checkedIds={checkedIds}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid || !somethingChanged}
          >
            Сохранить
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarIsOpen}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error.message : 'Тип документа изменен'}
        </Alert>
      </Snackbar>
    </>
  )
})
const EditDocumentObserver = observer(EditDocumentType)
export default EditDocumentObserver
