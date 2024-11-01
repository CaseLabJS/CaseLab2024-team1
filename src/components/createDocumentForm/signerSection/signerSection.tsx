import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import { useTheme } from '@mui/material'
import InputBase from '@mui/material/InputBase'

export const SignerSection = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem 0',
      }}
    >
      <Typography variant="h6">Подписание документов</Typography>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Typography
          variant="body2"
          sx={{ minWidth: { xs: '2rem', sm: '4rem', md: '6rem' } }}
        >
          Подписант
        </Typography>
        <InputLabel
          htmlFor="fileСertificate"
          sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
        >
          Выбрать подпись
        </InputLabel>
        <InputBase
          id="fileСertificate"
          sx={{ display: 'none' }}
          inputProps={{
            accept: '.pdf,.png,.jpg,.jpeg,.txt,.docx',
            multiple: false,
          }}
          type="file"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Typography
          variant="body2"
          sx={{ minWidth: { xs: '2rem', sm: '4rem', md: '6rem' } }}
        >
          Доверенность
        </Typography>
        <InputLabel
          htmlFor="fileAttorney"
          sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
        >
          Выбрать доверенность
        </InputLabel>
        <InputBase
          id="fileAttorney"
          sx={{ display: 'none' }}
          inputProps={{
            accept: '.pdf,.png,.jpg,.jpeg,.txt,.docx',
            multiple: false,
          }}
          type="file"
        />
      </Box>
    </Box>
  )
}
