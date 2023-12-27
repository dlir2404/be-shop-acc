const db = require('../models')
const User = db.User
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

    //[post] /api/auth/me
    async verify(req, res, next) {
        try {
            let userRes = null
            const token = req.header('Authorization')?.split(' ')[1]
            if (!token) {
                return res.status(401).json({
                    errorCode: 1,
                    message: 'Unauthentication'
                })
            }
            jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, user) => {
                if (err) return res.status(403).json({
                    errorCode: 5,
                    message: 'Có lỗi xảy ra, hoặc phiên đăng nhập đã hết hạn'
                })
                userRes = user
            })

            console.log('>>> check: ', userRes)
            res.status(200).json({
                errorCode: 0,
                message: 'Xác minh thành công',
                user: userRes
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                errorCode: 2,
                message: 'Bad request'
            })
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