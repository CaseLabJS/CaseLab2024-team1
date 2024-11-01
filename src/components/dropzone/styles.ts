import { alpha, Theme } from '@mui/material/styles'
import { SxProps } from '@mui/material'

export const style: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: { xs: '1rem', lg: '2rem 0' },
  },
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    cursor: 'pointer',
    padding: '3rem',
    borderWidth: '.3rem',
    borderRadius: '1rem',
    borderColor: 'grey.500',
    borderStyle: 'dashed',
    outline: 'none',
    transition: 'border 0.2s, background-color 0.2s',
    textAlign: 'center',
    '&:hover': {
      borderColor: 'grey.600',
      backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.1),
    },
  },
  icons: {
    height: '2.5rem',
    width: '2.5rem',
    color: "grey.600"
  },
  bottomSectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  bottomSection: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid gray',
    borderRadius: '0.5rem',
    padding: '0.7rem',
  },
  active: {
    borderWidth: '.3rem',
    borderColor: 'success.main',
    boxShadow: (theme) => theme.shadows[11],
  },
}
