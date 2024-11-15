import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/constants.ts'
import { Loader } from '@/components/loader/loader'
import EditUser from '../editUser/EditUser'
import { User, Role, Roles } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import { observer } from 'mobx-react-lite'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import {
  Box,
  IconButton,
  Paper,
  Typography,
  Button,
  Modal,
  Alert,
  Snackbar,
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import ConfirmPopover from './ConfirmPopover'

const UserTable: React.FC = observer(() => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number>(0)
  const [selectedUser, setSelectedUser] = useState<User>({
    id: 0,
    name: '',
    surname: '',
    roles: [],
    email: '',
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [loaderIsOpen, setLoaderIsOpen] = useState(true)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role>({
    id: 1,
    name: Roles.ADMIN,
  })
  const { loading, error } = usersListStore
  const navigate = useNavigate()
  const handleAddUser = () => {
    navigate(ROUTES.admin('users/create'))
  }
  const handleClose = () => {
    setAnchorEl(null)
    setPopoverIsOpen(false)
  }
  const handleDelete = async (id: number) => {
    await usersListStore.deleteUser(id)
    setSnackbarIsOpen(true)
    handleClose()
  }
  const handleEdit = (user: User) => {
    setSelectedUser({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      roles: user.roles,
    })
    setSelectedRole({ id: user.roles[0].id, name: user.roles[0].name })
    setIsEditModalOpen(true)
  }
  const handleCloseEdit = () => {
    setIsEditModalOpen(false)
    setSelectedUser({
      id: 0,
      name: '',
      surname: '',
      roles: [],
      email: '',
    })
  }
  useEffect(() => {
    void usersListStore.fetchUsers()
  }, [])
  useEffect(() => {
    if (error) {
      setSnackbarIsOpen(true)
    }
  }, [error])
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
        return `${roles[0]?.name || ''}`
      },
    },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 200,
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
            aria-label="delete"
            onClick={(event) => {
              setAnchorEl(event.currentTarget)
              setPopoverIsOpen(true)
              setIdToDelete(params.row.id)
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => {
              handleEdit(params.row)
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      ),
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
      <ConfirmPopover
        open={popoverIsOpen}
        anchorEl={anchorEl}
        title="Вы уверены?"
        onConfirm={() => void handleDelete(idToDelete)}
        onClose={handleClose}
      />
      <Modal open={isEditModalOpen} onClose={handleCloseEdit}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <EditUser
            user={selectedUser}
            role={selectedRole}
            onClose={handleCloseEdit}
          />
        </Box>
      </Modal>
      <Snackbar
        open={snackbarIsOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error.message : 'Пользователь удален'}
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

export default UserTable
