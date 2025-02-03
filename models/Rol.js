const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Rol = sequelize.define("rol", {
    ID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    NOMBRE:{
        type: DataTypes.STRING,
        allowNull:false  
    }
}, {
    timestamps:false,
    tableName: "rol"
})

module.exports = Rol;