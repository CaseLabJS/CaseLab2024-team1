import TextField from '@mui/material/TextField'
import { AutocompleteRenderInputParams } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { ForwardedRef } from 'react'

interface CustomInputProps {
  params: AutocompleteRenderInputParams
  placeholder: string
  ref: ForwardedRef<HTMLInputElement>
}

export const CustomInput = (props: CustomInputProps) => {
  const { params, placeholder, ref, ...otherProps } = props
  return (
    <TextField
      {...params}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      ref={ref}
      slotProps={{
        input: {
          ...params.InputProps,
          startAdornment: <SearchIcon sx={{ color: 'primary.dark', ml: 1 }} />,
          endAdornment: null,
        },
      }}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'background.paper',
        },
      }}
      {...otherProps}
    />
  )
}
