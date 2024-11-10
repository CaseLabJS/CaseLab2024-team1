/* eslint-disable mobx/missing-observer */
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  Modal,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
} from '@mui/icons-material'
import authStore from '@/stores/AuthStore'
import { Loader } from '@/components/loader/loader'
import { ROUTES } from '@/router/constants.ts'
import Bird from '@/assets/bird.svg'

type FormData = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const [loaderIsOpen, setLoaderIsOpen] = useState(true)

  const { login, error, loading, isAdmin, isAuth } = authStore
  const onSubmit: SubmitHandler<FormData> = async ({
    rememberMe,
    ...credential
  }) => {
    await login(credential, rememberMe)
  }

  useEffect(() => {
    if (isAuth) {
      navigate(isAdmin ? ROUTES.admin() : ROUTES.app())
    }
  }, [isAuth, isAdmin, navigate])

  useEffect(() => {
    if (error) {
      setSnackbarIsOpen(true)
    }
  }, [error])

  return (
    <Box
      component="form"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: 'auto',
        mt: 4,
        padding: 3,
        bgcolor: 'background.default',
        borderRadius: 1,
      }}
    >
      {/* Логотип */}
      <Box sx={{ mb: 2 }}>
        <img src={Bird} alt="Logo" width={50} height={50} />
      </Box>

      <Typography variant="h5" gutterBottom>
        Sign in to TechDoc
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Welcome, please sign in to continue
      </Typography>

      {/* Поле Email */}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^(admin$|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)/,
            message: 'Invalid email format',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Пароль"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('password', { required: 'Password is required' })}
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

      {/* Чекбокс Remember me */}
      <FormControlLabel
        sx={{ alignSelf: 'flex-start' }}
        control={<Checkbox {...register('rememberMe')} color="primary" />}
        label="Remember me"
      />

      {/* Кнопка Войти */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        ВОЙТИ
      </Button>
      {/*show error*/}
      <Snackbar
        open={snackbarIsOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error?.message}
        </Alert>
      </Snackbar>
      {/*show loading*/}
      {/*спиннер можно закрыть на случай если авторизация длится слишком долго*/}
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
}

export default LoginForm
