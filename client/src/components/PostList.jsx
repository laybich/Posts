import React from 'react';
import { Title } from 'react-admin';
import {
	Card,
	Toolbar,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from '@mui/material';

function PostList({posts, title}) { 
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
							<TableRow key={post.id}>
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