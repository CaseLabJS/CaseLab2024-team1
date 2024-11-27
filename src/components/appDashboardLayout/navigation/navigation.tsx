import { type Navigation } from '@toolpad/core/AppProvider'
import InboxIcon from '@mui/icons-material/Inbox'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import GradingIcon from '@mui/icons-material/Grading'
import AddIcon from '@mui/icons-material/Add'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { ROUTES } from '@/router/constants.ts'

export const NAVIGATION: Navigation = [
  {
    segment: `.${ROUTES.app('new-document')}`,
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
    segment: `.${ROUTES.app('inbox')}`,
    title: 'Входящие',
    icon: <InboxIcon />,
  },
  {
    segment: `.${ROUTES.app('forward')}`,
    title: 'Исходящие',
    icon: <ForwardToInboxIcon />,
  },
  {
    segment: `.${ROUTES.app('draft')}`,
    title: 'Черновики',
    icon: <DraftsIcon />,
  },
  {
    segment: `.${ROUTES.app('deleted')}`,
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
    segment: `.${ROUTES.app('reports')}`,
    title: 'Требуют обработки',
    icon: <DocumentScannerIcon />,
  },
  {
    segment: `.${ROUTES.app('integrations')}`,
    title: 'Обработанные',
    icon: <GradingIcon />,
  },
]

export const ADMIN_NAVIGATION: Navigation = [
  {
    segment: ROUTES.admin('admin/users/create'),
    title: 'Добавить пользователя',
    icon: <PersonAddIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: ROUTES.admin('admin'),
    title: 'Администратор',
    icon: <AdminPanelSettingsIcon />,
  },
  {
    segment: ROUTES.admin('admin/users'),
    title: 'Пользователи',
    icon: <ManageAccountsIcon />,
  },
  {
    segment: ROUTES.admin('admin/deleted-users'),
    title: 'Удаленные',
    icon: <PersonRemoveIcon />,
  },
  {
    segment: ROUTES.admin('admin/document-types'),
    title: 'Типы документов',
    icon: <AssignmentIcon />,
  },
]
