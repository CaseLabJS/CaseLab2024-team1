import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography, Link } from '@mui/material'
import authStore from '@/stores/authStore'

interface FooterProps {
  authStore: typeof authStore
}

const Footer: React.FC<FooterProps> = observer(({ authStore }) => {
  const { isAuth, isAdmin } = authStore

  const renderFooterContent = () => {
    if (isAdmin) {
      return (
        <>
          <Typography variant="h6">Лого</Typography>
          <Link href="#" variant="body2">
            Документация
          </Link>
          <Typography variant="body2">© 2024</Typography>
        </>
      )
    } else if (isAuth) {
      return (
        <>
          <Typography variant="h6">Лого</Typography>
          <Link href="#" variant="body2">
            Часто задаваемые вопросы
          </Link>
          <Typography variant="body2">© 2024</Typography>
        </>
      )
    }

    return null // на всякий случай, если роль не определена
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        p: 2,
        backgroundColor: 'background.default',
        textAlign: 'center',
      }}
    >
      {renderFooterContent()}
    </Box>
  )
})

export default Footer
