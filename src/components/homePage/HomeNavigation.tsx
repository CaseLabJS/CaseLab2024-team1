import { ROUTES } from '@/router/constants'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HomeNavigation = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button
          onClick={() => navigate(ROUTES.app())}
          sx={{
            textTransform: 'none',
            my: 2,
            color: 'white',
            display: 'block',
          }}
        >
          App
        </Button>
      </Box>
    </>
  )
}
export default HomeNavigation
