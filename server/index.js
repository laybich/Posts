const express = require('express')
const cors = require('cors')
const config = require('./config/default.json')
const parser = require('rss-url-parser')
const cron = require('node-cron')
const db = require('./db/connect')
const posts = require('./db/posts')
const admin = require('./router/admin')

const app = express();
app.use(cors())
app.use(express.json())
app.use(require('./router/user'));

admin(app)

// read rss feed, returns json data
function rssParse(url) {
	return parser(url)
}

try {
	app.listen(config.port, () => {
		// perform a database connection when server starts
		db.connect();

		// update posts every minute
		cron.schedule('* * * * *', async () => {
			posts.updatePosts(await rssParse(config.rssUri))
		})

		console.info(`Server is running on port: ${config.port}`);
	})
} catch (e) {
	console.error(e)
	process.exit(1)
}