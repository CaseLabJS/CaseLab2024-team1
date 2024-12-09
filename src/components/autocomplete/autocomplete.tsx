import MuiAutocomplete from '@mui/material/Autocomplete'
import {
  ForwardedRef,
  forwardRef,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/constants.ts'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { CustomOption } from '@/components/autocomplete/option.tsx'
import { CustomInput } from '@/components/autocomplete/input.tsx'
import searchStore from '@/stores/SearchStore'
import { Document } from '@/types/sharedTypes.ts'
import authStore from '@/stores/AuthStore'

interface GenericOption {
  id: number
}

interface CustomAutocompleteProps<T extends GenericOption> {
  /**
   * An array of options to be displayed in the autocomplete dropdown
   */
  options: T[]

  /**
   * The placeholder for the input field
   */
  placeholder?: string

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
   * Indicates whether the component is disabled
   */
  isDisabled?: boolean

  /**
   * Indicates whether the component is in a loading state
   */
  isLoading?: boolean

  /**
   * Callback function to be called when the component is clicked
   */
  onClick?: () => void

  /**
   * Callback function to be called when a value is added
   */
  onValueAdd?: (value: T) => void
}

const CustomAutocomplete = <T extends GenericOption>(
  props: CustomAutocompleteProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    options,
    placeholder,
    id,
    noOptionsText = 'Нет вариантов',
    displayFields,
    sx,
    defaultValue,
    isDisabled,
    isLoading,
    onClick,
    onValueAdd,
    ...otherProps
  } = props

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<T | null>(null)
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()
  const { findDocumentById } = searchStore
  const { user } = authStore
  const getOptionLabel = useCallback(
    (option: T) => {
      return displayFields.map((field) => option[field]).join('|')
    },
    [displayFields]
  )

  const filterOptions = useCallback(
    (options: T[], { inputValue }: { inputValue: string }) => {
      const lowercasedInput = inputValue.toLowerCase()
      return options.filter((option) =>
        displayFields.some((field) =>
          String(option[field]).toLowerCase().startsWith(lowercasedInput)
        )
      )
    },
    [displayFields]
  )

  const handleInputChange = useCallback(
    (_event: SyntheticEvent, value: string) => {
      setOpen(value.length > 0)
      setInputValue(value)

      if (onClick) {
        onClick()
      }
    },
    [onClick]
  )

  const handleChange = useCallback(
    (_event: SyntheticEvent, value: T | null) => {
      setSelectedValue(value)
      setOpen(false)
      setInputValue('')

      if (value && onValueAdd) {
        const document: Document | null = findDocumentById(value.id)

        if (document) {
          setSelectedValue(null)
          onValueAdd(value)
          navigate(
            `${ROUTES.app(document.user.id === user?.id ? 'forward' : 'inbox')}/${value.id}`
          )
        }
      }
    },
    [findDocumentById, navigate, onValueAdd, user?.id]
  )

  return (
    <MuiAutocomplete
      open={open}
      onInputChange={handleInputChange}
      onChange={handleChange}
      size="small"
      fullWidth
      disablePortal
      options={options}
      loading={isLoading}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={filterOptions}
      disabled={isDisabled}
      value={selectedValue}
      renderOption={(props, option) => (
        <CustomOption
          option={option}
          displayFields={displayFields}
          inputValue={inputValue}
          {...props}
          key={option.id}
        />
      )}
      renderInput={(params) => (
        <CustomInput
          params={params}
          placeholder={placeholder || ''}
          ref={ref}
          {...otherProps}
        />
      )}
      id={id}
      PaperComponent={(props) => (
        <Paper
          {...props}
          sx={{
            '& .MuiAutocomplete-listbox': {
              '& .Mui-focused': {
                backgroundColor: alpha(theme.palette.primary.light, 0.15),
                '& .title-text, .description-text, .main-icon': {
                  color: 'primary.main',
                },
                '& .main-icon': {
                  opacity: 1,
                },
              },
              '&::-webkit-scrollbar': {
                width: '0.5rem',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'grey',
                borderRadius: '0.5rem',
              },
            },
          }}
        />
      )}
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
