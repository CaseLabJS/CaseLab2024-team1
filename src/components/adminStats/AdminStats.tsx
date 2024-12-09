import { observer } from 'mobx-react-lite'
import { usersListStore } from '@/stores/UsersListStore'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import documentsListStore from '@/stores/DocumentsListStore'
import { useEffect, useMemo } from 'react'
import { DocumentTransitions } from '@/api/documentController/types'
import { Box, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { StatsCard } from './StatsCard'
import PeopleIcon from '@mui/icons-material/People'
import DescriptionIcon from '@mui/icons-material/Description'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

export const AdminStats = observer(() => {
  const { users } = usersListStore
  const { types } = documentTypeListStore
  const { documents, fetchDocuments, countTotalDocuments } = documentsListStore

  const newDocumentsCount = useMemo(() => {
    const currentDate = new Date()
    return documents.filter(({ documentData }) => {
      const createdAt = new Date(documentData.documentVersions[0]?.createdAt)
      return (
        createdAt.getFullYear() === currentDate.getFullYear() &&
        createdAt.getMonth() === currentDate.getMonth() &&
        createdAt.getDate() === currentDate.getDate()
      )
    }).length
  }, [documents])

  const signedDocumentsCount = useMemo(() => {
    return documents.filter(({ documentData }) => {
      return documentData.state === DocumentTransitions.SIGNED
    }).length
  }, [documents])

  const filesCount = useMemo(() => {
    let count: number = 0
    documents.forEach(({ documentData }) => {
      if (documentData.documentVersions[0].base64Content !== null) {
        count += 1
      }
    })
    return count
  }, [documents])

  const newFilesCount = useMemo(() => {
    const currentDate = new Date()
    return documents
      .filter(({ documentData }) => {
        return documentData.documentVersions[0]?.base64Content !== null
      })
      .filter(({ documentData }) => {
        const createdAt = new Date(documentData.documentVersions[0]?.createdAt)
        return (
          createdAt.getFullYear() === currentDate.getFullYear() &&
          createdAt.getMonth() === currentDate.getMonth() &&
          createdAt.getDate() === currentDate.getDate()
        )
      }).length
  }, [documents])

  const commentsCount = useMemo(() => {
    let count: number = 0
    documents.forEach(({ documentData }) => {
      count += documentData.comments.length
    })
    return count
  }, [documents])

  const newCommentsCount = useMemo(() => {
    let count: number = 0
    const currentDate = new Date()
    documents
      .filter(({ documentData }) => {
        return documentData.comments.length !== 0
      })
      .filter(({ documentData }) => {
        documentData.comments.forEach((el) => {
          const createdAt = new Date(el.createdAt)
          if (
            createdAt.getFullYear() === currentDate.getFullYear() &&
            createdAt.getMonth() === currentDate.getMonth() &&
            createdAt.getDate() === currentDate.getDate()
          ) {
            count += 1
          }
        })
      })
    return count
  }, [documents])

  useEffect(() => {
    void usersListStore.fetchUsers()
    void documentTypeListStore.fetchDocumentTypes({ isAlive: true })
    void countTotalDocuments()
    void fetchDocuments({
      isAlive: true,
      size: 100,
    })
  }, [fetchDocuments, countTotalDocuments])

  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid size={6}>
          <StatsCard
            title="Активных пользователей"
            value={users.length}
            diff={-1}
            subtitle=""
            icon={PeopleIcon}
          />
        </Grid>
        <Grid size={6}>
          <StatsCard
            title="Типов документов"
            value={types.length}
            diff={-1}
            subtitle=""
            icon={DescriptionIcon}
          />
        </Grid>
        <Grid size={6}>
          <StatsCard
            title="Документов добавлено"
            value={documents.length}
            diff={newDocumentsCount}
            subtitle="за сегодня"
            icon={LibraryAddIcon}
          />
        </Grid>
        <Grid size={6}>
          <StatsCard
            title="Документов согласовано"
            value={signedDocumentsCount}
            diff={signedDocumentsCount}
            subtitle="за сегодня"
            icon={CheckCircleIcon}
          />
        </Grid>
        <Grid size={6}>
          <StatsCard
            title="Файлов загружено"
            value={filesCount}
            diff={newFilesCount}
            subtitle="за сегодня"
            icon={CloudUploadIcon}
          />
        </Grid>
        <Grid size={6}>
          <StatsCard
            title="Комментариев оставлено"
            value={commentsCount}
            diff={newCommentsCount}
            subtitle="за сегодня"
            icon={ChatBubbleOutlineIcon}
          />
        </Grid>
      </Grid>
    </Box>
  )
})
