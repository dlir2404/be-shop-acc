const db = require('../models')
const User = db.User

class UserController {
    //[post] /api/user/buy
    buy(req, res, next) {

    }
    
    //[post] /api/user/sell
    sell(req, res, next) {

    }

    //[get] /api/user/buy-histories
    getBuyHistories(req, res, next) {

    }

}

module.exports = new UserController()