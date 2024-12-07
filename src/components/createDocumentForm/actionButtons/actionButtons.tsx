import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

interface ActionButtonsProps {
  onSaveDraft: () => void
}

export const ActionButtons = (props: ActionButtonsProps) => {
  const { onSaveDraft } = props
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
            onClick={onSaveDraft}
            type="submit"
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
            onClick={() => navigate(-1)}
          >
            Отменить
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
