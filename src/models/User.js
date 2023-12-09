const { Sequelize, DataTypes, Model, INTEGER } = require('sequelize');
const { sequelize } = require('../config/connectDB')

class User extends Model { }

User.init({
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
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});

module.exports = User