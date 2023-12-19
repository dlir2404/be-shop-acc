module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('purchase', {
        userId: {
            type: DataTypes.INTEGER,
        },
        accountId: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
        },
        billUrl: {
            type: DataTypes.STRING,
        }
    })
    return Purchase
}