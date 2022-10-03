const express = require('express')
const api = express.Router()
const db = require('../db/connect')
const PostsSchema = require('../components/posts/PostsSchema')

// This section will help you get a list of all the posts
api.route('/api/posts').get(async (req, res) => {
	try {
		const all = await PostsSchema.find()
		res.json(all)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
})

// This section will help you get a post by id
api.route('/api/posts/:id').get(async (req, res) => {
	try {
		const post = await PostsSchema.findOne({guid: Number(req.params.id)})
		res.json(post)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
})

// This section will help you add a post to BD
api.route('/api/add/').post(async (req, res) => {
	try {
		const post = new PostsSchema(req.body)
		post.save()
		
		res.json({ msg: 'Post created', created: post })
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
})

// This section will help you delete a record
api.route('/api/delete/:id').get(async (req, res) => {
	try {
		await PostsSchema.findOneAndDelete({guid: req.params.id}, (err, post) => {
			if (!err) {
			  res.json({ msg: "Post deleted", deleted: post });
			} else {
			  console.log("Error removing :" + err);
			}
		})
	} catch (e) {
		console.log("Error removing: " + e);
	}
})

module.exports = api;