import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { BarChart } from '@mui/x-charts/BarChart'
import { useTheme } from '@mui/material/styles'
import { getDaysInMonth } from '@/components/dashboard/statCard/getDaysInMonth.ts'
import { calculateDocumentStatsByDay } from '@/components/dashboard/documentsChart/calculateDocumentStatsByDay.ts'
import { Document } from '@/types/sharedTypes.ts'
import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { DocumentTransitions } from '@/api/documentController/types.ts'
import Chip from '@mui/material/Chip'

interface PageVotingBarChartProps {
  documents: Document[]
}

export const PageVotingBarChart = observer((props: PageVotingBarChartProps) => {
  const { documents } = props

  const theme = useTheme()
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ]

  const data = getDaysInMonth(12, 2024)
  const currentMonth = new Date().getMonth()

  const activeDocuments = useMemo(() => {
    return documents.filter((document) => {
      return (
        document.state === DocumentTransitions.SENT_ON_VOTING ||
        document.state === DocumentTransitions.APPROVED_BY_VOTING ||
        document.state === DocumentTransitions.REJECTED_BY_VOTING
      )
    })
  }, [documents])

  const { sentData, approvedData, rejectedData } = calculateDocumentStatsByDay(
    activeDocuments,
    currentMonth
  )

  const todayVotingCount = useMemo(() => {
    const today = new Date()
    return activeDocuments.reduce((acc, doc) => {
      return (
        acc +
        doc.documentVersions.reduce((versionAcc, version) => {
          const createdDate = new Date(version.createdAt)
          return (
            versionAcc +
            (createdDate.getFullYear() === today.getFullYear() &&
            createdDate.getMonth() === today.getMonth() &&
            createdDate.getDate() === today.getDate()
              ? 1
              : 0)
          )
        }, 0)
      )
    }, 0)
  }, [activeDocuments])

  const xAxisConfig = {
    scaleType: 'band' as const,
    categoryGapRatio: 0.5,
    data: data,
    tickInterval: (_: void, i: number) => (i + 1) % 5 === (0 as const),
  }

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Голосование по документам
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {activeDocuments.length}
            </Typography>
            <Chip
              size="small"
              color={todayVotingCount > 0 ? 'success' : 'default'}
              label={`${todayVotingCount} сегодня`}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Голосование по документам за последние 30 дней
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[xAxisConfig]}
          series={[
            {
              id: 'sentOnVoting',
              label: 'Отправленные',
              data: sentData,
              stack: 'A',
            },
            {
              id: 'approvedVoting',
              label: 'Одобренные',
              data: approvedData,
              stack: 'A',
            },
            {
              id: 'rejectedVotes',
              label: 'Отклоненные',
              data: rejectedData,
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  )
})
