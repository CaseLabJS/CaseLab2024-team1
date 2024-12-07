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
import FolderDeleteIcon from '@mui/icons-material/FolderDelete'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { ROUTES } from '@/router/constants.ts'
import { getNavigationPath } from '@/components/appDashboardLayout/navigation/getNavigationPath.ts'
import { TextIncrease } from '@mui/icons-material'
import CodeIcon from '@mui/icons-material/Code'
import CodeOffIcon from '@mui/icons-material/CodeOff'

export const NAVIGATION: Navigation = [
  {
    segment: getNavigationPath(ROUTES.app('new-document')),
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
    segment: getNavigationPath(ROUTES.app('inbox')),
    title: 'Входящие',
    icon: <InboxIcon />,
  },
  {
    segment: getNavigationPath(ROUTES.app('forward')),
    title: 'Исходящие',
    icon: <ForwardToInboxIcon />,
  },
  {
    segment: getNavigationPath(ROUTES.app('draft')),
    title: 'Черновики',
    icon: <DraftsIcon />,
  },
  {
    segment: getNavigationPath(ROUTES.app('deleted')),
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
    segment: getNavigationPath(ROUTES.app('processing')),
    title: 'Требуют обработки',
    icon: <DocumentScannerIcon />,
  },
  {
    segment: getNavigationPath(ROUTES.app('processed')),
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
    segment: ROUTES.admin('admin/attribute-type/create'),
    title: 'Добавить аттрибут',
    icon: <TextIncrease />,
  },
  {
    segment: ROUTES.admin('admin/document-types/create'),
    title: 'Создать тип документа',
    icon: <PostAddIcon />,
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
    segment: ROUTES.admin('admin/attribute-type'),
    title: 'Аттрибуты',
    icon: <CodeIcon />,
  },
  {
    segment: ROUTES.admin('admin/attribute-type/delete'),
    title: 'Удаленные аттрибуты',
    icon: <CodeOffIcon />,
  },
  {
    segment: ROUTES.admin('admin/document-types'),
    title: 'Типы документов',
    icon: <AssignmentIcon />,
  },
  {
    segment: ROUTES.admin('admin/document-types/deleted'),
    title: 'Удаленные типы',
    icon: <FolderDeleteIcon />,
  },
]
