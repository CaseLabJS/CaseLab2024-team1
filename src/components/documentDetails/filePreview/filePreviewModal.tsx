import Modal from '@mui/material/Modal'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'

interface FilePreviewModalProps {
  open: boolean
  onClose: () => void
  file: File | null
}

export const FilePreviewModal = (props: FilePreviewModalProps) => {
  const { open, onClose, file } = props
  const [zoomed, setZoomed] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleImageClick = useCallback(() => {
    setZoomed(!zoomed)
  }, [zoomed])

  if (!file) return

  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: { lg: 700, sm: 500, xs: 350 },
          maxHeight: { md: 850, sm: 750, xs: 550 },
          height: '100%',
        }}
      >
        {isImage && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            onClick={handleImageClick}
            style={{
              cursor: zoomed ? 'zoom-out' : 'zoom-in',
              maxWidth: isSmallScreen ? '100%' : 'none',
              maxHeight: isSmallScreen ? '100%' : 'none',
              transition: 'transform 0.4s ease',
              willChange: 'transform',
              transform: zoomed
                ? isSmallScreen
                  ? 'scale(0.8)'
                  : 'scale(1.1)'
                : 'scale(1)',
            }}
          />
        )}
        {isPdf && (
          <iframe
            src={URL.createObjectURL(file)}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </Box>
    </Modal>
  )
}
