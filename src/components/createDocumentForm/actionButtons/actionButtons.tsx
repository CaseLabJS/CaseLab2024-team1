import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/constants.ts'

export const ActionButtons = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        justifyContent: { md: 'space-between', xs: 'center' },
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Box>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Сохранить документ
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Box>
          <Button
            color="primary"
            fullWidth
            size="small"
            variant="text"
            onClick={() => navigate(ROUTES.app('draft'))}
          >
            Сохранить в черновиках
          </Button>
        </Box>
        <Box>
          <Button
            color="primary"
            fullWidth
            variant="text"
            size="small"
            onClick={() => navigate('..')}
          >
            Отменить
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
