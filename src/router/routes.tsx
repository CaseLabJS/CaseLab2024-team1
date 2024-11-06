import AdminPage from '@/components/adminPage/adminPage'
import UserTable from '@/components/userTable/userTable'

import { AppDashboardLayout } from '@/components/appDashboardLayout/appDashboardLayout.tsx'
import { CreateDocumentForm } from '@/components/createDocumentForm/createDocumentForm.tsx'
import { AppProvider } from '@/components/appProvider/appProvider.tsx'
import { Authorization } from '@/router/authorization.tsx'
import { ROUTES } from '@/router/constants.ts'

import { SignInPage } from '@/pages/signIn'
import { SignOutPage } from '@/pages/signOut'

export const publicRoutes = [
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
  {
    path: ROUTES.home,
    element: <div>home</div>,
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
    element: <Authorization />,
    children: [
      {
        path: ROUTES.app(),
        Component: AppDashboardLayout,
        children: [
          {
            path: ROUTES.app('document'),
            Component: CreateDocumentForm,
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
        path: ROUTES.admin('document-type'),
        element: <div>Document Type</div>,
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
