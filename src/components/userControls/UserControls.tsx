import { observer } from 'mobx-react-lite'
import authStore from '@/stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material'
import { Logout, AccountCircle } from '@mui/icons-material'
import { ROUTES } from '@/router/constants'
import { Roles } from '@/types/sharedTypes'

const UserControls = observer(() => {
  const navigate = useNavigate()
  const { isAuth, user } = authStore
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  let userCredentials = ''
  if (user) {
    userCredentials = !user.roles.includes(Roles.ADMIN)
      ? user.email
      : `${user.email} (administrator)`
  }
  if (isAuth) {
    return (
      <>
        <Tooltip title={<h3 style={{ height: 20 }}>{userCredentials}</h3>}>
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenUserMenu}
          >
            <AccountCircle sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            sx={{ width: 150 }}
            onClick={() => navigate(ROUTES.signOut)}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    )
  } else {
    return (
      <>
        <Button variant="contained" onClick={() => navigate(ROUTES.signIn)}>
          LOGIN
        </Button>
      </>
    )
  }
})

export default UserControls
