const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')

router.post('/init', usersController.init)

module.exports = router