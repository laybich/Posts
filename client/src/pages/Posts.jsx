import React, { useEffect, useState } from 'react'
import PostService from '../API/PostService'
import PostList from '../components/PostList'
import { useFetching } from '../hooks/useFetching'
import { usePosts } from '../hooks/usePosts'
import Pagination from '../components/UI/Pagination'
import Header from '../components/Header'

function Posts() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({sort: 'id', query: ''})
	const [totalPages, setTotalPages] = useState(0)
	const [limit] = useState(10)
	const [page, setPage] = useState(1)
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
		<>
			<Header filter={filter} setFilter={setFilter} />
			<div className='App'>
				<PostList posts={sortedAndSearchedPosts} title={'POSTS'} />
				<Pagination
					page={page}
					changePage={changePage}
					totalPages={totalPages}
				/>
			</div>
		</>
	)
}

export default Posts;