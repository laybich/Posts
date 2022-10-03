import React from 'react'
import { useState } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import MyTextArea from '../components/UI/textarea/MyTextArea'

function CreatePost({create}) {
	const [post, setPost] = useState({title: '', description: ''})

	const addNewPost = e => {
		e.preventDefault()
		const newPost = {
			...post,
			guid: Date.now(),
			pubDate:(new Date).toLocaleString(),
			creator: {'#': 'user'},
		}
		create(newPost)
		setPost({title: '', description: ''})
	}

	return (
		<form className='create'>
			<h1>New post</h1>
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
			<MyButton onClick={addNewPost}>Create Post</MyButton>
		</form>
	)
}

export default CreatePost