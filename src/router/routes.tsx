import AdminPage from '@/components/adminPage/adminPage'
import UserTable from '@/components/userTable/userTable'

import { Authorization } from './authorization'
import { CreateDocumentForm } from '@/components/createDocumentForm/createDocumentForm.tsx'
import CreateAttributePage from 'src/pages/CreateAttributePage'

export const ROUTES = {
  home: '/',
  admin: (page = '') => `/admin/${page}`,
  app: (page = '') => `/app/${page}`,
  signIn: '/sign-in',
  signUp: '/sign-up',
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
]

export const authRoutes = [
  {
    element: <Authorization />,
    children: [
      {
        path: ROUTES.signIn,
        element: <div>Sign In</div>,
      },
      {
        path: ROUTES.signUp,
        element: <div>Sign Up</div>,
      },
      {
        path: ROUTES.signUp,
        element: <div>Sign Out</div>,
      },
    ],
  },
]

export const adminRoutes = [
  {
    path: ROUTES.admin(),
    element: <Authorization />,
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
      {
        path: ROUTES.admin('attribute-type/create-attribute'),
        element: <CreateAttributePage />,
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
