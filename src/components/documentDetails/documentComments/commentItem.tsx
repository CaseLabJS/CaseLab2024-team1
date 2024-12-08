import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PersonIcon from '@mui/icons-material/Person'
import { Comment } from '@/types/sharedTypes.ts'
import { formatTimeAgo } from '@/utils/formatTimeAgo.ts'
import { useTheme } from '@mui/material'

interface CommentItemProps {
  comment: Comment
  isNew: boolean
}

export const CommentItem = (props: CommentItemProps) => {
  const { comment, isNew } = props
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        p: 1,
        borderRadius: '4px',
        backgroundColor: isNew
          ? theme.palette.mode === 'dark'
            ? 'grey.800'
            : 'grey.300'
          : 'transparent',
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
  )
}
