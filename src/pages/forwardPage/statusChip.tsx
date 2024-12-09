import { Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { DocumentTransitions } from '@/api/documentController/types.ts'
import AddIcon from '@mui/icons-material/Add'
import BuildIcon from '@mui/icons-material/Build'
import EditIcon from '@mui/icons-material/Edit'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

interface StatusChipProps {
  state: DocumentTransitions
}

export const StatusChip = (props: StatusChipProps) => {
  const { state } = props

  const getStatusProps = () => {
    switch (state) {
      case DocumentTransitions.CREATED:
        return {
          label: 'Создан',
          color: 'info' as const,
          icon: <AddIcon />,
        }
      case DocumentTransitions.SENT_ON_REWORK:
        return {
          label: 'Доработка',
          color: 'warning' as const,
          icon: <BuildIcon />,
        }
      case DocumentTransitions.SIGNED:
        return {
          label: 'Подписан',
          color: 'success' as const,
          icon: <CheckCircleIcon />,
        }
      case DocumentTransitions.MODIFIED:
        return {
          label: 'Изменён',
          color: 'warning' as const,
          icon: <EditIcon />,
        }
      case DocumentTransitions.SENT_ON_SIGNING:
        return {
          label: 'Ожидает подписи',
          color: 'warning' as const,
          icon: <HourglassEmptyIcon />,
        }
      case DocumentTransitions.SIGNED_BY_AUTHOR:
        return {
          label: 'Подписан автором',
          color: 'success' as const,
          icon: <PersonIcon />,
        }
      case DocumentTransitions.SENT_ON_VOTING:
        return {
          label: 'На голосовании',
          color: 'warning' as const,
          icon: <GroupsIcon />,
        }
      case DocumentTransitions.REJECTED_BY_VOTING:
        return {
          label: 'Отклонен голосованием',
          color: 'error' as const,
          icon: <ThumbDownOffAltIcon />,
        }
      case DocumentTransitions.APPROVED_BY_VOTING:
        return {
          label: 'Одобрен голосованием',
          color: 'success' as const,
          icon: <HowToRegIcon />,
        }
      default:
        return {
          label: 'Unknown',
          color: 'default' as const,
          icon: <CancelIcon />,
        }
    }
  }

  const { label, color, icon } = getStatusProps()

  return <Chip label={label} color={color} icon={icon} variant="outlined" />
}
