import { AppDashboardLayout } from '@/components/appDashboardLayout/appDashboardLayout.tsx'
import { SlotsSignIn } from '@/components/appDashboardLayout/slotsSignIn/slotsSignIn.tsx'
import { CreateDocumentPage } from '@/components/appDashboardLayout/pages/createDocumentPage/createDocumentPage.tsx'
import { ProtectedRoute } from './protectedRoute.tsx'
import { AppProvider } from '@/components/appProvider/appProvider.tsx'
import { Authorization } from '@/router/authorization.tsx'
import { Outlet } from 'react-router-dom'

export const ROUTES = {
  home: '/',
  admin: (page = '') => `/admin/${page}`,
  app: (page = '') => `/app/${page}`,
  signIn: '/sign-in',
  signUp: '/sign-up',
  signOut: '/sign-out',
}

export const appRoutes = [
  {
    path: ROUTES.app('/'),
    Component: Outlet,
    children: [
      {
        path: ROUTES.app(':id'),
        Component: () => <div>Id</div>,
      },
    ],
  },
  {
    path: ROUTES.app('document'),
    Component: CreateDocumentPage,
  },
]

export const adminRoutes = [
  {
    path: ROUTES.admin('users'),
    element: <div>Users</div>,
  },
  {
    path: ROUTES.admin('document-type'),
    element: <div>Document Type</div>,
  },
  {
    path: ROUTES.admin('attribute-type'),
    element: <div>Attribute Type</div>,
  },
]

export const routes = [
  {
    Component: AppProvider,
    children: [
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
      {
        path: ROUTES.home,
        Component: () => <Authorization requireAuth />,
      },
      {
        path: ROUTES.signIn,
        Component: SlotsSignIn,
      },
      {
        path: ROUTES.app(),
        Component: () => (
          <ProtectedRoute>
            <AppDashboardLayout />
          </ProtectedRoute>
        ),
        children: [...appRoutes],
      },
      {
        path: ROUTES.admin(),
        element: <div>Admin</div>,
        children: [...adminRoutes],
      },
    ],
  },
]
