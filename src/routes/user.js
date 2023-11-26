const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/puy', UserController.buy)
router.post('/sell', UserController.sell)
router.get('/buy-histories', UserController.getBuyHistories)

module.exports = router