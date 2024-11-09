import { Paper, Box } from '@mui/material'
import Footer from '@/components/footer/Footer'
import { observer } from 'mobx-react-lite'

const AdminPage = observer(() => {
  return (
    <Paper>
      <Box
        sx={{
          width: '90vw',
          height: '7vh',
          borderRadius: '15px',
        }}
      >
        Header
      </Box>
      <Box
        sx={{
          width: '90vw',
          height: '7vh',
          borderRadius: '15px',
          my: '3vh',
        }}
      >
        Admin panel
      </Box>
      <Box
        sx={{
          width: '100vw',
          height: '7vh',
          backgroundColor: 'background.default',
        }}
      >
        <Footer />
      </Box>
    </Paper>
  )
})

export default AdminPage
