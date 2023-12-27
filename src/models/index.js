const dbConfig = require('../config/connectDB')
const { Sequelize, DataTypes } = require('sequelize');
const Purchase = require('./Purchase.js');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: true,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }

    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')

    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

db.User = require('./User.js')(sequelize, DataTypes)
db.Admin = require('./Admin.js')(sequelize, DataTypes)
db.Account = require('./Account.js')(sequelize, DataTypes)
db.Purchase = require('./Purchase.js')(sequelize, DataTypes)
db.Sell = require('./Sell.js')(sequelize, DataTypes)

db.User.hasMany(db.Purchase, { foreignKey: 'userId' })
db.Purchase.belongsTo(db.User)
db.Account.hasOne(db.Purchase, { foreignKey: 'accountId' })
db.Purchase.belongsTo(db.Account)

module.exports = db
