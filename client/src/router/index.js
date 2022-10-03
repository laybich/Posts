import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import CreatePost from '../pages/CreatePost';
import PostService from '../API/PostService';


export const privateRoutes = [
	{path: 'posts', element: <Posts />}
]

export const publicRoutes = [
	{path: 'posts', element: <Posts />},
	{path: 'posts/:id', element: <PostIdPage />},
	{path: 'create', element: <CreatePost create={post => PostService.addPost(post)} />},
]