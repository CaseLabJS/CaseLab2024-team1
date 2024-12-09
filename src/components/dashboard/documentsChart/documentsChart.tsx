import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { LineChart } from '@mui/x-charts/LineChart'
import { getDaysInMonth } from '@/components/dashboard/statCard/getDaysInMonth.ts'
import { Document } from '@/types/sharedTypes.ts'
import { calculateDocumentStatsByDay } from '@/components/dashboard/documentsChart/calculateDocumentStatsByDay.ts'
import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import authStore from '@/stores/AuthStore'
import { DocumentTransitions } from '@/api/documentController/types.ts'

const AreaGradient = ({ color, id }: { color: string; id: string }) => {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  )
}

interface SessionsChartProps {
  documents: Document[]
}

export const DocumentsChart = observer((props: SessionsChartProps) => {
  const { documents } = props
  const { user } = authStore

  const theme = useTheme()
  const data = getDaysInMonth(12, 2024)

  const activeDocuments = useMemo(() => {
    return documents.filter((document) => {
      return (
        document.user.id === user?.id ||
        document.state === DocumentTransitions.SIGNED
      )
    })
  }, [documents, user?.id])

  const currentMonth = new Date().getMonth()
  const { modifiedData, createdData, signedData } = calculateDocumentStatsByDay(
    activeDocuments,
    currentMonth
  )

  const todayDocumentCount = useMemo(() => {
    return activeDocuments.reduce((acc, doc) => {
      const hasVersionToday = doc.documentVersions.some((version) => {
        const createdDate = new Date(version.createdAt)
        const timezoneOffset = createdDate.getTimezoneOffset()
        const localTime = new Date(
          createdDate.getTime() - timezoneOffset * 60000
        )

        const today = new Date()
        return (
          localTime.getFullYear() === today.getFullYear() &&
          localTime.getMonth() === today.getMonth() &&
          localTime.getDate() === today.getDate()
        )
      })

      return acc + (hasVersionToday ? 1 : 0)
    }, 0)
  }, [activeDocuments])

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ]

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Статистика документов
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
              color={todayDocumentCount > 0 ? 'success' : 'default'}
              label={`${todayDocumentCount} сегодня`}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Документы за последние 30 дней
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (_, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: 'modified',
              label: 'Изменённые',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: modifiedData,
            },
            {
              id: 'signed',
              label: 'Подписанные',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: signedData,
            },
            {
              id: 'created',
              label: 'Созданные',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: createdData,
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-created': {
              fill: "url('#created')",
            },
            '& .MuiAreaElement-series-signed': {
              fill: "url('#deleted')",
            },
            '& .MuiAreaElement-series-modified': {
              fill: "url('#modified')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="created" />
          <AreaGradient color={theme.palette.primary.main} id="signed" />
          <AreaGradient color={theme.palette.primary.light} id="modified" />
        </LineChart>
      </CardContent>
    </Card>
  )
})
