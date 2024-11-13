import HomeHeader from '@/components/homePage/HomeHeader'
import { Box } from '@mui/material'
import Footer from '@/components/footer/Footer'
import HomeContent from '@/components/homePage/HomeContent'

const HomePage = () => {
  const generalStyle = {
    minWidth: 100,
    minHeight: '93vh',
    display: 'flex',
    justifyContent: 'center',
  }

  return (
    <>
      <Box sx={generalStyle}>
        <HomeHeader />
        <HomeContent />
      </Box>
      <Footer />
    </>
  )
}

export default HomePage
