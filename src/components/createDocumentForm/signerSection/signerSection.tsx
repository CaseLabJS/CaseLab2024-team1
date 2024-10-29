import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import { useTheme } from '@mui/material'
import { useDropzone } from 'react-dropzone'

export const SignerSection = () => {
  const theme = useTheme()
  // const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const {
    getInputProps,
    // acceptedFiles
  } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxFiles: 1,
    // onDrop: (files) => {
    //   setAcceptedFiles((prevFiles) => [...prevFiles, ...files]);
    // },
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem 0',
      }}
    >
      <Typography variant="h6">Подписание документов</Typography>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Typography variant="body2" sx={{ minWidth: '8rem' }}>
          Подписант
        </Typography>
        <InputLabel
          htmlFor="fileСertificate"
          sx={{ color: theme.palette.primary.main }}
        >
          Выбрать подпись
        </InputLabel>
        <input type="file" id="fileСertificate" {...getInputProps()} />
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Typography variant="body2" sx={{ minWidth: '8rem' }}>
          Доверенность
        </Typography>
        <InputLabel
          htmlFor="filePowerAttorney"
          sx={{ color: theme.palette.primary.main }}
        >
          Выбрать доверенность
        </InputLabel>
        <input type="file" id="filePowerAttorney" {...getInputProps()} />
      </Box>
    </Box>
  )
}
