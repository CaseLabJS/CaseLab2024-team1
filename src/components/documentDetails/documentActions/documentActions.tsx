import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { ToolbarButton } from '@/types/types.ts'
import { SignatureBlock } from '@/components/signatureBlock'

interface DocumentActionsProps {
  buttons: ToolbarButton[]
}

export const DocumentActions = (props: DocumentActionsProps) => {
  const { buttons } = props

  return (
    <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          size="small"
          sx={{
            display: 'flex',
            gap: '0.2rem',
          }}
          variant="outlined"
          onClick={() => void button.onClick()}
          disabled={button.disabled}
        >
          {button.content} {button.text}
        </Button>
      ))}
      {<SignatureBlock />}
    </Box>
  )
}
