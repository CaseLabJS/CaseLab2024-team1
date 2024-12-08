import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'

interface StatsCardProps {
  title: string
  value: number | string
  diff: number
  subtitle: string
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
}

export const StatsCard: React.FC<StatsCardProps> = (props: StatsCardProps) => {
  const { title, value, diff, subtitle, icon: Icon } = props

  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {value}
            </Typography>
            <Typography>
              {diff > 0 && <TrendingUpIcon color="success" />}
              {diff === 0 && <TrendingFlatIcon color="action" />}
            </Typography>
            <Typography
              variant="body1"
              color={diff > 0 ? 'success.main' : 'text.secondary'}
            >
              {diff > 0 && `+${diff}`}
              {diff === 0 && `${diff}`}
              {diff < 0 && '\u00A0'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          </Box>
          {!isMobile && (
            <Icon sx={{ color: 'text.secondary', fontSize: '50px' }} />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
