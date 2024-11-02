import { type Navigation } from '@toolpad/core/AppProvider'
import InboxIcon from '@mui/icons-material/Inbox'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import GradingIcon from '@mui/icons-material/Grading'
import AddIcon from '@mui/icons-material/Add'

export const NAVIGATION: Navigation = [
  {
    segment: 'app/document',
    title: 'Добавить документ',
    icon: <AddIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Документооборот',
  },
  {
    segment: 'app',
    title: 'Входящие',
    icon: <InboxIcon />,
  },
  {
    segment: 'app/forward',
    title: 'Исходящие',
    icon: <ForwardToInboxIcon />,
  },
  {
    segment: 'app/draft',
    title: 'Черновики',
    icon: <DraftsIcon />,
  },
  {
    segment: 'app/deleted',
    title: 'Удаленные',
    icon: <DeleteSweepIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Согласование',
  },
  {
    segment: 'app/reports',
    title: 'Требуют обработки',
    icon: <DocumentScannerIcon />,
  },
  {
    segment: 'app/integrations',
    title: 'Обработанные',
    icon: <GradingIcon />,
  },
]
