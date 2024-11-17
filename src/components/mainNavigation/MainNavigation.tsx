import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import authStore from '@/stores/AuthStore'
import { ROUTES } from '@/router/constants'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Drawer,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface MainNavLinksProps {
  isAdmin: boolean
  isAuth: boolean
  adminLinks: Array<{ text: string; path: string }>
  userLinks: Array<{ text: string; path: string }>
}

const MainNavigation: React.FC = observer(() => {
  const { isAuth, isAdmin } = authStore
  const [drawerOpen, setDrawerOpen] = useState(false)

  const userLinks = [
    { text: 'Панель управления', path: ROUTES.app() },
    { text: 'Создать документ', path: ROUTES.app('document') },
  ]

  const adminLinks = [
    { text: 'Панель администратора', path: ROUTES.admin() },
    { text: 'Управление пользователями', path: ROUTES.admin('users') },
    { text: 'Создать пользователя', path: ROUTES.admin('users/create') },
  ]

  const MainNavLinks: React.FC<MainNavLinksProps> = ({
    isAdmin,
    isAuth,
    adminLinks,
    userLinks,
  }) => {
    const links = isAdmin ? adminLinks : isAuth ? userLinks : []

    return (
      <>
        {links.map((link) => (
          <ListItem
            key={link.text}
            disablePadding
            sx={{ width: 'fit-content', textTransform: 'uppercase' }}
          >
            <ListItemButton component={Link} to={link.path}>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </>
    )
  }

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  return (
    <nav>
      <IconButton
        onClick={drawerOpen ? toggleDrawer(false) : toggleDrawer(true)}
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          width: '2rem',
          height: '2rem',
          zIndex: 10000,
        }}
      >
        <MenuIcon
          sx={{
            position: 'inherit',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
          }}
        />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: '20rem', marginTop: '7vh', padding: 2 }}>
          <MainNavLinks
            isAdmin={isAdmin}
            isAuth={isAuth}
            adminLinks={adminLinks}
            userLinks={userLinks}
          />
        </List>
      </Drawer>

      <List
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: { md: 'row' },
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1.5,
          padding: 0,
          margin: 0,
        }}
      >
        <MainNavLinks
          isAdmin={isAdmin}
          isAuth={isAuth}
          adminLinks={adminLinks}
          userLinks={userLinks}
        />
      </List>
    </nav>
  )
})

export default MainNavigation
