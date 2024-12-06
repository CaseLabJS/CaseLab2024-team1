import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
  Stack,
  Button,
  ButtonGroup,
  Box,
  Alert,
  Typography,
} from '@mui/material'
import documentSignService from '@/stores/DocumentsSignService'
import { SignatureModeSelector } from './signatureModeSelector'
import { CensorsListMenu } from './censorsListMenu'
import { VoteForm } from './voteForm'
import { modesMap } from './constants'
import { Modes, SignByAuthorProps, VoteFormValues } from './types'
import { DocumentTransitions } from '@/api/documentController/types'

export const SignByAuthor: FC<SignByAuthorProps> = observer(({ document }) => {
  const { loading } = documentSignService

  const [mode, setMode] = useState<Modes>(Modes.Signature)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  if (!document.isSignedByAuthor) {
    return (
      <Box mt={2}>
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

  if (
    document.documentData.state === DocumentTransitions.SENT_ON_SIGNING ||
    document.documentData.state === DocumentTransitions.SENT_ON_VOTING
  ) {
    return <Typography> Документ на согласовании или голосовании</Typography>
  }

  if (document.documentData.state === DocumentTransitions.SIGNED) {
    return <Typography> Документ согласован</Typography>
  }

  const showCensorsList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Stack spacing={2} direction="row" mt={2}>
      <ButtonGroup variant="contained" aria-label="manage censors">
        <Button sx={{ minWidth: '14rem!important' }} onClick={showCensorsList}>
          {modesMap[mode]}
        </Button>
        <SignatureModeSelector selectMode={setMode} />
      </ButtonGroup>
      <CensorsListMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        render={(censors) => {
          return mode === Modes.Signature ? (
            <>
              {censors.length > 1 && (
                <Alert severity="error">
                  Можно выбрать только одну подпись
                </Alert>
              )}
              <Button
                variant="contained"
                disabled={loading || !censors.length || censors.length > 1}
                onClick={() => void document.sendSignRequest(censors)}
              >
                {modesMap[mode]}
              </Button>
            </>
          ) : (
            <VoteForm
              disabled={loading || !censors.length}
              startVote={(formValues: VoteFormValues) =>
                void document.startVote({ ...formValues, censors })
              }
            />
          )
        }}
      />
    </Stack>
  )
})
