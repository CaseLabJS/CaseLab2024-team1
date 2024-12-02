import { IconButton } from '@mui/material'
import TaskIcon from '@mui/icons-material/Task'

export const DocumentIsSigned = () => {
  return (
    <IconButton color="primary" size="medium">
      <TaskIcon />
      Подписан
    </IconButton>
  )
}
