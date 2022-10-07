import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import AdminPanel from '../pages/AdminPanel';


export const privateRoutes = [
	{path: '/admin/*', element: <AdminPanel />},
	{path: 'posts', element: <Posts />},
	{path: 'posts/:id', element: <PostIdPage />},
]

export const publicRoutes = [
	{path: '/admin/*', element: <AdminPanel />},
	{path: 'posts', element: <Posts />},
	{path: 'posts/:id', element: <PostIdPage />},
]