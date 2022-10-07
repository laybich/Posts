import React from 'react';
import {
	Card,
	Toolbar,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PostList({posts, title}) { 
	const route = useNavigate()

	if (!posts.length) {
		return (
			<h1 style={{textAlign: 'center'}}>
				Posts not found!
			</h1>
		)
	}

	return (
		<div className='posts'>
			{/* <h1>{title}</h1> */}
			<Card>
				<Table sx={{ padding: 2 }} size="small">
					<TableHead>
						<TableRow>
								<TableCell>Id</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{posts.map(post =>
							<TableRow onClick={() => route(`/posts/${post.id}`)} key={post.id} style={{cursor: 'pointer'}}>
								<TableCell>{post.id}</TableCell>
								<TableCell>{post.title}</TableCell>
								<TableCell>{new Date(post.pubDate).toLocaleDateString()}</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Card>
		</div>
	)
}

export default PostList;