import React, { useEffect, useState } from 'react'
import PostService from '../API/PostService'
import PostList from '../components/PostList'
import { useFetching } from '../hooks/useFetching'

function Posts() {
	const [posts, setPosts] = useState([])

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll()
		setPosts([...posts, ...response])
	})

	const [removePost] = useFetching(async post => {
		await PostService.removeById(post.guid)
		setPosts(posts.filter(p => p.guid !== post.guid))
	})

	useEffect(() => {
		fetchPosts()
	}, [])

	return (
		<div className='App'>
			{postError &&
				<h1>Error ${postError}</h1>
			}
			<PostList remove={removePost} posts={posts} title={'POSTS'} />
			{isPostsLoading &&
				<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>Loading...</div>
			}
		</div>
	)
}

export default Posts;