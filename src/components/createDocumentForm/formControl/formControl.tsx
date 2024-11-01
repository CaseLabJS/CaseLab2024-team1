import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import { StyledSwitch } from '@/components/styled/switch.tsx'
import InputLabel from '@mui/material/InputLabel'
import { ChangeEvent } from 'react'
import { InputBase, useTheme } from '@mui/material'

interface FormControlProps {
  isChecked: boolean
  handleChangeChecked: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormControl = (props: FormControlProps) => {
  const { isChecked, handleChangeChecked } = props
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        paddingBottom: '1.5rem',
        '& .MuiInputBase-root': {
          display: 'none',
        },
      }}
    >
      <FormControlLabel
        sx={{
          margin: 0,
          gap: '0.5rem',
          '& .MuiFormControlLabel-label': {
            fontSize: '14px',
          },
        }}
        control={
          <StyledSwitch
            sx={{ m: 1 }}
            checked={isChecked}
            onChange={handleChangeChecked}
          />
        }
        label="Объединить все документы в единый пакет"
      />
      <InputLabel
        htmlFor="fileInput"
        sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
      >
        Загрузить ещё
      </InputLabel>
      <InputBase
        type="file"
        id="fileInput"
        sx={{ display: 'none' }}
        inputProps={{
          accept: '.pdf,.png,.jpg,.jpeg,.txt,.docx',
          multiple: false,
        }}
      />
    </Box>
  )
}
