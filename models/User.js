const {DataTypes} = require('sequelize')
const sequelize = require('../config/db');
const Rol = require('./Rol');

const User = sequelize.define("User", {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ROL_ID:{
        type: DataTypes.INTEGER,
        references:{
            model: Rol,
            key: "ID",
        },
        allowNull:false
    },
    NOMBRE:{
        type: DataTypes.STRING,
        allowNull:false
    },
    EMAIL:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    PASSWORD:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    timestamps:false,
    tableName: "usuario"
});

Rol.hasMany(User, {foreignKey: "ROL_ID"});
User.belongsTo(Rol, {foreignKey: "ROL_ID"})

module.exports = User;

