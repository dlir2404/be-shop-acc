const User = require('../models/User')
const { findByUsername } = require('../services/findUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
    //[post] /api/auth/register
    async register(req, res, next) {
        try {
            let existUser = await User.findOne({ where: { username: req.body.username } })
            if (existUser === null) {
                bcrypt.hash(req.body.password, 10, async (err, hash) => { //Mã hóa mật khẩu trước khi lưu vào db
                    if (err) { return next(err); }
                    const newUser = await User.create({
                        username: req.body.username,
                        password: hash,
                    });

                    //generate token to login immediately
                    const accessToken = jwt.sign({
                        username: req.body.username,
                    }, process.env.SECRET_KEY_TOKEN);

                    const { password, ...rest } = newUser.dataValues

                    res.status(200).json({
                        errorCode: 0,
                        ...rest,
                        message: "Đăng ký tài khoản thành công",
                        accessToken: accessToken,
                    })
                })
            } else {
                res.status(400).json({
                    errorCode: 1,
                    message: "Tài khoản đã tồn tại",
                })
            }
        } catch (error) {
            next(error)
        }
    }

    //[post] /api/auth/login
    async login(req, res, next) {
        try {
            let existUser = await User.findOne({ where: { username: req.body.username } })
            if (existUser !== null) {
                let comparePass = await bcrypt.compare(req.body.password, existUser.password)
                if (comparePass) {
                    const accessToken = jwt.sign({
                        username: req.body.username,
                    }, process.env.SECRET_KEY_TOKEN);

                    const { password, ...rest } = existUser.dataValues

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

    //[post] /api/auth/logout
    async logout(req, res, next) {

    }

    //[get] /api/auth/authorize
    async authorize(req, res, next) {

    }

    //[put] /api/auth/change-password
    changePassword(req, res, next) {

    }

    //[post] /api/auth/forgot-password
    forgotPassword(req, res, next) {

    }
}

module.exports = new AuthController