import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography, Link } from '@mui/material'
import authStore from '@/stores/AuthStore'
import Bird from '@/assets/bird.svg'

const Footer: React.FC = observer(() => {
  const { isAuth } = authStore
  const isAdmin = authStore.isAdmin

  const linkStyles = {
    textDecoration: 'none',
    color: 'primary.main',
    '&:hover': {
      color: 'primary.dark',
    },
    '&:focus': {
      color: 'primary.light',
    },
  }

  const renderLink = (href: string, text: string) => (
    <Link href={href} variant="body2" sx={linkStyles}>
      {text}
    </Link>
  )

  const commonContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'unset' },
          alignItems: 'center',
          gap: 1,
        }}
      >
        <img src={Bird} alt="Logo." width={30} height={30} />
        <Typography variant="h6">TechDoc</Typography>
      </Box>
      {isAdmin
        ? renderLink('#', 'Документация')
        : isAuth
          ? renderLink('#', 'Часто задаваемые вопросы')
          : null}
      <Typography
        variant="body2"
        sx={{ gridColumn: '3/4', textAlign: { xs: 'center', sm: 'end' } }}
      >
        © 2024
      </Typography>
    </>
  )

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr 1fr' },
        alignItems: 'center',
        gap: 2,
        p: { xs: '1rem', sm: '1.5rem' },
        backgroundColor: 'background.default',
        textAlign: 'center',
        minWidth: '20rem',
        maxWidth: '80rem',
        margin: '0 auto',
      }}
    >
      {commonContent}
    </Box>
  )
})

export default Footer
