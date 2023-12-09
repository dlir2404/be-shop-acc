const { Sequelize, DataTypes, Model, INTEGER } = require('sequelize');
const { sequelize } = require('../config/connectDB')

class Admin extends Model { }

Admin.init({
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
    modelName: 'Admin',
    tableName: 'admins'
});

module.exports = Admin