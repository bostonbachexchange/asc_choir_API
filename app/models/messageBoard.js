const mongoose = require('mongoose')
const commentSchema = require('./comment')
const { Schema, model } = mongoose

const messageBoardSchema = new Schema(
	{
		name: {
			type: String,
		},
		title: {
			type: String,
		},
		image: {
			type: String,
		},
		content: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		comments: [commentSchema],
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = model('MessageBoard', messageBoardSchema)
