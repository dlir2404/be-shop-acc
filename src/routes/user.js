const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const authenticateToken = require('../middlewares/authenticate')

router.post('/buy', authenticateToken, UserController.buy)
router.post('/sell', UserController.sell)
router.get('/buy-histories', UserController.getBuyHistories)

module.exports = router