import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MuiAutocomplete from '@mui/material/Autocomplete'
import { ForwardedRef, forwardRef, useCallback } from 'react'

interface GenericOption {
  id: number
}

interface CustomAutocompleteProps<T extends GenericOption> {
  /**
   * An array of options to be displayed in the autocomplete dropdown
   */
  options: T[]

  /**
   * The label for the input field
   */
  label?: string

  /**
   * The unique identifier for the component
   */
  id: string

  /**
   * Text to display when no options are available
   */
  noOptionsText?: string

  /**
   * An array of keys from the options to be displayed as labels
   */
  displayFields: (keyof T)[]

  /**
   * Custom styles for the component
   */
  sx?: object

  /**
   * The default value to be displayed in the input field
   */
  defaultValue?: T

  /**
   * Error message
   */
  errorMessage?: string
}

const CustomAutocomplete = <T extends GenericOption>(
  props: CustomAutocompleteProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    options,
    label,
    id,
    noOptionsText = 'Нет вариантов',
    displayFields,
    sx,
    defaultValue,
    errorMessage,
    ...otherProps
  } = props

  const getOptionLabel = useCallback(
    (option: T) => {
      return displayFields.map((field) => option[field]).join(' ')
    },
    [displayFields]
  )

  const filterOptions = useCallback(
    (options: T[], { inputValue }: { inputValue: string }) => {
      const lowercasedInput = inputValue.toLowerCase()
      return options.filter((option) =>
        displayFields.some((field) =>
          String(option[field]).toLowerCase().includes(lowercasedInput)
        )
      )
    },
    [displayFields]
  )

  return (
    <MuiAutocomplete
      fullWidth
      disablePortal
      options={options}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      renderOption={(props, option) => {
        return (
          <Box component="li" {...props} key={props.id}>
            {getOptionLabel(option)}
          </Box>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          ref={ref}
          error={!!errorMessage}
          helperText={errorMessage}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'background.paper',
            },
          }}
          {...otherProps}
        />
      )}
      id={id}
      sx={{
        borderRadius: '0.5rem',
        ...sx,
      }}
      noOptionsText={noOptionsText}
      defaultValue={defaultValue}
    />
  )
}

CustomAutocomplete.displayName = 'CustomAutocomplete'

export const Autocomplete = forwardRef(CustomAutocomplete) as <
  T extends GenericOption,
>(
  props: CustomAutocompleteProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof CustomAutocomplete>
