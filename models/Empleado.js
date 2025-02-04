const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Empleado = sequelize.define("empleado", {
    ID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    FECHA_INGRESO: {
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    NOMBRE:{
        type: DataTypes.STRING(50),
        allowNull:false  
    },
    SALARIO:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps:false,
    tableName: "empleado"
})

module.exports = Empleado;