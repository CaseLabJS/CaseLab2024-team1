import HomeHeader from '@/components/homePage/HomeHeader'
import Footer from '@/components/footer/Footer'
import HomeContent from '@/components/homePage/HomeContent'
import { Box } from '@mui/material'

const HomePage = () => {
  const generalStyle = {
    minWidth: 100,
    display: 'flex',
    justifyContent: 'center',
    mt: '100px',
    minHeight: '85svh',
  }

  return (
    <>
      <HomeHeader />
      <Box sx={generalStyle}>
        <HomeContent />
      </Box>
      <Footer />
    </>
  )
}

export default HomePage
