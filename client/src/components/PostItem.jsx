import React from 'react'
import MyButton from './UI/button/MyButton'
import { useNavigate } from 'react-router-dom'

function PostItem(props) {
	const router = useNavigate()
	return (
		<div className='post'>
			<div className='post__content'>
				<strong>{props.number}. {props.post.title}</strong>
				<div>{props.post.body}</div>
			</div>
			<div className='post__btns'>
				<MyButton onClick={() => router(`/posts/${props.post.guid}`)}>
					Open
				</MyButton>
				<MyButton onClick={() => props.remove(props.post)}>
					Delete
				</MyButton>
			</div>
		</div>
	)
}

export default PostItem;