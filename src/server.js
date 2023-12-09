const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//connectDB
const { sequelize, testConnection } = require('./config/connectDB')
testConnection()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



const port = process.env.PORT || 8686


route(app)

app.listen(port, () => {
    console.log('Dinh Linh be app is running at port: ' + port)
})

