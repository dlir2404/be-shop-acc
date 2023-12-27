module.exports = (sequelize, DataTypes) => {
    const Sell = sequelize.define('sell', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        heroes_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        costumes_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rank: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_full_gems: {
            type: DataTypes.TINYINT,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Chờ xác nhận'
        },
        billUrl: {
            type: DataTypes.STRING,
        },
        payUrl: {
            type: DataTypes.STRING,
        }
    })
    return Sell
}