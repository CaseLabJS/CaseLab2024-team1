import { FC } from 'react'
import { Stack, Button } from '@mui/material'
import { SignByReviewerProps } from './types'
import documentSignService from '@/stores/DocumentsSignService'
import { DocumentIsSigned } from './documentIsSigned'

export const SignByReviewer: FC<SignByReviewerProps> = ({ document }) => {
  const { loading } = documentSignService

  if (document.isSignedByUser) return <DocumentIsSigned />

  return (
    <Stack spacing={2} direction="row" mt={2}>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => void document.sign(true)}
        disabled={loading}
      >
        Подписать документ
      </Button>
      <Button
        size="medium"
        color="primary"
        variant="text"
        onClick={() => void document.sign(false)}
        disabled={loading}
      >
        Отклонить
      </Button>
    </Stack>
  )
}
