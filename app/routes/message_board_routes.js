const express = require('express')
const passport = require('passport')

// pull in Mongoose model for messageboard
const User = require('../models/user')
const MessageBoard = require('../models/messageBoard')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const multer  = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, './uploads');
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname);
	},
  });
  const upload = multer({ storage });

// INDEX
// GET ALL MESSAGES FROM MESSAGEBOARD
router.get('/messageboard', (req, res, next) => {
	MessageBoard.find().sort({date: -1})
		.populate('owner')
		.then((messageboard) => {
			return messageboard.map((message) => message.toObject())
		})
		// respond with status 200 and JSON of the examples
		.then((messageboard) => res.status(200).json({ messageboard: messageboard }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /messageboard/5a7db6c74d55bc51bdf39793
router.get('/messageboard/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	MessageBoard.findById(req.params.id)
		.populate(['owner', 'comments.owner'])
		.then(handle404)
		.then((message) => res.status(200).json({ message: message.toObject() }))
		.catch(next)
})

// CREATE
// POST /messageboard
router.post('/messageboard', requireToken, upload.single('file'), (req, res, next) => {
	const messageData = JSON.parse(req.body.message);
	messageData.owner = req.user.id
	if (req.file) {messageData.image = req.file.path}
		

	MessageBoard.create(messageData)
		.then((message) => {
			res.status(201).json({ message: message.toObject() })
		})
		.catch(next)
})

// UPDATE
// PATCH /messageboard/5a7db6c74d55bc51bdf39793
router.patch('/messageboard/:id', requireToken, removeBlanks, upload.single('file'),(req, res, next) => {
	// if the client attempts to change the `owner` property by including a new owner, prevent that by deleting that key/value pair
	delete req.body.message.owner
	const messageData = JSON.parse(req.body.message);
	if(req.file) {messageData.image = req.file.path}
	MessageBoard.findById(req.params.id)
		.then(handle404)
		.then((message) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, message)
			// pass the result of Mongoose's `.update` to the next `.then`
			return message.updateOne(messageData)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/messageboard/:id', requireToken, (req, res, next) => {
	MessageBoard.findById(req.params.id)
		.then(handle404)
		.then((message) => {
			// throw an error if current user doesn't own `message`
			requireOwnership(req, message)
			// delete the message ONLY IF the above didn't throw
			message.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
