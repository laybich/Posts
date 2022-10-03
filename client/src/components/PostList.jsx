import React from 'react';
import PostItem from './PostItem';

function PostList({remove, posts, title}) {

	if (!posts.length) {
		return (
			<h1 style={{textAlign: 'center'}}>
				Posts not found!
			</h1>
		)
	}

	return (
		<div className='posts'>
			<h1 style={{textAlign: 'center'}}>{title}</h1>

			{posts.map((post, index) =>
				<PostItem remove={remove} number={index + 1} post={post} key={post.guid} />
			)}
		</div>
	)
}

export default PostList;