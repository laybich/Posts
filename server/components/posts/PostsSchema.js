const { Schema, model } = require('mongoose')

const PostSchema = Schema({
	title: { type: String, required: true },
	description:  { type: String, required: true },
	pubDate: { type: Date, default: Date.now },
	link: { type: String, default: '' },
	guid: { type: Number, required: true, unique: true },
	creator: { type: Object, required: true },
	categories: [
		{
			type: String
		}
	],
});

module.exports = model('Post', PostSchema);