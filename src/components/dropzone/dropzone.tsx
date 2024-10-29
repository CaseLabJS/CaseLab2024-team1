import { useDropzone } from 'react-dropzone'
import './dropzone.css'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Box from "@mui/material/Box";
import {useState} from "react";

export const Dropzone = () => {
  //TODO передается наверх
  const [_acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    // acceptedFiles,
    // fileRejections,
  } = useDropzone({
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
      setAcceptedFiles((prevFiles) => [...prevFiles, ...files]);
    },
  })

  return (
    <Box className="container">
      <Box
        {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}
      >
        <input {...getInputProps()} />
        <SaveAltIcon />
        <p>Перетащите файлы для отправки или загрузите с компьютера</p>
        <Box className="download">
          <Box className="selectFile">
            <FileUploadIcon />
            <p>Выбрать файл</p>
          </Box>
          <p className="max-docs">Максимум 20 документов</p>
        </Box>
      </Box>
    </Box>
  )
}
