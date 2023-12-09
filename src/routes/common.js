const express = require('express')
const router = express.Router()
const commonController = require('../controllers/CommonController')
const middlewareController = require('../controllers/middlewareControllers')

router.get('/accounts', commonController.getAccounts)

module.exports = router