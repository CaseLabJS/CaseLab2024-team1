import { styled, TextareaAutosize as BaseTextareaAutosize } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.23) : alpha(theme.palette.common.black, 0.23)};
  background-color: transparent;
  resize: vertical;
  
  &:hover {
    border-color: ${theme.palette.text.primary};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.info.light};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
)
