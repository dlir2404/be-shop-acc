
const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]
    console.log(token)
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
        console.log('>>> check: ', user)
        req.user = user
    })
    next()
}

module.exports = authenticateToken