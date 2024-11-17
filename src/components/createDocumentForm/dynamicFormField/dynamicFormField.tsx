import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import { forwardRef, Ref, useCallback, useState } from 'react'
import Box from '@mui/material/Box'

interface DynamicFormFieldProps {
  title: string
  required: boolean
  errorMessage?: string
}

export const DynamicFormField = forwardRef(
  (props: DynamicFormFieldProps, ref: Ref<HTMLInputElement>) => {
    const { title, required, errorMessage, ...otherProps } = props
    const [visible, setVisible] = useState(required)

    const handleShowField = useCallback(() => {
      setVisible((prev) => !prev)
    }, [])

    return (
      <FormControl
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          '& .MuiFormControl-root': {
            maxWidth: '25rem',
          },
        }}
      >
        <Box
          sx={{
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            minWidth: { xs: '2rem', sm: '4rem', md: '6rem' },
            flexShrink: 0,
          }}
        >
          <Typography variant="body2">{title}</Typography>
        </Box>
        {!required && !visible && (
          <Button
            onClick={() => handleShowField()}
            variant="text"
            sx={{
              '&.MuiButtonBase-root': {
                fontSize: 'small',
              },
            }}
          >
            Заполнить
          </Button>
        )}
        {visible && (
          <TextField
            fullWidth
            ref={ref}
            size="small"
            error={!!errorMessage}
            helperText={errorMessage}
            slotProps={{
              htmlInput: { ...otherProps },
            }}
          />
        )}
      </FormControl>
    )
  }
)

DynamicFormField.displayName = 'DynamicFormField'
