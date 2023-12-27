const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const authenticateToken = require('../middlewares/authenticate')

router.post('/buy', authenticateToken, UserController.buy)
router.post('/sell', authenticateToken, UserController.sell)
router.post('/sell/send-pay-info', authenticateToken, UserController.sendPayInfo)
router.get('/purchased', authenticateToken, UserController.getPurchased)
router.get('/sold', authenticateToken, UserController.getSold)

module.exports = router