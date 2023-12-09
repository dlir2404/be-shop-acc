const { Sequelize, DataTypes, Model, INTEGER } = require('sequelize');
const { sequelize } = require('../config/connectDB')

class Account extends Model { }

Account.init({
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
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
});

module.exports = Account