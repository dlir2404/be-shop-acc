const db = require('../models')
const User = db.User
const Purchase = db.Purchase
const Account = db.Account
const Sell = db.Sell
const { Op } = require("sequelize");

class UserController {
    //[post] /api/user/buy
    async buy(req, res, next) {
        try {
            const userPurchased = await User.findOne({ where: { username: req.user.username } })
            const { accountId, ...values } = req.body
            const accountPurchased = await Account.findOne({ where: { id: accountId } })

            if (!accountPurchased) {
                res.status(404).json('Account not found')
            } else {
                await accountPurchased.update({ isPending: 1 })

                const newPurchase = await Purchase.create(values)
                userPurchased.addPurchase(newPurchase)
                accountPurchased.setPurchase(newPurchase)
                res.status(200).json(newPurchase)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Server Internal Error')
        }
    }

    //[get] /api/user/purchased
    async getPurchased(req, res, next) {
        try {
            const userPurchased = await User.findOne({ where: { username: req.user.username } })
            const count = await Purchase.count({
                where: { userId: userPurchased.id },
            })
            const purchasedsaccept = await Purchase.findAll({
                where: {
                    userId: userPurchased.id,
                    status: 'Đã xác nhận'
                },
                include: [{
                    model: Account,
                    attributes: ['username', 'password'],
                }],
            })

            const purchasedsrest = await Purchase.findAll({
                where: {
                    userId: userPurchased.id,
                    [Op.or]: [
                        { status: 'Chờ xác nhận' },
                        { status: 'Đã từ chối' }
                    ]
                },
            })

            const allPurchase = [...purchasedsaccept, ...purchasedsrest].sort((a, b) => b.id - a.id)


            return res.status(200).json({
                count,
                data: allPurchase,
            })
        } catch (error) {
            res.status(500).json({
                error: error,
                message: "server internal errror"
            })
        }
    }

    //[post] /api/user/sell
    async sell(req, res, next) {
        try {
            const userSold = await User.findOne({ where: { username: req.user.username } })
            const newSell = await Sell.create(req.body)
            userSold.addSell(newSell)
            res.status(200).json("true")
        } catch (error) {
            console.log(error)
            res.status(500).json("server internal error")
        }
    }
    //[get] /api/user/sold
    async getSold(req, res, next) {
        try {
            const userSold = await User.findOne({ where: { username: req.user.username } })
            const count = await Sell.count({
                where: { userId: userSold.id },
            })
            const solds = await Sell.findAll({
                where: {
                    userId: userSold.id,
                },
                order: [['id', 'DESC']]
            })

            return res.status(200).json({
                count,
                data: solds,
            })
        } catch (error) {
            res.status(500).json({
                error: error,
                message: "server internal errror"
            })
        }
    }

    async sendPayInfo(req, res, next) {
        try {
            const sold = await Sell.findOne({ where: { id: req.body.id } })
            await sold.update({
                username: req.body.username,
                password: req.body.password,
                payUrl: req.body.payUrl,
                status: 'Đã gửi thông tin thanh toán'
            })
            res.status(200).json("true")
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: error,
                message: "server internal errror"
            })
        }
    }
}

module.exports = new UserController()