const express = require('express')
const router = express.Router()
const testsController = require('../controllers/tests.controller')

router.post('/createTest', testsController.createTest)
router.post('/sendAnswer', testsController.sendAnswer)
router.get('/getTest/:test_id', testsController.getTest)
router.get('/getQuestions/:test_id', testsController.getQuestions)
router.post('/deleteTest', testsController.deleteTest)

module.exports = router