const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes/index')
const app = express()
const dotenv = require('dotenv')
dotenv.config()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//connectDB
const { sequelize, testConnection } = require('./config/connectDB')
testConnection()

route(app)


const port = process.env.PORT || 8686

app.listen(port, () => {
    console.log('Dinh Linh be app is running at port: ' + port)
})

