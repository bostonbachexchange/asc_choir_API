const mongoose = require('mongoose')
const { Schema, model } = mongoose

const sundayServiceSchema = new Schema(
	{
		date: {
			type: Date,
		},
		minister: {
			type: String,
		},
		theme: {
			type: String,
		},
		image: {
			type: String,
		},
		prelude: {
			type: String,
		},
		preludePerformer: {
			type: String,
		},
		openingHymn: {
			type: String,
		},
		openingHymnPerformer: {
			type: String,
		},
		openingHymnNumber: {
			type: Number,
		},	
		chaliceSong: {
			type: String,
		},
		chaliceSongPerformer: {
			type: String,
		},
		chaliceSongNumber: {
			type: Number,
		},
		centeringHymn: {
			type: String,
		},
		centeringHymnPerformer: {
			type: String,
		},
		centeringHymnNumber: {
			type: Number,
		},
		offertory: {
			type: String,
		},
		offertoryPerformer: {
			type: String,
		},
		offertoryNumber: {
			type: Number,
		},
		closingHymn: {
			type: String,
		},
		closingHymnPerformer: {
			type: String,
		},
		closingHymnNumber: {
			type: Number,
		},		
		postlude: {
			type: String,
		},
		postludePerformer: {
			type: String,
		},
		postludeNumber: {
			type: Number,
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

module.exports = model('SundayService', sundayServiceSchema)
