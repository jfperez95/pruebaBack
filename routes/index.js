const express = require('express');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const empleadoController = require('../controllers/empleadoController');
const solicitudController = require('../controllers/solicitudeController')
const auth = require('../middleware/auth');
const router = express.Router();

module.exports = function(){
    
    //Agregar empleado
    router.post('/empleados', auth([1]),
    body('FECHA_INGRESO').notEmpty().withMessage('La fecha de ingreso es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('NOMBRE').notEmpty().withMessage('El nombre es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('SALARIO').notEmpty().withMessage('El salario es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('PASSWORD').notEmpty().withMessage('La clave es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    empleadoController.nuevoEmpleado);
    //Autenticacion de usuario
    router.post('/empleados/login',
    body('EMAIL').notEmpty().withMessage('La clave es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('PASSWORD').notEmpty().withMessage('La clave es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    empleadoController.autenticarUsuario);
    //Obtener todos lo empleados
    router.get('/empleados', auth([1,2]), empleadoController.mostrarEmpleados);
    //Mostrar los roles
    router.get('/empleados/roles', empleadoController.mostrarRoles);
    //Obtener un empleado
    router.get('/empleados/:id', auth([1,2]), empleadoController.mostrarUnEmpleado);
    //Actualizar el empleado
    router.put('/empleados/:id',  auth([1]),
    body('FECHA_INGRESO').notEmpty().withMessage('La fecha de ingreso es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('NOMBRE').notEmpty().withMessage('El nombre es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('SALARIO').notEmpty().withMessage('El salario es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('PASSWORD').notEmpty().withMessage('La clave es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    empleadoController.actualizarEmpleado);
    //Eliminar
    router.delete('/empleados/:id', auth([1]), empleadoController.eliminarEmpleado);
    //Agregar solicitud
    router.post('/solicitudes', auth([1]),
    body('CODIGO').notEmpty().withMessage('La fecha de ingreso es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('DESCRIPCION').notEmpty().withMessage('El nombre es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('RESUMEN').notEmpty().withMessage('El salario es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('ID_EMPLEADO').notEmpty().withMessage('El salario es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    solicitudController.nuevoEmpleado);
    //Mostrar las solicitudes
    router.get('/solicitudes', auth([1,2]), solicitudController.mostrarSolicitudes);
    //Mostrar una solicitud
    router.get('/solicitudes/:id', auth([1]), solicitudController.mostrarUnaSolicitud);
    //Actualizar una solicitud
    router.put('/solicitudes/:id', auth([1]),  
    body('CODIGO').notEmpty().withMessage('La fecha de ingreso es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('DESCRIPCION').notEmpty().withMessage('El nombre es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('RESUMEN').notEmpty().withMessage('El salario es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    body('ID_EMPLEADO').notEmpty().withMessage('El salario es obligatoria').customSanitizer(value => sanitizeHtml(value)),
    solicitudController.actualizarSolicitud);
    //Eliminar una solicitud 
    router.delete('/solicitudes/:id', auth([1]), solicitudController.eliminarSolicitud);


    return router;
}