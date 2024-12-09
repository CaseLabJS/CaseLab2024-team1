import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import { StatCard } from '@/components/dashboard/statCard/statCard.tsx'
import { DocumentsChart } from '@/components/dashboard/documentsChart/documentsChart.tsx'
import { observer } from 'mobx-react-lite'
import { useDocumentStats } from '@/components/dashboard/dashboardContent/useDocumentStats.ts'
import documentSearchStore from '@/stores/DocumentSearchStore'
import { useEffect } from 'react'
import documentsListStore from '@/stores/DocumentsListStore'

export const DashboardContent = observer(() => {
  const { allDocuments, fetchAllDocuments } = documentSearchStore
  const { countTotalDocuments } = documentsListStore

  useEffect(() => {
    void (async () => {
      const result = await countTotalDocuments()
      if (result) {
        await fetchAllDocuments(result)
      }
    })()
  }, [countTotalDocuments, fetchAllDocuments])
  const data = useDocumentStats(allDocuments)

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main">
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              spacing={2}
              columns={12}
              sx={{ mb: (theme) => theme.spacing(2) }}
            >
              {data.map((card, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <StatCard {...card} />
                </Grid>
              ))}
              <Grid size={12}>
                <DocumentsChart documents={allDocuments} />
              </Grid>
              {/*<Grid size={12}>*/}
              {/*  <PageVotingBarChart documents={allDocuments} />*/}
              {/*</Grid>*/}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
})
