
export default class PostService {
	static async getAll() {
		const response = await fetch('http://localhost:4000/api/posts/')
		const data = await response.json()
		return data
	}

	static async getById(id) {
		const response = await fetch(`http://localhost:4000/api/posts/${id}`)
		const data = await response.json()
		return data
	}
}