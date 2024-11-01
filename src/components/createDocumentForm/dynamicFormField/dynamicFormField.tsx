import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import { forwardRef, Ref, useCallback, useState } from 'react'
import { Attribute } from '@/types/sharedTypes.ts'
import Box from '@mui/material/Box'

interface DynamicFormFieldProps {
  attr: Attribute
  errorMessage?: string
}

export const DynamicFormField = forwardRef(
  (props: DynamicFormFieldProps, ref: Ref<HTMLInputElement>) => {
    const { attr, errorMessage, ...otherProps } = props
    const [visible, setVisible] = useState(attr.required)

    const handleShowField = useCallback(() => {
      setVisible((prev) => !prev)
    }, [])

    return (
      <FormControl
        key={attr.id}
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          '& .MuiFormControl-root': {
            maxWidth: '25rem',
          },
          '& .MuiInputBase-input': {
            padding: '.5rem',
          },
        }}
      >
        <Box
          sx={{
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            minWidth: { xs: '2rem', sm: '4rem', md: '6rem' },
          }}
        >
          <Typography variant="body2">{attr.name}</Typography>
        </Box>
        {!attr.required && !visible && (
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
