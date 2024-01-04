const express = require('express')
const router = express()
const AdminController = require('../controllers/AdminController')

//admin auth
router.post('/auth/register', AdminController.register)
router.post('/auth/login', AdminController.login)
router.get('/auth/verify', AdminController.verify)

//users
router.get('/users', AdminController.getUsers)
router.post('/users/lock/:id', AdminController.lockUser)
router.post('/users/unlock/:id', AdminController.unlockUser)

//account
router.get('/accounts', AdminController.getAccounts)
router.post('/accounts/add-account', AdminController.addAccount)
router.delete('/accounts/del-account/:id', AdminController.deleteAccount)


//buy request
router.get('/buy/requests', AdminController.getBuyRequests)
router.post('/buy/accept-request/:id', AdminController.acceptBuyRequest)
router.post('/buy/deny-request/:id', AdminController.denyBuyRequest)

//sell request
router.get('/sell/requests', AdminController.getSellRequest)
router.post('/sell/accept-request/:id', AdminController.acceptSellRequest)
router.post('/sell/deny-request/:id', AdminController.denySellRequest)
router.post('/sell/confirm-pay/:id', AdminController.confirmPay)

module.exports = router