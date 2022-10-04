
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

	static async addPost(post) {
		await fetch('http://localhost:4000/api/add/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(post)
		})
	}

	static async editPost(newPost) {
		await fetch(`http://localhost:4000/api/update/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newPost)
		})
	}

	static async removeById(id) {
		await fetch(`http://localhost:4000/api/delete/${id}`)
	}
}