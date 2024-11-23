import { ROUTES } from '@/router/constants'
import { observer } from 'mobx-react-lite'
import authStore from '@/stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Box,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@mui/material'
import { Logout, AccountCircle } from '@mui/icons-material'

const UserControls = observer(() => {
  const navigate = useNavigate()
  const { isAuth, isAdmin, user } = authStore
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  let userCredentials = ''
  if (user) {
    userCredentials = !isAdmin ? user.email : `${user.email} (administrator)`
  }
  if (isAuth) {
    return (
      <Box>
        <Tooltip title={<Typography>{userCredentials}</Typography>}>
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
      </Box>
    )
  } else {
    return (
      <Box>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => navigate(ROUTES.signIn)}
        >
          LOGIN
        </Button>
      </Box>
    )
  }
})

export default UserControls
