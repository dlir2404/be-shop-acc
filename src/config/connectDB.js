module.exports = {
    HOST: 'shop-acc.c6ihwuywlfdz.ap-southeast-2.rds.amazonaws.com',
    USER: 'dlir',
    PASSWORD: 'linhcdabc2404',
    DB: 'shop_acc',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}