/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react'
import {
  Paper,
  Box,
  useTheme,
  Typography,
  Stack,
  IconButton,
} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { FileInput } from './fileInput/fileInput'
import { TitleInput } from './titleInput/titleInput'
import { DescriptionInput } from './descriptionInput/descriptionInput'
import { DocumentFormProps, FormValues } from './types'
//import { FormItem } from '@/components/createDocumentForm/types'
import styles from './documentForm.module.css'
import { DocumentValues } from './documentValues/documentValues'
import { observer } from 'mobx-react-lite'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { SignatureBlock } from '@/components/signatureBlock/signatureBlock'

export const DocumentForm: FC<DocumentFormProps> = observer(({ document }) => {
  const {
    documentData: { documentType, id, documentVersions },
  } = document

  const [version, setVersion] = useState<number>(documentVersions.length - 1)

  const form = useForm<FormValues>({
    defaultValues: {
      file: null,
      title: documentVersions[version]?.title || '',
      description: documentVersions[version]?.description || '',
      values: documentVersions[version]?.values || [],
    },
  })

  const theme = useTheme()

  return (
    <Paper
      square
      variant="outlined"
      sx={{
        boxShadow: theme.shadows[7],
      }}
    >
      <Box className={styles.container}>
        <Stack direction="row">
          <Typography variant="h5" m={2} sx={{ fontWeight: 700 }}>
            Документ {documentType.name} №{id}
          </Typography>
          <IconButton
            sx={{ display: 'flex', alignItems: 'center' }}
            aria-label="Редактировать документ"
          >
            <ModeEditIcon />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              Редактировать документ
            </Typography>
          </IconButton>
        </Stack>

        <FormProvider {...form}>
          <TitleInput />
          <DescriptionInput />
          <DocumentValues />
          <FileInput />
        </FormProvider>
        <SignatureBlock document={document} />
      </Box>
    </Paper>
  )
})
