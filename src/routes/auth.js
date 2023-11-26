const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/authorize', AuthController.authorize)
router.put('/change-password', AuthController.changePassword)
router.put('/forgot-password', AuthController.forgotPassword)

module.exports = router