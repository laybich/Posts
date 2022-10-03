const express = require('express')
const cors = require('cors')
const parser = require('rss-url-parser')
const cron = require('node-cron')
const db = require('./db/connect')

const app = express();
const PORT = 4000;
app.use(cors())
app.use(express.json())
app.use(require('./router/mongo'));

function rssParse(url) {
	return parser(url)
}

try {
	app.listen(PORT, () => {
		// perform a database connection when server starts
		db.connect();

		// Update posts every minute
		cron.schedule('* * * * *', async () => {
			const data = await rssParse('https://lifehacker.com/rss')
			db.updatePosts(data)
		})

		console.info(`Server is running on port: ${PORT}`);
	})
} catch (e) {
	console.error(e)
	process.exit(1)
}