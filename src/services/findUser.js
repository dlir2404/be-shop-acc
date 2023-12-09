const User = require('../models/User')

const findByUsername = async (username) => {
    try {
        const foundUser = await User.findOne({
            where: {
                username: username
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { findByUsername }