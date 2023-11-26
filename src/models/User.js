const { Sequelize, DataTypes, Model  } = require('sequelize');
const { sequelize } = require('../config/connectDB')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  sequelize, 
  modelName: 'User' 
});

module.exports = User