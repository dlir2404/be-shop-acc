const express = require('express')
const router = express()
const AdminController = require('../controllers/AdminController')

//admin auth
router.post('/auth/login', AdminController.login)
router.get('/auth/authorize', AdminController.authorize)

//buy request
router.get('/buy/requests', AdminController.getBuyRequests)
router.post('/buy/accept-request', AdminController.acceptBuyRequest)
router.post('/buy/deny-request', AdminController.denyBuyRequest)

//sell request
router.get('/sell/requests', AdminController.getSellRequest)
router.post('/sell/accept-request', AdminController.acceptSellRequest)
router.post('/sell/deny-request', AdminController.denySellRequest)

module.exports = router