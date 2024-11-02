import { Paper, Box } from '@mui/material'

const AdminPage = () => {
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
          width: '90vw',
          height: '7vh',
          borderRadius: '15px',
        }}
      >
        Footer
      </Box>
    </Paper>
  )
}

export default AdminPage
