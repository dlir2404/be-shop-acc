const db = require('../models')
const Account = db.Account

class CommonController {
    //[get] /api/accounts
    async getAccounts(req, res, next) {
        try {
            const limit = 10;
            const offset = req.query._page ? (req.query._page - 1) * limit : 0
            const accounts = await Account.findAll({
                attributes: { exclude: ['username', 'password'] },
                limit: limit,
                offset: offset,
            })
            res.json(accounts)

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CommonController()