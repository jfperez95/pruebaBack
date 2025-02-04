const {DataTypes} = require('sequelize')
const sequelize = require('../config/db');
const Empleado = require('./Empleado');

const Solicitud = sequelize.define("solicitud", {
    ID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    CODIGO: {
        type: DataTypes.STRING,
        allowNull:false
    },
    DESCRIPCION:{
        type: DataTypes.STRING,
        allowNull:false  
    },
    RESUMEN:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ID_EMPLEADO:{
        type: DataTypes.INTEGER,
        references:{
            model: Empleado,
            key: "ID",
        },
        allowNull: false
    }
}, {
    timestamps:false,
    tableName: "solicitud"
})

Empleado.hasMany(Solicitud, {foreignKey: "ID_EMPLEADO"});
Solicitud.belongsTo(Empleado, {foreignKey: "ID_EMPLEADO"});

module.exports = Solicitud;