import { Typography, Box } from '@mui/material'
import ContentRows from './ContentRows'
const HomeContent: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: { xs: 380, md: 800, lg: 1400 },
        minWidth: { xs: 380, md: 800, lg: 1400 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ContentRows />
      <Box sx={{ my: 5 }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: {
              xs: '1.5rem',
              lg: '2rem',
            },
            lineHeight: {
              xs: '30px',
            },
            p: 0,
          }}
        >
          Все это и многое другое вы найдете в TechDoc.
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: {
              xs: '1.5rem',
              lg: '2rem',
            },
            lineHeight: {
              xs: '30px',
            },
            p: 0,
          }}
        >
          Присоединяйтесь, с TechDoc ваши документы в надежных руках!
        </Typography>
      </Box>
    </Box>
  )
}

export default HomeContent
