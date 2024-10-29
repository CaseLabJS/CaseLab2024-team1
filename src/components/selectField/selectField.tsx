import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import {ChangeEvent, forwardRef, Ref} from 'react'

interface SelectFieldProps<T extends Record<string, any>> {
  /**
   * An array of options to select from
   */
  options: T[]

  /**
   * The label for the input field
   */
  label?: string

  /**
   * Determines if the field should take full width
   */
  fullWidth?: boolean

  /**
   * Additional styles for the TextField component
   */
  sx?: object

  /**
   * A function to get the label for each option.
   */
  getOptionLabel: (option: T) => string


  /**
   * The current value of the select field.
   */
  value: string

  /**
   * A callback function to handle changes in the select field.
   */
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

export const SelectField = forwardRef(<T extends Record<string, any>>(
  props: SelectFieldProps<T>,
  ref: Ref<HTMLInputElement>
) => {
  const {
    options,
    label,
    fullWidth = false,
    sx,
    getOptionLabel,
    value,
    onChange,
    ...otherProps
  } = props

  return (
    <FormControl fullWidth={fullWidth}>
      <TextField
        select
        ref={ref}
        label={label}
        sx={{
          '& .MuiSelect-select': {
            minWidth: '7rem',
            padding: '0.5rem 2rem',
          },
          ...sx,
        }}
        {...otherProps}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={getOptionLabel(option)}>
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  )
})
