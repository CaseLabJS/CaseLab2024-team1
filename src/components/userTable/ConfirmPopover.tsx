import { observer } from 'mobx-react-lite'
import { Popover, Box, Typography, Button, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

interface ConfirmPopoverProps {
  open: boolean
  anchorEl: HTMLButtonElement | null
  title: string
  onConfirm: () => void
  onClose: () => void
}
const ConfirmPopover: React.FC<ConfirmPopoverProps> = observer(
  ({ open, anchorEl, title, onConfirm, onClose }) => {
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
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
          <Typography>{title}</Typography>
          <Button onClick={onConfirm}>Да</Button>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Popover>
    )
  }
)

export default ConfirmPopover
