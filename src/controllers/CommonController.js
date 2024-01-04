const db = require('../models')
const Account = db.Account
const utils = require('../utils')

class CommonController {
    //[get] /api/accounts
    async getAccounts(req, res, next) {
        try {

            const filterUndefined = (obj) => {
                const result = {};
                for (const key in obj) {
                    if (obj[key] !== undefined) {
                        result[key] = obj[key];
                    }
                }
                return result;
            };

            const conditions = filterUndefined({
                rank: req.query.rank ? utils.rankToQuery(req.query.rank) : undefined,
                heroes_num: req.query.heroes_num ? utils.heroes_numToQuery(req.query.heroes_num) : undefined,
                costumes_num: req.query.costumes_num ? utils.costumes_numToQuery(req.query.costumes_num) : undefined,
                price: req.query.price ? utils.priceToQuery(req.query.price) : undefined,
                is_full_gems: req.query.is_full_gems,
                isPending: 0
            });

            const limit = 10;
            const offset = req.query._page ? (req.query._page - 1) * limit : 0
            const { rank } = req.query
            const count = await Account.count({ where: conditions })
            const accounts = await Account.findAll({
                where: conditions,
                attributes: { exclude: ['username', 'password'] },
                limit: limit,
                offset: offset,
            })
            res.json({
                count,
                data: accounts
            })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = new CommonController()