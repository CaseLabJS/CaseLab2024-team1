import { ROUTES } from '@/router/constants.ts'
import authStore from '@/stores/AuthStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignOutPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    authStore.logout()
    navigate(ROUTES.home)
  }, [navigate])

  return null
}
