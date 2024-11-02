import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { forwardRef, Ref, useCallback } from 'react'

//any необходимо, чтобы компонент мог принимать любой массив данных в виде опций
interface CustomAutocompleteProps<T extends Record<string, any>> {
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

export const CustomAutocomplete = forwardRef(
  <T extends Record<string, any>>(
    props: CustomAutocompleteProps<T>,
    ref: Ref<HTMLInputElement>
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
      <Autocomplete
        fullWidth
        disablePortal
        options={options}
        getOptionLabel={getOptionLabel}
        filterOptions={filterOptions}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props
          return (
            <Box key={key} component="li" {...optionProps}>
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
            {...otherProps}
          />
        )}
        id={id}
        sx={{
          minWidth: '25rem',
          backgroundColor: 'background.paper',
          borderRadius: '0.5rem',
          ...sx,
        }}
        noOptionsText={noOptionsText}
        defaultValue={defaultValue}
      />
    )
  }
)
