const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shop_acc', 'dlir', 'linhcdabc2404', {
    host: 'shop-acc.c6ihwuywlfdz.ap-southeast-2.rds.amazonaws.com',
    dialect: 'mysql'
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, testConnection }