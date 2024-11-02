import AccountCircle from '@mui/icons-material/AccountCircle'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

export const EmailField = () => {
  return (
    <TextField
      label="Почта"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  )
}
