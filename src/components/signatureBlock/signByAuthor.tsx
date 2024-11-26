import { FC, useState } from 'react'
import { Stack, Button, ButtonGroup, Box } from '@mui/material'
import { SignByAuthorProps } from './types'
import documentSignService from '@/stores/DocumentsSignService'
import { SignatureModeSelector } from './signatureModeSelector'
import { Modes } from './types'
import { modesMap } from './constants'
import { User } from '@/types/sharedTypes'
import { ManageCensorsList } from './manageCensorsList'
export const SignByAuthor: FC<SignByAuthorProps> = ({ document }) => {
  const { loading } = documentSignService

  const [mode, setMode] = useState<Modes>(Modes.Signature)
  const [censors, setCensors] = useState<User[]>([])

  if (!document.isSignedByAuthor) {
    return (
      <Box>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={() => void document.sign(true)}
          disabled={loading}
        >
          Подписать документ
        </Button>
      </Box>
    )
  }

  return (
    <Stack spacing={2} direction="row" mt={2}>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button sx={{ minWidth: '14rem!important' }}>{modesMap[mode]}</Button>
        <SignatureModeSelector selectMode={setMode} />
      </ButtonGroup>
      <ManageCensorsList
        censors={censors}
        setCensors={setCensors}
        mode={mode}
      />
    </Stack>
  )
}
