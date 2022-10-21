const Post = require('../components/posts/PostsSchema')

module.exports = {
	updatePosts: async data =>
		data.forEach(item => {
			// If post doesn't exist in DB - save it
			Post.findOne({id: item.guid}, post => {
				if (!post) {
					const newPost = new Post({
						title: item.title,
						description: item.description,
						pubDate: item.pubDate,
						link: item.link,
						categories: item.categories,
						id: item.guid,
						creator: item['dc:creator']['#'],
					})

					newPost.save()
				}
			})
		})
}