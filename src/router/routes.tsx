import App from '@/App'
import { Outlet } from 'react-router-dom'

const ROUTES = {
  home: '/',
  admin: (page = '') => `/admin/${page}`,
  app: (page = '') => `/app/${page}`,
}

export const publicRoutes = [
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
  {
    path: ROUTES.home,
    element: <App />,
  },
]

export const adminRoutes = [
  {
    path: ROUTES.admin(),
    element: <Outlet />,
    children: [
      {
        path: ROUTES.admin(),
        element: <div>Admin</div>,
      },
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
    ],
  },
]

export const appRoutes = [
  {
    path: ROUTES.app(),
    element: <Outlet />,
    children: [
      {
        path: ROUTES.app(),
        element: <div>App</div>,
      },
      {
        path: ROUTES.app('document'),
        element: <div>Create Document</div>,
      },
    ],
  },
]
