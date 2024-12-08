import { FC, useState } from 'react'
import {
  Stack,
  Button,
  Menu,
  ListSubheader,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { SignByReviewerProps } from './types'
import documentSignService from '@/stores/DocumentsSignService'
import { observer } from 'mobx-react-lite'

export const SignByReviewer: FC<SignByReviewerProps> = observer(
  ({ document }) => {
    const { loading } = documentSignService
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [isSigned, setIsSigned] = useState<boolean>(false)
    const [placeholderTitle, setPlaceholderTitle] = useState<string>('')

    // Обработчик изменения текста
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPlaceholderTitle(event.target.value)
    }

    const showMenu = (
      event: React.MouseEvent<HTMLButtonElement>,
      isSigned: boolean
    ) => {
      setIsSigned(isSigned)
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    if (document.isSignedByUser) return null

    return (
      <>
        <Stack spacing={0.5} direction="row">
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={(e) => showMenu(e, true)}
            disabled={loading}
          >
            Подписать документ
          </Button>
          <Button
            size="small"
            color="primary"
            variant="text"
            onClick={(e) => showMenu(e, false)}
            disabled={loading}
          >
            Отклонить
          </Button>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <ListSubheader sx={{ maxWidth: '800px', minWidth: '480px' }}>
            <Stack direction={'column'} spacing={2}>
              <Typography>Комментарий</Typography>
              <TextareaAutosize
                minRows={3}
                placeholder="Введите комментарий к ревью..."
                value={placeholderTitle}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                onClick={() => {
                  void document.sign(isSigned, placeholderTitle)
                }}
              >
                {isSigned ? 'Подписать' : 'Отклонить'}
              </Button>
            </Stack>
          </ListSubheader>
        </Menu>
      </>
    )
  }
)
