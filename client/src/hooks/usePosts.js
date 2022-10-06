import { useMemo } from 'react'

export const useSortedPosts = (posts, sort) => {
	const sortedPosts = useMemo(() => {
		if (sort) {
			return [...posts].sort((a, b) => {
				if (typeof b[sort] === 'number') b[sort] = Number(b[sort]).toString()
				return b[sort].localeCompare(a[sort])
			})
		}
		return posts
	}, [sort, posts])

	return sortedPosts
}

export const usePosts = (posts, sort, query) => {
	const sortedPosts = useSortedPosts(posts, sort)

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
	}, [query, sortedPosts])

	return sortedAndSearchedPosts
}