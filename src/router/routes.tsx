import AdminPage from '@/components/adminPage/adminPage'
import UserTable from '@/components/userTable/userTable'
import CreateUser from '@/components/createUser/CreateUser'

import { Authorization } from './authorization'
import { CreateDocumentForm } from '@/components/createDocumentForm/createDocumentForm.tsx'
import { SignInPage } from '@/pages/signIn'
import { SignOutPage } from '@/pages/signOut'
import DocumentsPage from '@/pages/testApi/documents'
import UsersPage from '@/pages/testApi/users'
import SignaturePage from '@/pages/testApi/signature'

export const ROUTES = {
  home: '/',
  admin: (page = '') => `/admin/${page}`,
  app: (page = '') => `/app/${page}`,
  signIn: '/sign-in',
  signOut: '/sign-out',
}

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
  {
    path: '/test-api/documents',
    element: <DocumentsPage />,
  },
  {
    path: '/test-api/users',
    element: <UsersPage />,
  },
  {
    path: '/test-api/signature',
    element: <SignaturePage />,
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

export const appRoutes = [
  {
    path: ROUTES.app(),
    element: <Authorization requireAuth />,
    children: [
      {
        path: ROUTES.app(),
        element: <div>App</div>,
      },
      {
        path: ROUTES.app('document'),
        element: <CreateDocumentForm />,
      },
    ],
  },
]
