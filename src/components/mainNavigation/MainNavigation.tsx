import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import authStore from '@/stores/AuthStore'
import { ROUTES } from '@/router/constants'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

const MainNavigation: React.FC = observer(() => {
  const { isAuth, isAdmin } = authStore

  const userLinks = [
    { text: 'Панель управления', path: ROUTES.app() },
    { text: 'Создать документ', path: ROUTES.app('document') },
  ]

  const adminLinks = [
    { text: 'Панель администратора', path: ROUTES.admin() },
    { text: 'Управление пользователями', path: ROUTES.admin('users') },
    { text: 'Создать пользователя', path: ROUTES.admin('users/create') },
  ]

  return (
    <nav>
      <List
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1.5,
          padding: 0,
          margin: 0,
        }}
      >
        {isAdmin &&
          adminLinks.map((link) => (
            <ListItem
              key={link.text}
              disablePadding
              sx={{ width: 'fit-content', margin: { xs: '0 auto', md: '0' } }}
            >
              <ListItemButton component={Link} to={link.path}>
                <ListItemText
                  primary={link.text}
                  sx={{ textAlign: 'center' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        {isAuth &&
          !isAdmin &&
          userLinks.map((link) => (
            <ListItem key={link.text} disablePadding>
              <ListItemButton component={Link} to={link.path}>
                <ListItemText primary={link.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </nav>
  )
})

export default MainNavigation
