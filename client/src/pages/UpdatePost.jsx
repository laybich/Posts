import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import MyTextArea from '../components/UI/textarea/MyTextArea'
import { useFetching } from '../hooks/useFetching'

function UpdatePost({update}) {
	const [post, setPost] = useState({})
	const params = useParams()

	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id)
		setPost(response)
	})

	useEffect(() => {
		fetchPostById(params.id)
	}, [])

	const editPost = e => {
		e.preventDefault()
		update(post)
	}

	return (
		<form className='update'>
			<h1>{post.title} - Edit post</h1>
			<MyInput
				value={post.title}
				onChange={e => setPost({...post, title: e.target.value})}
				type='text'
				placeholder='Title...'
			/>
			<MyTextArea
				value={post.description}
				onChange={e => setPost({...post, description: e.target.value})}
				placeholder='Description...'
			/>
			<MyButton onClick={editPost}>Save changes</MyButton>
		</form>
	)
}

export default UpdatePost