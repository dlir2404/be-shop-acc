module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('purchase', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        accountId: {
            type: DataTypes.INTEGER,
        },
        accountPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
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