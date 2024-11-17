import { ROUTES } from '@/router/constants'
import { observer } from 'mobx-react-lite'
import authStore from '@/stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Divider, Typography } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ArticleIcon from '@mui/icons-material/Article'

const HomeNavigation: React.FC = observer(() => {
  const navigate = useNavigate()
  const { isAuth, isAdmin } = authStore
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'flex', md: 'flex' },
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isAdmin && (
        <>
          <Box onClick={() => navigate(ROUTES.admin())}>
            <Button size="large" sx={{ color: 'white', display: 'flex' }}>
              <AdminPanelSettingsIcon sx={{ height: 30, width: 30 }} />
              <Typography
                variant="subtitle1"
                sx={{ display: { xs: 'none', md: 'flex' }, ml: 1 }}
              >
                Панель администратора
              </Typography>
            </Button>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
        </>
      )}
      {isAuth && (
        <Button
          size="large"
          onClick={() => navigate(ROUTES.app())}
          sx={{ color: 'white', display: 'flex' }}
        >
          <ArticleIcon sx={{ height: 30, width: 30 }} />
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'none', md: 'flex' }, ml: 1 }}
          >
            Перейти к приложению
          </Typography>
        </Button>
      )}
    </Box>
  )
})
export default HomeNavigation
