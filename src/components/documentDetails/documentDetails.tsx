import Box from '@mui/material/Box'
import { DocumentInfo } from '@/components/documentDetails/documentInfo/documentInfo.tsx'
import { DocumentVersionList } from '@/components/documentDetails/documentVersionList/documentVersionList.tsx'
import { DocumentActions } from '@/components/documentDetails/documentActions/documentActions.tsx'
import Divider from '@mui/material/Divider'
import { DocumentComments } from '@/components/documentDetails/documentComments/documentComments.tsx'
import { useMediaQuery, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'
import DocumentStore from '@/stores/DocumentStore'
import { getNavigationType } from '@/components/appDashboardLayout/navigation/getNavigationType.ts'
import { useActionButtons } from '@/components/documentDetails/useActionButtons.tsx'
import { FilePreviewModal } from '@/components/documentDetails/filePreview/filePreviewModal.tsx'
import { useLocation } from 'react-router-dom'

interface DocumentDetailsProps {
  documentStore: DocumentStore
}

export const DocumentDetails = (props: DocumentDetailsProps) => {
  const { documentStore } = props
  const document = documentStore.documentData
  const location = useLocation()
  const navigationType = getNavigationType(location.pathname)

  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  const [modalOpen, setModalOpen] = useState(false)
  const [previewFile, setPreviewFile] = useState<File | null>(null)

  const handlePreview = useCallback((file: File) => {
    if (!file) return
    setPreviewFile(file)
    setModalOpen(true)
  }, [])

  const [selectedVersionIndex, setSelectedVersionIndex] = useState(
    document.documentVersions.length - 1
  )

  const handleVersionSelect = useCallback((index: number) => {
    setSelectedVersionIndex(index)
  }, [])

  const actionButtons = useActionButtons(
    navigationType,
    document,
    selectedVersionIndex,
    handlePreview
  )

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1.5rem',
        flexDirection: { lg: 'row', xs: 'column' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1.5,
          gap: '1rem',
        }}
      >
        <DocumentInfo
          documentVersions={document.documentVersions}
          documentName={document.documentType.name}
          selectedVersionIndex={selectedVersionIndex}
          userName={document.user.name}
          userSurname={document.user.surname}
        />
        <DocumentVersionList
          documentVersions={document.documentVersions}
          onVersionSelect={handleVersionSelect}
          selectedVersionIndex={selectedVersionIndex}
        />
        <DocumentActions buttons={actionButtons} />
      </Box>

      {isLargeScreen && <Divider orientation="vertical" flexItem />}

      <DocumentComments documentStore={documentStore} />

      {modalOpen && (
        <FilePreviewModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          file={previewFile}
        />
      )}
    </Box>
  )
}
