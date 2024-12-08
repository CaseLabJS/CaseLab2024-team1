import { Box, Button, Typography, InputBase, InputLabel } from '@mui/material'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { HandleFileActionsProps } from './types'
import { useCallback, useEffect, ChangeEvent, useState } from 'react'
import { base64ToFile } from '@/utils/base64ToFile'
import { fileToBase64 } from '@/utils/fileToBase64'

const HandleFileActions = (props: HandleFileActionsProps) => {
  const file = base64ToFile(props.base64content)
  const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    if (file && firstRender) {
      props.setFile(file)
    }
    if (firstRender) setFirstRender(false)
  }, [file, firstRender, props])
  const handleDownload = useCallback(() => {
    if (props.file) {
      const url = URL.createObjectURL(props.file)

      const a = window.document.createElement('a')
      a.href = url
      a.download = props.file.name

      window.document.body.appendChild(a)
      a.click()

      window.document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }, [props.file])
  const handleAttachFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList) {
      props.setFile(fileList[0])
      const newBase64 = await fileToBase64(fileList[0])
      props.setValue('base64Content', newBase64, { shouldDirty: true })
      return
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '.5rem',
        alignItems: 'center',
      }}
    >
      {!props.file ? (
        <Typography
          variant="subtitle2"
          sx={{ maxWidth: { xs: '100px' }, mb: '6px' }}
        >
          Документ не прикреплен
        </Typography>
      ) : (
        <>
          <Typography
            variant="subtitle2"
            sx={{
              mb: '6px',
              lineBreak: 'normal',
            }}
          >
            Прикрепленный документ: {props.file.name}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              size="small"
              sx={{
                fontSize: { xs: '10px', md: '14px', lg: '14px' },
                mb: '6px',
                minHeight: '32.5px',
              }}
              onClick={handleDownload}
            >
              <SaveAltIcon fontSize="small" sx={{ mr: '6px' }} />
              Скачать
            </Button>
          </Box>
        </>
      )}
      <Box
        sx={{
          display: 'flex',
          minHeight: '32.5px',
          alignItems: 'center',
          mb: '6px',
        }}
      >
        <InputLabel
          htmlFor={'file-input'}
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            fontSize: { xs: '10px', md: '14px', lg: '14px' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AttachFileIcon fontSize="small"></AttachFileIcon>
          {file ? 'Прикрепить другой' : 'Прикрепить'}
        </InputLabel>
        <InputBase
          id="file-input"
          type="file"
          sx={{ display: 'none' }}
          inputProps={{
            accept: '.pdf,.png,.jpg,.jpeg,.txt,.docx',
            multiple: false,
          }}
          onChange={handleAttachFile}
        />
      </Box>
    </Box>
  )
}

export default HandleFileActions
