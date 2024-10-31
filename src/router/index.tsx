import { createBrowserRouter } from 'react-router-dom'
import { adminRoutes, appRoutes, publicRoutes } from './routes'

const router = createBrowserRouter([
  ...publicRoutes,
  ...adminRoutes,
  ...appRoutes,
])

export default router
