const express = require('express')
const authRouter = require('./auth')
const userRouter = require('./user')
const adminRouter = require('./admin')

const router = express.Router();

const route = (app) => {

    //auth
    router.use('api/auth/', authRouter)

    //user
    router.use('/api/user', userRouter)

    //admin
    router.use('/api/admin', adminRouter)

}

module.exports = route