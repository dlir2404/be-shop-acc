const jwt = require('jsonwebtoken')


const middlewareController = {
    verifyToken: async (req, res, next) => {
        const token = req.cookies.accessToken
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.SECRET_KEY_TOKEN, (err, user) => {
                if (err) {
                    res.status(403).json({
                        errorCode: 5,
                        message: 'Token không hợp lệ'
                    })
                }
                req.user = user
                next()
            })

        } else {
            res.status(401).json({
                errorCode: 10,
                message: "You're not authenticated"
            })
        }
    },

    verifyAdmin: async (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === 'admin') {
                next()
            }
            else {
                res.status(403).json({
                    errorCode: 10,
                    message: 'Bạn không có quyền truy cập.'
                })
            }
        })
    }
}

module.exports = middlewareController