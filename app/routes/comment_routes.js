const express = require('express')
const passport = require('passport')

const Comment = require('../models/comment')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /comment
router.get('/comments', requireToken, (req, res, next) => {
	Comment.find()
		.then((comments) => {
			// `examples` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return comments.map((comment) => comment.toObject())
		})
		// respond with status 200 and JSON of the examples
		.then((comments) => res.status(200).json({ comments: comments }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /comments/5a7db6c74d55bc51bdf39793
router.get('/comments/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Comment.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "example" JSON
		.then((comment) => res.status(200).json({ comment: comment.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /examples
router.post('/comments', requireToken, (req, res, next) => {
	// set owner of new example to be current user
	req.body.comment.owner = req.user.id
	req.body.comment.name = req.user.name
	// console.log('req.body.comment.name', req.body.comment.name) 
	// console.log('req.user.name', req.user)
	Comment.create(req.body.comment)
		// respond to succesful `create` with status 201 and JSON of new "example"
		.then((comment) => {
			res.status(201).json({ comment: comment.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /comments/5a7db6c74d55bc51bdf39793
router.patch('/comments/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.comment.owner

	Comment.findById(req.params.id)
		.then(handle404)
		.then((comment) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, comment)

			// pass the result of Mongoose's `.update` to the next `.then`
			return comment.updateOne(req.body.comment)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /comments/5a7db6c74d55bc51bdf39793
router.delete('/comments/:id', requireToken, (req, res, next) => {
	Comment.findById(req.params.id)
		.then(handle404)
		.then((comment) => {
			// throw an error if current user doesn't own `example`
			requireOwnership(req, comment)
			// delete the example ONLY IF the above didn't throw
			comment.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router