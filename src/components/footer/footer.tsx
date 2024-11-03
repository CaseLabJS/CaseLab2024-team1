import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography, Link } from '@mui/material'
import authStore from '@/stores/authStore'

const Footer: React.FC<{ authStore: typeof authStore }> = observer(
  ({ authStore }) => {
    const { isAuth, isAdmin } = authStore

    const commonContent = (
      <>
        <Typography variant="h6">Лого</Typography>
        {isAdmin ? (
          <Link href="#" variant="body2">
            Документация
          </Link>
        ) : isAuth ? (
          <Link href="#" variant="body2">
            Часто задаваемые вопросы
          </Link>
        ) : null}
        <Typography variant="body2">© 2024</Typography>
      </>
    )

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
        {commonContent}
      </Box>
    )
  }
)

export default Footer
