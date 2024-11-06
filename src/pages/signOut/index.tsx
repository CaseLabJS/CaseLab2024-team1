/* eslint-disable mobx/missing-observer */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authStore from '@/stores/AuthenticationStore'
import { ROUTES } from '@/router/routes'

export const SignOutPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    authStore.logout()
    navigate(ROUTES.home)
  }, [navigate])

  return null
}
