import { createBrowserRouter, Outlet } from 'react-router-dom';

import ROUTES from './routes';

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Outlet></Outlet>,
  },
  {
    path: ROUTES.app(':page?'),
    element: <div>App</div>,
  },
  {
    path: ROUTES.admin(':page?'),
    element: <div>Admin</div>,
  },
]);

export default router;
