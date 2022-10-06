import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import Login from '../pages/Login';
import AdminPanel from '../pages/AdminPanel';


export const privateRoutes = [
	{path: 'posts', element: <Posts />},
	{path: 'posts/:id', element: <PostIdPage />},
]

export const publicRoutes = [
	{path: 'login', element: <Login />},
	{path: 'posts', element: <Posts />},
	{path: 'posts/:id', element: <PostIdPage />},
]