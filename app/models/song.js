const mongoose = require('mongoose')
const { Schema, model } = mongoose

const songSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		composer: {
			type: String,
		},
		lyricist: {
			type: String,
		},
		type: {
			type: String,
		},
		hymnNumber: {
			type: Number,
		},
		lyrics: {
			type: String,
		},
		source: {
			type: String,
		},
		scorePDF: {
			type: String,
		},
		recordings: { 
			soprano: {type: String},
			alto: {type: String},
			tenor: {type: String},
			bass: {type: String},
			satb: {type: String},
			piano: {type: String},
	},
		embedId: [
			{ type: String }
		],
		webScore: [
			{ type: String }
		],
		url: {
			type: String,
		},
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

module.exports = model('Song', songSchema)
