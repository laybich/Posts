const mongoose = require('mongoose')
const Post = require('../components/posts/PostsSchema')

module.exports = {
	connect: async () => {
		try {
			await mongoose.connect('mongodb://localhost:27017')
			console.log('Successfully connected to MongoDB.')
		} catch (e) {
			console.error(e)
			process.exit(1)
		}
	},

	updatePosts: async data =>
		data.forEach(async item => {
			const newPost = new Post({
				title: item.title,
				description: item.description,
				pubDate: item.pubDate,
				link: item.link,
				categories: item.categories,
				id: item.guid,
				creator: item['dc:creator']['#'],
			})

			await Post.findOne({id: item.guid}, async post => {
				if (!post) {
					await newPost.save()
				}
			})
		})
}