module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('account', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
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
    }, {
        timestamps: false
    })
    return Account
}