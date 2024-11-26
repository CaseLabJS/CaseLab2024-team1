import HomeHeader from '@/components/homePage/HomeHeader'
import Footer from '@/components/footer/Footer'
import HomeContent from '@/components/homePage/homeContent/HomeContent'
import { Box } from '@mui/material'

const HomePage: React.FC = () => {
  return (
    <>
      <HomeHeader />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '100px',
          minHeight: '85svh',
        }}
      >
        <HomeContent />
      </Box>
      <Footer />
    </>
  )
}

export default HomePage
