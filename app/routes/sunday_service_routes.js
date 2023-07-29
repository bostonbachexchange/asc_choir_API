// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
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
// pull in Mongoose model for messageboard
const User = require('../models/user')
const SundayService = require('../models/sundayService')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET ALL MESSAGES FROM MESSAGEBOARD
router.get('/sundayservice', (req, res, next) => {
	SundayService.find().sort({date: -1})
        .then((sundayservice) => {
            return sundayservice.map((service) => service.toObject())
        })
		.then((sundayservice) => res.status(200).json({ sundayservice: sundayservice }))
		.catch(next)
})

// SHOW
// GET /sundayservice/5a7db6c74d55bc51bdf39793
router.get('/sundayservice/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	SundayService.findById(req.params.id)
		.then(handle404)
		.then((sundayservice) => res.status(200).json({ sundayservice: sundayservice.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /sundayservice
router.post('/sundayservice', requireToken, removeBlanks, upload.single('file'),(req, res, next) => {
	// set owner of new example to be current user
	const serviceData = JSON.parse(req.body.service);
	// req.body.service.owner = req.user.id
	serviceData.owner = req.user.id
	serviceData.image = req.file.path
	
	SundayService.create(serviceData)
		// respond to succesful `create` with status 201 and JSON of new "example"
		.then((service) => {
			res.status(201).json({ service: service.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /messageboard/5a7db6c74d55bc51bdf39793
router.patch('/sundayservice/:id', requireToken, removeBlanks, upload.single('file'), (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new owner, prevent that by deleting that key/value pair
	delete req.body.service.owner
	
	const serviceData = JSON.parse(req.body.service);
	serviceData.image = req.file.path
	
	SundayService.findById(req.params.id)
		.then(handle404)
		.then((service) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			// console.log('update messate route in api hit')
			requireOwnership(req, service)

			// pass the result of Mongoose's `.update` to the next `.then`
			// console.log('req.body.service', req.body.service)
			return service.updateOne(serviceData)
			// service.set(serviceData);
			// console.log("service after set: ", service)
			// // Save the updated service document to the database
			// return service.save();
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/sundayservice/:id', requireToken, (req, res, next) => {
	SundayService.findById(req.params.id)
		.then(handle404)
		.then((service) => {
			// throw an error if current user doesn't own `message`
			requireOwnership(req, service)
			// delete the message ONLY IF the above didn't throw
			service.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
