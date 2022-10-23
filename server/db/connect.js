const mongoose = require('mongoose')
const config = require('../config/default.json')

function connect() {
	try {
		mongoose.connect(config.mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}, () => {
			console.log('Successfully connected to MongoDB.')
		})
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

module.exports = {
	connect
}