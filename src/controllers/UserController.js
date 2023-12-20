const db = require('../models')
const User = db.User
const Purchase = db.Purchase

class UserController {
    //[post] /api/user/buy
    async buy(req, res, next) {
        const userPurchased = await User.findOne({ where: { username: req.user.username } })
        const values = {
            ...req.body,
            userId: userPurchased.id,
            status: 'chờ xác nhận'
        }
        const newPurchase = Purchase.create(values)
        res.status(200).json(newPurchase)
    }

    //[post] /api/user/sell
    sell(req, res, next) {

    }

    //[get] /api/user/buy-histories
    getBuyHistories(req, res, next) {

    }

}

module.exports = new UserController()