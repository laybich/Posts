import React, { useEffect, useState } from 'react'
import PostService from '../API/PostService'
import PostList from '../components/PostList'
import { useFetching } from '../hooks/useFetching'
import { usePosts } from '../hooks/usePosts'
import {
	TextField,
	Select,
	MenuItem,
	Toolbar,
	Button,
} from '@mui/material';
import Pagination from '../components/UI/pagination/Pagination'
import { useNavigate } from 'react-router-dom'

function Posts() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({sort: 'id', query: ''})
	const [totalPages, setTotalPages] = useState(0)
	const [limit] = useState(10)
	const [page, setPage] = useState(1)
	const route = useNavigate()
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page)
		setPosts([...response.posts])
		const totalCount = response.count
		setTotalPages(Math.ceil(totalCount / limit))
	})

	useEffect(() => {
		fetchPosts(limit, page)
	}, [page, limit])

	const changePage = page => {
		setPage(page)
	}

	if (isPostsLoading) {
		return <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>Loading...</div>
	}

	if (postError) {
		<h1>Error ${postError}</h1>
	}

	return (
		<div className='App'>
			<Toolbar style={{justifyContent: 'space-between'}}>
				<p>Your Posts</p>
				<Button onClick={() => route('/admin/login')}>Admin</Button>
			</Toolbar>
			<TextField
				label='Search'
				value={filter.query}
				onChange={e => setFilter({...filter, query: e.target.value})}
				variant='filled'
				size='small'
				margin='dense'
         />
			<Select
				value={filter.sort}
				onChange={e => setFilter({...filter, sort: e.target.value})}
				size='small'
				style={{margin: '8px 4px 4px '}}
			>
				<MenuItem value='id'>Id</MenuItem>
				<MenuItem value='title'>Title</MenuItem>
				<MenuItem value='pubDate'>Date</MenuItem>
			</Select>
			<PostList posts={sortedAndSearchedPosts} title={'POSTS'} />
			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
	)
}

export default Posts;