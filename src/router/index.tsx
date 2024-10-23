import { createBrowserRouter } from 'react-router-dom'

import App from '../App'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/app/:page?',
		element: <div>App</div>,
	},
	{
		path: '/admin/:page?',
		element: <div>Admin</div>,
	},
])

export default router
