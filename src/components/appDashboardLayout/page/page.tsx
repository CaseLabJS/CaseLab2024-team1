import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'

export const Page = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  )
}
