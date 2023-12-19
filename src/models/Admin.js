module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admin', {
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
        timestamps: false
    })
    return Admin
}