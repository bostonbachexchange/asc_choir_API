const mongoose = require('mongoose')

const recordingSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		audio: {
			type: String,
            required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = recordingSchema
