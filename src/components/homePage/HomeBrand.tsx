import { Box, Typography } from '@mui/material'
import Bird from '@/assets/bird.svg'
const HomeBrand = () => {
  const brandStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minWidth: 220,
  }
  return (
    <>
      <Box sx={brandStyle}>
        <Box>
          <img src={Bird} alt="Logo" width={50} height={50} />
        </Box>
        <Typography
          color="primary"
          variant="h4"
          component="h1"
          sx={{ fontSize: '1.8rem' }}
        >
          TechDoc
        </Typography>
      </Box>
    </>
  )
}
export default HomeBrand
