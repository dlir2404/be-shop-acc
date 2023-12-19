module.exports = (sequelize, DataTypes) => {
    const Sell = sequelize.define('sell', {
        userId: {
            type: DataTypes.INTEGER,
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
        }
    })
    return Sell
}