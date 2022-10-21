const mongoose = require('mongoose')

module.exports = {
	connect: async () => {
		try {
			await mongoose.connect('mongodb://localhost:27017')
			console.log('Successfully connected to MongoDB.')
		} catch (e) {
			console.error(e)
			process.exit(1)
		}
	}
}