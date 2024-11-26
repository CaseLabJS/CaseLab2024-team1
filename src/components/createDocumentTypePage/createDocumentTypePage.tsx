import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Loader } from '@/components/loader/loader'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import attributeListStore from '@/stores/AttributeListStore'
import { NewDocumentType } from '@/types/sharedTypes'
import { observer } from 'mobx-react-lite'
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Alert,
  Checkbox,
  Snackbar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import Bird from '@/assets/bird.svg'

const CreateDocumentTypePage: React.FC = observer(() => {
  const { error, loading } = documentTypeListStore
  const { attributes } = attributeListStore
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const [loaderIsOpen, setLoaderIsOpen] = useState(true)

  const [checkedIds, setCheckedIds] = useState<Array<number>>([])

  const handleSelect = (checkedId: number) => {
    const newIds: number[] = checkedIds?.includes(checkedId)
      ? checkedIds?.filter((id) => id !== checkedId)
      : [...(checkedIds ?? []), checkedId]
    setCheckedIds(newIds)

    return newIds
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<NewDocumentType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      attributeIds: [],
    },
  })

  useEffect(() => {
    void attributeListStore.fetchAttributes()
  }, [])

  const onSubmit: SubmitHandler<NewDocumentType> = async (data) => {
    await documentTypeListStore.createDocumentType(data)
    console.log(data)
    setCheckedIds([])
    reset()
    setSnackbarIsOpen(true)
  }
  useEffect(() => {
    if (error) {
      setSnackbarIsOpen(true)
    }
  }, [error])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        maxWidth: 400,
        margin: 'auto',
        minHeight: 600,
      }}
    >
      <img
        src={Bird}
        alt="Bird"
        style={{ width: '100px', marginBottom: '20px' }}
      />

      <Typography component="h1" variant="h5" gutterBottom textAlign="center">
        Создание нового типа документа
      </Typography>
      <Box
        component="form"
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          borderRadius: 2,
          textAlign: 'center',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <TextField
          sx={{ marginBottom: 2, width: '100%' }}
          label="Название типа документа"
          variant="outlined"
          fullWidth
          {...register('name', {
            required: 'Название типа документа обязательно',
          })}
          error={!!errors.name}
        />
        <Typography component="h2" variant="h6" gutterBottom>
          Выберите атрибуты нового типа документа
        </Typography>
        <Box sx={{ height: 400, overflowY: 'auto', mb: 4, maxWidth: 330 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Имя</TableCell>
                <TableCell align="center">Обяз.</TableCell>
                <TableCell align="center">Выбрано</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {attributes.map((attribute) => {
                return (
                  <TableRow
                    key={attribute.data.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      maxHeight: 20,
                    }}
                  >
                    <TableCell align="center">{attribute.data.id}</TableCell>
                    <TableCell align="center">{attribute.data.name}</TableCell>
                    <TableCell align="center">
                      {attribute.data.required ? 'Да' : 'Нет'}
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        {...register('attributeIds')}
                        checked={checkedIds.includes(attribute.data.id)}
                        onChange={() => handleSelect(attribute.data.id)}
                        value={attribute.data.id}
                      ></Checkbox>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>

        <Button variant="contained" type="submit" disabled={!isValid}>
          Создать тип документа
        </Button>
      </Box>
      <Snackbar
        open={snackbarIsOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error.message : 'Тип документа создан'}
        </Alert>
      </Snackbar>

      <Modal
        open={loading && loaderIsOpen}
        onClick={() => setLoaderIsOpen(false)}
        closeAfterTransition
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Loader />
        </Box>
      </Modal>
    </Box>
  )
})

export default CreateDocumentTypePage
