const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const authenticateToken = require('../middlewares/authenticate')

router.post('/buy', authenticateToken, UserController.buy)
router.post('/sell', authenticateToken, UserController.sell)
router.get('/purchased', authenticateToken, UserController.getPurchased)

module.exports = router