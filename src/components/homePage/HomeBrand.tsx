import { Box, Typography } from '@mui/material'
import Bird from '@/assets/bird.svg'
const HomeBrand = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
        <img src={Bird} alt="Logo" width={40} height={40} />
      </Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontSize: '1.6rem', mr: 1 }}
      >
        TechDoc
      </Typography>
    </Box>
  )
}
export default HomeBrand
