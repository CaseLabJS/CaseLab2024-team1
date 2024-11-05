import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Button, Typography, Box, Paper } from '@mui/material'

import { User } from '@/types/sharedTypes'

const UserTable: React.FC = () => {
  const rows: User[] = [
    {
      id: 1,
      name: 'Владимир',
      surname: 'Бурнин',
      email: 'test1@example.com',
      roles: [{ id: 1, name: 'Admin' }],
    },
    {
      id: 2,
      name: 'Никита',
      surname: 'Друкман',
      email: 'test2@example.com',
      roles: [{ id: 2, name: 'User' }],
    },
    {
      id: 3,
      name: 'Павел',
      surname: 'Егоров',
      email: 'test3@example.com',
      roles: [{ id: 2, name: 'User' }],
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
}

export default UserTable
