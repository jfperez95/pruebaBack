const {exit} = require('node:process');
const db = require('../config/db')
const Empleado = require('../models/Empleado');
const Rol = require('../models/Rol');
const Solicitud = require('../models/Solicitud');
const Usuario = require('../models/User');
const empleado = require('./empleado');
const rol = require('./rol');
const solicitud = require('./solicitud');
const usuario = require('./user');

const importarDatos = async () =>{

    try{
        //Autenticar
        await db.authenticate()

        //Se insertan datos
        await Promise.all([
            Rol.bulkCreate(rol),
            Empleado.bulkCreate(empleado, {
                // Especificar campos explícitamente
                fields: ['FECHA_INGRESO', 'NOMBRE', 'SALARIO']
            }),
            Usuario.bulkCreate(usuario),
            Solicitud.bulkCreate(solicitud)
        ])
        console.log('Datos Importados Correctamente')
        exit()
    }catch(error){
        console.log(error)
        exit(1)
    }
}

const eliminarDatos = async() => {    
    
    try {
        
        await Promise.all([
            Solicitud.destroy({ where: {}, truncate: true, restartIdentity: true }),
            Usuario.destroy({ where: {}, truncate: true, restartIdentity: true }),
            Empleado.destroy({ where: {}, truncate: true, restartIdentity: true }),
            Rol.destroy({ where: {}, truncate: true, restartIdentity: true })
        ])
        console.log('Datos Eliminados Correctamente')
        exit()
    } catch (error) {
        console.log(error)
            exit(1)
    }   
    
}

if(process.argv[2] === '-i'){
    importarDatos();
}

if(process.argv[2] === '-e'){
    eliminarDatos();
}