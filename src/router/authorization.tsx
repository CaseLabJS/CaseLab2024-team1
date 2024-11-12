import type { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import authStore from '@/stores/AuthStore'
import type { AuthorizationProps } from './types'
import { ROUTES } from '@/router/constants.ts'

export const Authorization: FC<AuthorizationProps> = observer(
  ({ requireAuth }) => {
    const { isAuth, isAdmin } = authStore
    // маршрут /sign-in если пользователь уже авторизован, редирект на домашнюю страницу согласно роли
    if (!requireAuth && isAuth) {
      return <Navigate to={isAdmin ? ROUTES.admin() : ROUTES.app()} />
    }
    // route, требующий авторизацию, и пользователь не авторизован -> редирект на авторизацию
    if (requireAuth && !isAuth) {
      return <Navigate to={ROUTES.signIn} />
    }

    return <Outlet />
  }
)
