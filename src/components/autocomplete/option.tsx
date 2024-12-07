import Box from '@mui/material/Box'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import Typography from '@mui/material/Typography'
import { highlightText } from '@/components/search/documentItem/highlightText.tsx'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { useCallback, useMemo } from 'react'

interface CustomOptionProps<T> {
  option: T
  inputValue: string
  displayFields: (keyof T)[]
}

export const CustomOption = <T,>(props: CustomOptionProps<T>) => {
  const { option, inputValue, displayFields, ...otherProps } = props

  const label = useMemo(() => {
    return displayFields.map((field) => option[field]).join('|')
  }, [displayFields, option])
  const [title, description] = label.split('|')

  const shortenStrings = useCallback((string: string, maxLength: number) => {
    return string.length > maxLength
      ? `${string.slice(0, maxLength)}...`
      : string
  }, [])

  const shortenedDescription = shortenStrings(description, 25)
  const shortenedTitle = shortenStrings(title, 20)

  return (
    <Box
      component="li"
      {...otherProps}
      sx={{
        display: 'flex',
        borderRadius: '0.5rem',
        margin: '0 0.5rem',
        '&.MuiAutocomplete-option': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <InsertDriveFileIcon className="main-icon" sx={{ color: 'grey.600' }} />
        <Box>
          <Typography className="title-text" variant="body1">
            {highlightText(shortenedTitle, inputValue)}
          </Typography>
          <Typography
            className="description-text"
            variant="body2"
            sx={{ fontSize: '0.8rem', color: 'grey.500' }}
          >
            {highlightText(shortenedDescription, inputValue)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <KeyboardReturnIcon sx={{ opacity: 0 }} className="main-icon" />
      </Box>
    </Box>
  )
}
