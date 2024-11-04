import { useDropzone } from 'react-dropzone'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import { style } from '@/components/dropzone/styles.ts'
import { useMemo } from 'react'

interface DropzoneProps {
  onFilesAccepted: (files: File[]) => void
}

export const Dropzone = (props: DropzoneProps) => {
  const { onFilesAccepted } = props
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxFiles: 20,
    onDrop: (files) => {
      onFilesAccepted(files)
    },
  })

  const dropzoneStyle = useMemo(
    () => ({
      ...style.dropzone,
      ...(isDragActive ? style.active : {}),
    }),
    [isDragActive]
  )

  return (
    <Box sx={style.container}>
      <Box {...getRootProps()} sx={dropzoneStyle}>
        <InputBase
          inputProps={{
            ...getInputProps(),
          }}
        />
        <SaveAltIcon sx={style.icons} />
        <Typography variant="body1">
          Перетащите файлы для отправки или загрузите с компьютера
        </Typography>
        <Box sx={style.bottomSectionContainer}>
          <Box sx={style.bottomSection}>
            <FileUploadIcon sx={style.icons} />
            <Typography variant="body1">Выбрать файл</Typography>
          </Box>
          <Typography variant="subtitle2">Максимум 20 документов</Typography>
        </Box>
      </Box>
    </Box>
  )
}
