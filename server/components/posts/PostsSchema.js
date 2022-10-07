const { Schema, model } = require('mongoose')

const PostSchema = Schema({
	id: { type: Number, required: true, unique: true },
	title: { type: String, required: true },
	description:  { type: String, required: true },
	pubDate: { type: Date, default: Date.now },
	link: { type: String, default: '' },
	creator: { type: String, required: true },
	categories: [
		{
			type: String
		}
	],
});

module.exports = model('Post', PostSchema);