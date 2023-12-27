const db = require('../models')
const User = db.User
const Purchase = db.Purchase
const Account = db.Account
const { Op } = require("sequelize");

class UserController {
    //[post] /api/user/buy
    async buy(req, res, next) {
        const userPurchased = await User.findOne({ where: { username: req.user.username } })
        const { accountId, ...values } = req.body
        const accountPurchased = await Account.findOne({ where: { id: accountId } })

        const newPurchase = await Purchase.create(values)
        userPurchased.addPurchase(newPurchase)
        accountPurchased.setPurchase(newPurchase)
        res.status(200).json(newPurchase)
    }

    //[post] /api/user/sell
    sell(req, res, next) {

    }

    //[get] /api/user/purchased
    async getPurchased(req, res, next) {
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
    }

    async getPurchasedAccount(req, res, next) {
        const userPurchased = await User.findOne({ where: { username: req.user.username } })
        const purchaseds = await Purchase.findAll({
            where: { userId: userPurchased.id, status: "Đã chấp nhận" },
            include: [{
                model: Account,
                attributes: ['username', 'password'],
            }],
            order: [['id', 'DESC']],
        })
        return res.status(200).json(purchaseds)
    }

}

module.exports = new UserController()