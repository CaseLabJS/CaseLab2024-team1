import React, { useEffect, useState } from 'react'
import { Loader } from '@/components/loader/loader'
import { User, Role } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import { observer } from 'mobx-react-lite'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import {
  Box,
  IconButton,
  Paper,
  Typography,
  Modal,
  Alert,
  Snackbar,
} from '@mui/material'
import { Unarchive as UnarchiveIcon } from '@mui/icons-material'

const DeletedUsers: React.FC = observer(() => {
  const [loaderIsOpen, setLoaderIsOpen] = useState(true)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const { loading, error } = usersListStore
  const handleRecover = async (id: number) => {
    await usersListStore.recoverUser(id)
    setSnackbarIsOpen(true)
  }
  useEffect(() => {
    void usersListStore.fetchUsers({ isAlive: false })
  }, [])
  const rows: User[] = usersListStore.users.map(({ userData }) => ({
    id: userData.id,
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
    roles: userData.roles,
  }))
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 50,
    },
    {
      field: 'name',
      headerName: 'Имя',
      flex: 2,
      minWidth: 160,
    },
    {
      field: 'surname',
      headerName: 'Фамилия',
      flex: 2,
      minWidth: 160,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
      minWidth: 150,
    },
    {
      field: 'roles',
      headerName: 'Роль',
      flex: 1.5,
      minWidth: 100,
      valueGetter: (roles: Role[]) => {
        return `${roles[0]?.name || ''}`
      },
    },
    {
      field: 'actions',
      headerName: 'Действия',
      flex: 1.5,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            width: 'fit-content',
          }}
        >
          <IconButton
            aria-label="recover"
            onClick={() => {
              void handleRecover(params.row.id)
            }}
          >
            <UnarchiveIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Paper>
      <Box sx={{ p: 3 }}>
        <Box textAlign="left" mb={1}>
          <Typography variant="h5">Удаленные пользователи</Typography>
        </Box>
        <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
      </Box>
      <Snackbar
        open={snackbarIsOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error.message : 'Пользователь восстановлен'}
        </Alert>
      </Snackbar>
      <Modal
        open={loading && loaderIsOpen}
        onClick={() => setLoaderIsOpen(false)}
        closeAfterTransition
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Loader />
        </Box>
      </Modal>
    </Paper>
  )
})

export default DeletedUsers
