import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'

function PostIdPage() {
	const params = useParams()
	const [post, setPost] = useState({})
	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id)
		setPost(response)
	})

	useEffect(() => {
		fetchPostById(params.id)
	}, [])

	return (
		<div className='postPage'>
			{isLoading
				? <div>Loading...</div>
				: <>
					<h1>{post.title}</h1>
					<p dangerouslySetInnerHTML={{ __html: post.description}} />
				</>
			}
		</div>
	)
}

export default PostIdPage