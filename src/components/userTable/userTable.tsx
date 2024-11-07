import React, { useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Button, Typography, Box, Paper } from '@mui/material'
import { User, Role, Roles } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import { observer } from 'mobx-react-lite'

const UserTable: React.FC = observer(() => {
  useEffect(() => {
    console.log(usersListStore.fetchUsers())
  }, [])

  const rows: User[] = [
    {
      id: 1,
      name: 'Владимир',
      surname: 'Бурнин',
      email: 'test1@example.com',
      roles: [{ id: 1, name: Roles.ADMIN }],
    },
    {
      id: 2,
      name: 'Никита',
      surname: 'Друкман',
      email: 'test2@example.com',
      roles: [{ id: 2, name: Roles.USER }],
    },
    {
      id: 3,
      name: 'Павел',
      surname: 'Егоров',
      email: 'test3@example.com',
      roles: [{ id: 2, name: Roles.USER }],
    },
  ]

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
          <Button variant="outlined">Добавить пользователя</Button>
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
