import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Loader } from '@/components/loader/loader'
import { UserCredentials } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import { observer } from 'mobx-react-lite'
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  Paper,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
} from '@mui/icons-material'
const CreateUser: React.FC = observer(() => {
  const [showPassword, setShowPassword] = useState(true)
  const [loaderIsOpen, setLoaderIsOpen] = useState(true)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const { loading, error } = usersListStore
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UserCredentials>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<UserCredentials> = async (data) => {
    await usersListStore.createUser(data)
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        margin: 'auto',
        maxWidth: '370px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Введите данные нового пользователя
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <TextField
            sx={{ marginBottom: 2 }}
            label="Имя"
            variant="outlined"
            fullWidth
            {...register('name', {
              required: 'Name required',
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Фамилия"
            variant="outlined"
            fullWidth
            {...register('surname', {
              required: 'Surname required',
            })}
            error={!!errors.surname}
            helperText={errors.surname?.message}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)/,
                message: 'Invalid email format',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Пароль"
            variant="outlined"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password required',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button variant="contained" type="submit" disabled={!isValid}>
            Создать пользователя
          </Button>
        </Box>
        <Snackbar
          open={snackbarIsOpen}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setSnackbarIsOpen(false)}
        >
          <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {error ? error.message : 'Пользователь создан'}
          </Alert>
        </Snackbar>
      </Box>
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

export default CreateUser
