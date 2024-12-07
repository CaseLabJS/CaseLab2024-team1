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
  Paper,
} from '@mui/material'

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
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        width: {
          xs: '350px',
          md: '500px',
          lg: '500px',
        },

        borderRadius: 2,
        margin: 'auto',
      }}
    >
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
        <Box
          sx={{
            maxHeight: { xs: '350px', md: '100%', lg: '100%' },
            overflowY: 'auto',
            mb: 4,
            width: '100%',
          }}
        >
          <Table
            size="small"
            sx={{
              '.MuiTableCell-root': {
                fontSize: { xs: '12px', md: '14px', lg: '14px' },
                padding: { xs: '2px' },
              },
            }}
          >
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
    </Paper>
  )
})

export default CreateDocumentTypePage
