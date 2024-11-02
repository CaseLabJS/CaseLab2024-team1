import authStore from '@/stores/authStore.ts'
import { Navigate } from 'react-router-dom'
import { PropsWithChildren } from 'react'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuth } = authStore
  return isAuth ? <>{children}</> : <Navigate to="/sign-in" replace />
}
