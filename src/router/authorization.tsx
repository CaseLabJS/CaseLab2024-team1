import type { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/stores/authStore'
import type { AuthorizationProps } from './types'
import { ROUTES } from './routes'

export const Authorization: FC<AuthorizationProps> = observer(
  ({ requireAuth }) => {
    const { isAuth, isAdmin } = authStore
    console.log(isAuth, isAdmin)
    // route авторизации, но пользователь уже авторизован -> редирект на домашнюю страницу согласно роли
    if (!requireAuth && isAuth) {
      return <Navigate to={isAdmin ? ROUTES.admin() : ROUTES.app()} replace />
    }
    // route, требующий авторизацию, и пользователь не авторизован -> редирект на авторизацию
    if (requireAuth && !isAuth) {
      return <Navigate to={ROUTES.signIn} replace />
    }
  }
)
