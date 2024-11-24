import AdminPage from '@/components/adminPage/AdminPage'
import UserTable from '@/components/userTable/UserTable'
import CreateUser from '@/components/createUser/CreateUser'
import CreateDocumentTypePage from '@/components/createDocumentTypePage/createDocumentTypePage'

import { AppDashboardLayout } from '@/components/appDashboardLayout/appDashboardLayout.tsx'
import { AppProvider } from '@/components/appProvider/appProvider.tsx'
import { Authorization } from '@/router/authorization.tsx'
import { ROUTES } from '@/router/constants.ts'

import { SignInPage } from '@/pages/signIn'
import { SignOutPage } from '@/pages/signOut'
import HomePage from '@/pages/homePage'
import { CreateDocumentPage } from '@/pages/createDocumentPage'

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
            path: ROUTES.app('new-document'),
            Component: CreateDocumentPage,
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
        path: ROUTES.admin('create-document/type'),
        element: <CreateDocumentTypePage />,
      },
      {
        path: ROUTES.admin('attribute-type'),
        element: <div>Attribute Type</div>,
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
