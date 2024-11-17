import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface AddDocumentButtonProps {
  onAddDocument: () => void
  disabled: boolean
}

export const AddDocumentButton = (props: AddDocumentButtonProps) => {
  const { onAddDocument, disabled } = props

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: '1rem',
        '& .MuiInputBase-root': {
          display: 'none',
        },
      }}
    >
      <Button variant="outlined" onClick={onAddDocument} disabled={!disabled}>
        Добавить документ
      </Button>
    </Box>
  )
}
