const db = require('../models')
const Admin = db.Admin
const User = db.User
const Purchase = db.Purchase
const Sell = db.Sell
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class AdminController {
    //[post] /api/admin/auth/register
    async register(req, res, next) {
        try {
            let existAdmin = await Admin.findOne({ where: { username: req.body.username } })
            if (existAdmin === null) {
                bcrypt.hash(req.body.password, 10, async (err, hash) => { //Mã hóa mật khẩu trước khi lưu vào db
                    if (err) { return next(err); }
                    await Admin.create({
                        username: req.body.username,
                        password: hash,
                    });
                })
                res.status(200).json({
                    errorCode: 0,
                    message: "Đăng ký tài khoản thành công"
                })
            } else {
                res.status(401).json({
                    errorCode: 1,
                    message: "Tài khoản đã tồn tại",
                })
            }
        } catch (error) {
            next(error)
        }
    }


    //[post] /api/admin/auth/login
    async login(req, res, next) {
        try {
            let existAdmin = await Admin.findOne({ where: { username: req.body.username } })
            if (existAdmin !== null) {
                let comparePass = await bcrypt.compare(req.body.password, existAdmin.password)
                if (comparePass) {
                    const accessToken = jwt.sign({
                        username: req.body.username,
                        role: existAdmin.role
                    }, process.env.SECRET_KEY_TOKEN);
                    const { password, ...rest } = existAdmin.dataValues

                    res.status(200).json({
                        errorCode: 0,
                        ...rest,
                        message: "Đăng nhập thành công",
                        accessToken: accessToken,
                    })
                } else {
                    res.status(400).json({
                        errorCode: 3,
                        message: 'Mật khẩu không chính xác'
                    })
                }
            } else {
                res.status(400).json({
                    errorCode: 2,
                    message: "Tài khoản không tồn tại"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    //[get] /api/admin/users
    async getUsers(req, res, next) {
        try {
            const count = await User.count({
                attributes: { exclude: ['password', 'updatedAt'] },
            })
            const response = await User.findAll({
                attributes: { exclude: ['password', 'updatedAt'] },
            })
            res.status(200).json({
                count: count,
                data: response
            })
        } catch (error) {
            res.status(400).json("Bad request")
        }
    }

    //[get] /api/admin/buy/requests
    async getBuyRequests(req, res, next) {
        try {
            const count = await Purchase.count({})
            const BuyRequests = await Purchase.findAll({})
            res.status(200).json({
                count,
                data: BuyRequests,
            });
        } catch (error) {
            console.log(error)
            res.status(400).json("Bad request")
        }
    }
    //[post] /api/admin/buy/accept-request
    async acceptBuyRequest(req, res, next) {

    }
    //[post] /api/admin/buy/deny-request
    async denyBuyRequest(req, res, next) {

    }

    //[get] /api/admin/sell/requests
    async getSellRequest(req, res, next) {
        try {
            const count = await Purchase.count({})
            const BuyRequests = await Purchase.findAll({})
            res.status(200).json({
                count,
                data: BuyRequests,
            });
        } catch (error) {
            console.log(error)
            res.status(400).json("Bad request")
        }
    }

    //[post] /api/admin/sell/accept-request
    async acceptSellRequest(req, res, next) {

    }

    //[post] /api/admin/sell/deny-request
    async denySellRequest(req, res, next) {

    }

}

module.exports = new AdminController