import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { ChangeEvent, ForwardedRef, forwardRef } from 'react'

interface GenericOption {
  id: number
}

interface SelectFieldProps<T extends GenericOption> {
  /**
   * An array of options to select from
   */
  options: T[]

  /**
   * The label for the input field
   */
  label?: string

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
  value?: string | number

  /**
   * A callback function to handle changes in the select field.
   */
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
}

const SelectFieldInner = <T extends GenericOption>(
  props: SelectFieldProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { options, label, sx, getOptionLabel, value, onChange, ...otherProps } =
    props

  return (
    <TextField
      select
      fullWidth
      ref={ref}
      label={label}
      sx={{
        '& .MuiSelect-select': {
          minWidth: '7rem',
        },
        ...sx,
      }}
      {...otherProps}
      onChange={onChange}
      value={value}
      size="small"
      margin="dense"
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {getOptionLabel(option)}
        </MenuItem>
      ))}
    </TextField>
  )
}

SelectFieldInner.displayName = 'SelectFieldInner'

export const SelectField = forwardRef(SelectFieldInner) as <
  T extends GenericOption,
>(
  props: SelectFieldProps<T> & { ref?: ForwardedRef<HTMLUListElement> }
) => ReturnType<typeof SelectFieldInner>
