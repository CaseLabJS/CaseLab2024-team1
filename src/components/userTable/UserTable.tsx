import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Role } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import { observer } from 'mobx-react-lite'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import {
  Button,
  Typography,
  Box,
  Paper,
  Popover,
  IconButton,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from '@mui/icons-material'

const UserTable: React.FC = observer(() => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number>(0)
  const navigate = useNavigate()
  const handleAddUser = () => {
    navigate('/admin/users/create')
  }
  const handleClose = () => {
    setAnchorEl(null)
    setPopoverIsOpen(false)
  }
  const handleDelete = (id: number) => {
    void usersListStore.deleteUser(id)
    handleClose()
  }
  useEffect(() => {
    void usersListStore.fetchUsers()
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
    {
      field: 'actions',
      headerName: 'Действия',
      width: 200,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
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
          <IconButton aria-label="edit">
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
      <Popover
        open={popoverIsOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            padding: 1,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '26px',
          }}
        >
          <Typography>Вы уверены?</Typography>
          <Button onClick={() => handleDelete(idToDelete)}>Да</Button>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Popover>
    </Paper>
  )
})

export default UserTable
