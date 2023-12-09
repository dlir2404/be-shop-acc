const express = require('express')
const authRouter = require('./auth')
const userRouter = require('./user')
const adminRouter = require('./admin')
const commonRouter = require('./common')

const router = express.Router();

const route = (app) => {


    //auth
    app.use('/api/auth', authRouter)

    //user
    app.use('/api/user', userRouter)

    //admin
    app.use('/api/admin', adminRouter)

    //common
    app.use('/api', commonRouter)
}


module.exports = route