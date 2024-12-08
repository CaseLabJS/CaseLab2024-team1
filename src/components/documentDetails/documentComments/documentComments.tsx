import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Comment } from '@/types/sharedTypes.ts'
import {
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react'
import DocumentStore from '@/stores/DocumentStore'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNotifications } from '@toolpad/core'
import { DocumentTransitions } from '@/api/documentController/types.ts'
import { CommentItem } from '@/components/documentDetails/documentComments/commentItem.tsx'

interface DocumentCommentsProps {
  documentStore: DocumentStore
}

export const DocumentComments = observer((props: DocumentCommentsProps) => {
  const { documentStore } = props

  const [comment, setComment] = useState('')
  const [newCommentId, setNewCommentId] = useState<number | null>(null)
  const [showAllComments, setShowAllComments] = useState(false)
  const commentsEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (newCommentId) {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [newCommentId])

  const notifications = useNotifications()

  const document = documentStore.documentData

  const handleChangeComment = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setComment(event.target.value)
    },
    []
  )

  const handleSendComment = useCallback(async () => {
    if (comment.trim() === '') {
      notifications.show('Комментарий не может быть пустым', {
        severity: 'warning',
        autoHideDuration: 2000,
      })
      return
    }

    const result = await documentStore.addDocumentComment(comment)

    if (result) {
      setNewCommentId(result.id)
      setComment('')
      setShowAllComments(true)

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

  const handleShowMoreComments = () => {
    setShowAllComments(true)
  }

  const displayedComments = useMemo(() => {
    return showAllComments ? document.comments : document.comments.slice(0, 3)
  }, [document.comments, showAllComments])

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

      {document.state !== DocumentTransitions.DELETED && (
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
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxHeight: '18rem',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '0.5rem',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'grey',
            borderRadius: '0.5rem',
          },
        }}
      >
        {displayedComments.length > 0 &&
          displayedComments.map((comment: Comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isNew={newCommentId === comment.id}
            />
          ))}
        <Box ref={commentsEndRef} />
      </Box>

      {document.comments.length > 3 && !showAllComments && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer', color: 'primary.main' }}
            onClick={handleShowMoreComments}
          >
            Показать следующие комментарии
          </Typography>
        </Box>
      )}
    </Box>
  )
})
