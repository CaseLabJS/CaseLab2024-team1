import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Button, Typography, Box, Paper } from '@mui/material'
import { User, Role } from '@/types/sharedTypes'
import { observer } from 'mobx-react-lite'
import { usersListStore } from '@/stores/UsersListStore'

const UserTable: React.FC = observer(() => {
  const navigate = useNavigate()
  const handleAddUser = () => {
    navigate('/admin/users/create')
  }
  useEffect(() => {
    void usersListStore.fetchUsers()
  }, [])
  const rows: User[] = usersListStore.users.map((user) => ({
    id: user.userData.id,
    name: user.userData.name,
    surname: user.userData.surname,
    email: user.userData.email,
    roles: user.userData.roles,
  }))
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'name',
      headerName: 'Имя',
      width: 200,
    },
    {
      field: 'surname',
      headerName: 'Фамилия',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'roles',
      headerName: 'Роль',
      width: 200,
      valueGetter: (roles: Role[]) => {
        return `${roles[0].name}`
      },
    },
  ]

  return (
    <Paper>
      <Box sx={{ p: 3 }}>
        <Box textAlign="left" mb={1}>
          <Typography variant="h5">Пользователи</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="outlined" onClick={handleAddUser}>
            Добавить пользователя
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Paper>
  )
})

export default UserTable
