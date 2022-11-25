const express = require('express')
const { addlivreur} = require('../controllers/addLivreur')

const { admin } = require('../middleware/RoleMiddleware')
const router = express.Router()

router.route('/').post(admin, addlivreur)
// router.route('/sendmaillivereur').post(sendmaillivreur)
module.exports=router