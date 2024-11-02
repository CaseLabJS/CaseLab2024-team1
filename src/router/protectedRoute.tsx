import authStore from '@/stores/authStore.ts'
import { Navigate } from 'react-router-dom'
import { PropsWithChildren } from 'react'
import { ROUTES } from '@/router/routes.tsx'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuth } = authStore
  return isAuth ? <>{children}</> : <Navigate to={ROUTES.signIn} replace />
}
