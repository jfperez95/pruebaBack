const express = require('express');
const empleadoController = require('../controllers/empleadoController');
const solicitudController = require('../controllers/solicitudeController')
const router = express.Router();

module.exports = function(){
    
    //Agregar empleado
    router.post('/empleados', empleadoController.nuevoEmpleado);
    //Autenticacion de usuario
    router.post('/empleados/login', empleadoController.autenticarUsuario);
    //Obtener todos lo empleados
    router.get('/empleados', empleadoController.mostrarEmpleados);
    //Obtener un empleado
    router.get('/empleados/:id', empleadoController.mostrarUnEmpleado);
    //Actualizar el empleado
    router.put('/empleados/:id', empleadoController.actualizarEmpleado);
    //Eliminar
    router.delete('/empleados/:id', empleadoController.eliminarEmpleado);

    //Agregar solicitud
    router.post('/solicitudes', solicitudController.nuevoEmpleado);
    //Mostrar las solicitudes
    router.get('/solicitudes', solicitudController.mostrarSolicitudes);
    //Mostrar una solicitud
    router.get('/solicitudes/:id', solicitudController.mostrarUnaSolicitud);
    //Actualizar una solicitud
    router.put('/solicitudes/:id', solicitudController.actualizarSolicitud);
    //Eliminar una solicitud
    router.delete('/solicitudes/:id', solicitudController.eliminarSolicitud);


    return router;
}