const express = require('express')
const passport = require('passport')
const Song = require('../models/song')
const User = require('../models/user')
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

// CREATE
// POST /comments/<message_id>
router.post('/create-recordings/:songId', requireToken, upload.single('file'),(req, res, next) => {
    const recordingData = JSON.parse(req.body.recording);
	recordingData.owner = req.user.id
	recordingData.audio = req.file.path
	const songId = req.params.songId
	Song.findById(songId)
	.then(handle404)
	.then(song => {
			song.audioRecording.push(recordingData)
			return song.save()
		})
		.then(song => res.status(201).json({ song: song}))
		.catch(next)
})

// UPDATE
// PATCH /comments/<message_id>/<comment_id>
router.patch('/recordings/:songId/:audioRecordingId', requireToken, removeBlanks, upload.single('file'), (req, res, next) => {
    // Delete owner?
    const recordingData = JSON.parse(req.body.audioRecording);
	recordingData.audio = req.file.path

	const songId = req.params.songId
	const audioRecordingId = req.params.audioRecordingId

	Song.findById(songId)
		.then(handle404)
		.then(song => {
			const theRecording = song.audioRecording.id(audioRecordingId)
			theRecording.set(recordingData)
			return song.save()
		})
		.then(() => res.sendStatus(200))
		.catch(next)
})

// DESTROY
// DELETE /comments/<message_id>/<comment_id>
router.delete('/recordings/:songId/:audioRecordingId', requireToken, (req, res, next) => {
	const songId = req.params.songId
	const audioRecordingId = req.params.audioRecordingId

	Song.findById(songId)
		.then(handle404)
		.then(song => {
			const theRecording = song.audioRecording.id(audioRecordingId)
			theRecording.remove()
			return song.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
