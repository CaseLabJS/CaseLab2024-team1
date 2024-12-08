import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Stack, Button, ButtonGroup, Alert } from '@mui/material'
import documentSignService from '@/stores/DocumentsSignService'
import { SignatureModeSelector } from './signatureModeSelector'
import { CensorsListMenu } from './censorsListMenu'
import { VoteForm } from './voteForm'
import { modesMap } from './constants'
import { Modes, SignByAuthorProps, VoteFormValues } from './types'
import { DocumentTransitions } from '@/api/documentController/types'
import GradingIcon from '@mui/icons-material/Grading'
import { runInAction } from 'mobx'

export const SignByAuthor: FC<SignByAuthorProps> = observer(({ document }) => {
  const { loading } = documentSignService

  const [mode, setMode] = useState<Modes>(Modes.Signature)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  if (!document.isSignedByAuthor) {
    return (
      <Button
        size="small"
        sx={{
          display: 'flex',
          gap: '0.2rem',
        }}
        variant="outlined"
        onClick={() => void document.sign(true)}
        disabled={loading}
      >
        <GradingIcon />
        Подписать документ
      </Button>
    )
  }

  if (
    document.documentData.state === DocumentTransitions.SENT_ON_SIGNING ||
    document.documentData.state === DocumentTransitions.SENT_ON_VOTING ||
    document.documentData.state === DocumentTransitions.SIGNED
  ) {
    return null
  }

  const showCensorsList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Stack spacing={2} direction="row">
      <ButtonGroup variant="outlined" aria-label="manage censors">
        <Button
          size="small"
          sx={{ minWidth: '11rem!important' }}
          onClick={showCensorsList}
        >
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
                onClick={() => {
                  void document.sendSignRequest(censors)
                  runInAction(() => {
                    document.documentData.state =
                      DocumentTransitions.SENT_ON_SIGNING
                  })
                }}
              >
                {modesMap[mode]}
              </Button>
            </>
          ) : (
            <VoteForm
              disabled={loading || !censors.length}
              startVote={(formValues: VoteFormValues) => {
                void document.startVote({ ...formValues, censors })
                runInAction(() => {
                  document.documentData.state =
                    DocumentTransitions.SENT_ON_VOTING
                })
              }}
            />
          )
        }}
      />
    </Stack>
  )
})
