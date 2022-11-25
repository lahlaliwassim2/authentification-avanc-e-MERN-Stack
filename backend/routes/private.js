const express = require('express')
const router = express.Router()
const {getPrivateData} = require('../controllers/private')
/* Importing the protect middleware from the auth.js file. */
const { protect} = require('../middleware/auth')


router.route('/').get(protect, getPrivateData)


module.exports = router