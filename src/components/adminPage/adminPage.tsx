import Paper from '@mui/material/Paper'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <Paper>
      <Outlet />
    </Paper>
  )
}

export default AdminPage
