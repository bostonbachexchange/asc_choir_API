const express = require('express')
const crypto = require('crypto')
const passport = require('passport')

const bcryptSaltRounds = 10

const errors = require('../../lib/custom_errors')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

const User = require('../models/user')

const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

// instantiate a router (mini app that only handles routes)
const router = express.Router()
// 		function getUserWithMyList(user){

// INDEX
// GET ALL Users
router.get('/user-contacts', (req, res, next) => {
	// console.log('usercontacts was hit')
	User.find().sort({email: 1})
		.then((accounts) => {
			// `songs` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return accounts.map((account) => account.toObject())
		})
		// respond with status 200 and JSON of the examples
		.then((accounts) => res.status(200).json({ accounts: accounts }))
		// console.log('accounts in admin routes', account)
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
