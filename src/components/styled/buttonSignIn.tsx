import Button from '@mui/material/Button'

export const ButtonSignIn = () => {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Войти
    </Button>
  )
}
