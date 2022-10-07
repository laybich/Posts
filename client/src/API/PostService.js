
export default class PostService {
	static async getAll(limit = 10, page = 1) {
		const response = await fetch('http://localhost:4000/api/posts?' + new URLSearchParams({
				_limit: limit,
				_page: page,
			})
		)
		const data = await response.json()
		return data
	}

	static async getById(id) {
		const response = await fetch(`http://localhost:4000/api/posts/${id}`)
		const data = await response.json()
		return data
	}
}