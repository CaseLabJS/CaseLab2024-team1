import { createBrowserRouter } from 'react-router-dom'

import ROUTES from './routes'

import App from '../App'

const router = createBrowserRouter([
	{
		path: ROUTES.home,
		element: <App />,
	},
	{
		path: ROUTES.app(':page?'),
		element: <div>App</div>,
	},
	{
		path: ROUTES.admin(':page?'),
		element: <div>Admin</div>,
	},
])

export default router
