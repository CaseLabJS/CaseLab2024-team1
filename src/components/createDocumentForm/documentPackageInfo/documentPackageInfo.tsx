import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DocumentOptions } from '@/components/createDocumentForm/documentOptions/documentOptions.tsx'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { ChangeEvent } from 'react'
import {testFiles} from "@/stories/createDocumentForm/testData/testData.ts";

interface DocumentPackageInfoProps {
  requestSignature: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>, toggle: boolean) => void
}

export const DocumentPackageInfo = (props: DocumentPackageInfoProps) => {
  const { requestSignature, onChange } = props

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#7c7b7b42',
        padding: '1rem',
        gap: '1rem',
      }}
    >
      <Box>
        <Typography variant="body1">
          Пакет из {testFiles.length} документов
        </Typography>
      </Box>

      <DocumentOptions
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
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

    </Box>
  )
}
