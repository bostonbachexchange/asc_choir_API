const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phoneNumber: {
		  type: String, 
		},
		firstName: {
			type: String,
			default: 'First', 
		},
		lastName: {
			type: String,
			default: 'Last', 
		},
		name: {
			type: String,
			default: 'Last', 
		},
		profilePicture: {
			type: String,
			default: 'default', 
		  },
		pronouns: {
			type: String,
		  },
		  preferredContact: {
			type: String,
			enum: ['email', 'phone', 'other'], 
			default: 'email', 
		  },
		vocalRange: {
			type: String,
			enum: ['soprano', 'tenor', 'baritone', 'bass'],
			default: 'soprano'
		},
		settings: {
			receiveBlogNotifications: {
			  type: Boolean,
			  default: true, 
			},
			receiveServiceNotifications: {
			  type: Boolean,
			  default: true, 
			},
		},
		myList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,
	},
	{
		timestamps: true,
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
)

module.exports = mongoose.model('User', userSchema)
