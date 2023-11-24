const express = require('express')
const homeRouter = require('./home')

const router = express.Router();

const route = (app) => {



    router.use('/', homeRouter)
}

module.exports = route