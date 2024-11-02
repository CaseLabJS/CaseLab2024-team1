import { EmailField } from '@/components/styled/emailField.tsx'
import { PasswordField } from '@/components/styled/passwordField.tsx'
import { ButtonSignIn } from '@/components/styled/buttonSignIn.tsx'
import Box from '@mui/material/Box'
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage'
import { useNavigate } from 'react-router-dom'
import authStore from '@/stores/authStore.ts'

const providers: AuthProvider[] = [
  { id: 'credentials', name: 'Email and Password' },
]

export const SlotsSignIn = () => {
  const navigate = useNavigate()
  const { login, isAuth } = authStore

  const signIn = async (
    email?: FormDataEntryValue | null,
    password?: FormDataEntryValue | null
  ) => {
    if (typeof email !== 'string' || typeof password !== 'string') {
      return {
        type: 'CredentialsSignin',
        error:
          'Данный тип входа в систему не поддерживается. Пожалуйста, используйте почту и пароль',
      }
    }

    //TODO login({email, password});
    await login()

    if (isAuth) {
      //перенаправляем на /admin или /app
      navigate('/app')
      return {}
    } else {
      return {
        type: 'CredentialsSignin',
        error: 'Неправильные данные для входа. Пожалуйста, попробуйте снова.',
      }
    }
  }

  const onSignIn: (
    provider: AuthProvider,
    formData?: FormData
  ) => Promise<AuthResponse> | void = async (_provider, formData) => {
    const email = formData?.get('email')
    const password = formData?.get('password')
    return signIn(email, password)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SignInPage
        signIn={onSignIn}
        slots={{
          emailField: EmailField,
          passwordField: PasswordField,
          submitButton: ButtonSignIn,
        }}
        providers={providers}
      />
    </Box>
  )
}
