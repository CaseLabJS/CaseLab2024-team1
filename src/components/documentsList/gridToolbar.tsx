import Box from '@mui/material/Box'
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { ToolbarButton } from '@/types/types'

interface GridToolbarProps {
  buttons?: ToolbarButton[]
}

export const GridToolbar = (props: GridToolbarProps) => {
  const { buttons } = props

  return (
    <GridToolbarContainer
      sx={{ padding: '0.5rem', justifyContent: 'space-between' }}
    >
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarExport
          csvOptions={{
            delimiter: ';',
            utf8WithBom: true,
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        {buttons?.map((button, index) => (
          <Button
            key={index}
            size="small"
            variant="outlined"
            onClick={() => void button.onClick()}
            disabled={button.disabled}
          >
            {button.content} {button.text}
          </Button>
        ))}
      </Box>
    </GridToolbarContainer>
  )
}
