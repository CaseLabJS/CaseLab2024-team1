import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DocumentOptions } from '@/components/createDocumentForm/documentOptions/documentOptions.tsx'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import { FormValues } from '@/components/createDocumentForm/types.ts'

interface DocumentPackageInfoProps {
  initialValue: File[]
  requestSignature: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>, toggle: boolean) => void
}

export const DocumentPackageInfo = (props: DocumentPackageInfoProps) => {
  const { initialValue, requestSignature, onChange } = props
  const { register, formState } = useFormContext<FormValues>()

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.grey[900], 0.75)
            : alpha(theme.palette.grey[400], 0.25),
        padding: '1rem',
        gap: '1rem',
      }}
      variant="outlined"
      square
    >
      <Box>
        <Typography variant="body1">
          Пакет из {initialValue.length} документов
        </Typography>
      </Box>

      <DocumentOptions
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        errorMessage={formState.errors.recipient?.message}
        {...register('recipient', {
          required: 'Отправитель обязателен',
        })}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="requestSignature"
            checked={requestSignature}
            onChange={onChange}
          />
        }
        label="Запросить подпись контрагента для всех документов"
      />
    </Paper>
  )
}
