import AdminPage from '@/components/adminPage/AdminPage'
import UserTable from '@/components/userTable/UserTable'
import CreateUser from '@/components/createUser/CreateUser'
import DeletedUsers from '@/components/deletedUsers/DeletedUsers'
import CreateDocumentTypePage from '@/components/createDocumentTypePage/createDocumentTypePage'

import { AppDashboardLayout } from '@/components/appDashboardLayout/appDashboardLayout.tsx'
import { AppProvider } from '@/components/appProvider/appProvider.tsx'
import { Authorization } from '@/router/authorization.tsx'
import { ROUTES } from '@/router/constants.ts'

import { SignInPage } from '@/pages/signIn'
import { SignOutPage } from '@/pages/signOut'
import HomePage from '@/pages/homePage'
import { CreateDocumentPage } from '@/pages/createDocumentPage'
import { ForwardPage } from '@/pages/forwardPage'
// import { InboxPage } from '@/pages/inboxPage'
import { DeletedPage } from '@/pages/deletedPage'
import { Navigate } from 'react-router-dom'
import { DocumentPage } from '@/pages/documentPage'
import AliveTypes from '@/components/documentTypesTable/AliveTypes'
import DeadTypes from '@/components/documentTypesTable/DeadTypes'
import { DraftPage } from '@/pages/draftPage'

export const publicRoutes = [
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    path: ROUTES.signOut,
    element: <SignOutPage />,
  },
]

export const authRoutes = [
  {
    element: <Authorization />,
    children: [
      {
        path: ROUTES.signIn,
        element: <SignInPage />,
      },
    ],
  },
]

export const appRoutes = [
  {
    path: ROUTES.app(),
    element: <Authorization requireAuth />,
    children: [
      {
        path: ROUTES.app(),
        Component: AppDashboardLayout,
        children: [
          {
            index: true,
            element: <Navigate to="forward" replace />,
          },
          {
            path: ROUTES.app('new-document'),
            Component: CreateDocumentPage,
          },
          // {
          //   path: ROUTES.app('inbox'),
          //   Component: InboxPage,
          // },
          {
            path: ROUTES.app('forward'),
            Component: ForwardPage,
            children: [
              {
                path: ':id',
                Component: DocumentPage,
              },
            ],
          },
          {
            path: ROUTES.app('draft'),
            Component: DraftPage,
          },
          {
            path: ROUTES.app('deleted'),
            Component: DeletedPage,
          },
        ],
      },
    ],
  },
]

export const adminRoutes = [
  {
    path: ROUTES.admin(),
    element: <Authorization requireAuth />,
    children: [
      {
        path: ROUTES.admin(),
        Component: AppDashboardLayout,
        children: [
          {
            path: ROUTES.admin(),
            element: <AdminPage />,
          },
          {
            path: ROUTES.admin('users'),
            element: <UserTable />,
          },
          {
            path: ROUTES.admin('users/create'),
            element: <CreateUser />,
          },
          {
            path: ROUTES.admin('deleted-users'),
            element: <DeletedUsers />,
          },
          {
            path: ROUTES.admin('document-types'),
            element: <AliveTypes />,
          },
          {
            path: ROUTES.admin('document-types/deleted'),
            element: <DeadTypes />,
          },
          {
            path: ROUTES.admin('document-types/create'),
            element: <CreateDocumentTypePage />,
          },
          {
            path: ROUTES.admin('attribute-type'),
            element: <div>Attribute Type</div>,
          },
        ],
      },
    ],
  },
]

export const routes = [
  {
    Component: AppProvider,
    children: [...publicRoutes, ...appRoutes, ...adminRoutes, ...authRoutes],
  },
]
