import { createBrowserRouter } from 'react-router-dom'
import { adminRoutes, appRoutes, publicRoutes, authRoutes } from './routes'

const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...adminRoutes,
  ...appRoutes,
])

export default router
