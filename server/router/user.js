const express = require('express')
const api = express.Router()
const PostsSchema = require('../components/posts/PostsSchema')

// This section will help you get a list of all the posts
api.route('/api/posts').get(async (req, res) => {
	try {
		const limit = req.query._limit
		const page = req.query._page

		const count = await PostsSchema.countDocuments()
		let all = await PostsSchema.find({}, null, {skip: (page - 1) * limit, limit: limit })

		res.json({
			posts: all,
			count: count
		})
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
})

// This section will help you get a post by id
api.route('/api/posts/:id').get(async (req, res) => {
	try {
		const post = await PostsSchema.findOne({id: Number(req.params.id)})
		res.json(post)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
})

api.route('/api/authenticate').post((req, res) => {
	try {
		const user = {
			id: 1,
			fullName: 'Laybich',
			avatar: 'https://avatars.githubusercontent.com/u/110945214?v=4',
		}

		res.json(user)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
})

module.exports = api;