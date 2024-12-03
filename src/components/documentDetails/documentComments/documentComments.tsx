import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Comment } from '@/types/sharedTypes.ts'
import PersonIcon from '@mui/icons-material/Person'
import { ChangeEvent, useCallback, useState } from 'react'
import DocumentStore from '@/stores/DocumentStore'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNotifications } from '@toolpad/core'
import { formatTimeAgo } from '@/utils/formatTimeAgo.ts'

interface DocumentCommentsProps {
  documentStore: DocumentStore
}

export const DocumentComments = observer((props: DocumentCommentsProps) => {
  const { documentStore } = props

  const [comment, setComment] = useState('')
  const [newCommentId, setNewCommentId] = useState<number | null>(null)
  const notifications = useNotifications()

  const document = documentStore.documentData

  const handleChangeComment = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setComment(event.target.value)
    },
    []
  )

  const handleSendComment = useCallback(async () => {
    const result = await documentStore.addDocumentComment(comment)

    if (result) {
      setNewCommentId(result.id)
      setComment('')

      setTimeout(() => {
        setNewCommentId(null)
      }, 2000)
      notifications.show('Комментарий успешно добавлен', {
        severity: 'success',
        autoHideDuration: 2000,
      })
    }
  }, [comment, documentStore, notifications])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        void handleSendComment()
      }
    },
    [handleSendComment]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flex: 1,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, m: 0, pb: 1 }}
        >
          Комментарии ({document.comments.length})
        </Typography>
        <Divider sx={{ backgroundColor: 'primary.main' }} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <AccountBoxIcon
          sx={{
            width: '2.8rem',
            height: '2.8rem',
            color: 'primary.main',
          }}
        />
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={comment}
          onChange={handleChangeComment}
          onKeyDown={handleKeyDown}
          slotProps={{
            htmlInput: {
              maxLength: 255,
            },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => void handleSendComment()}
                    edge="end"
                  >
                    <SendIcon sx={{ color: 'primary.main' }} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
          placeholder="Оставьте свой комментарий..."
          size="small"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {document.comments.length > 0 &&
          document.comments.map((comment: Comment) => (
            <Box
              key={comment.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                p: 1,
                borderRadius: '4px',
                backgroundColor:
                  newCommentId === comment.id ? 'grey.300' : 'transparent',
                transition: 'background-color 0.3s',
              }}
            >
              <PersonIcon
                sx={{
                  width: '2.5rem',
                  height: '2.5rem',
                  color: 'grey.600',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      pr: 0.5,
                      color: 'primary.dark',
                    }}
                  >
                    {comment.author.name} {comment.author.surname}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'grey.500' }}>
                    {formatTimeAgo(comment.createdAt)}
                  </Typography>
                </Box>
                <Typography variant="body2">{comment.content}</Typography>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  )
})
