const { where } = require('sequelize');
const Solicitud = require('../models/Solicitud');

//Nueva solicitud
exports.nuevoEmpleado = async (req, res, next) =>{
    
    const solicitud = new Solicitud(req.body);
    try {
        await solicitud.save();
        res.json({mensaje: 'Se agrego una nueva solicitud'})
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar todas las solicitudes
exports.mostrarSolicitudes = async (req, res, next) =>{
    try {
        const solicitudes = await Solicitud.findAll({});
        res.json(solicitudes)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarUnaSolicitud = async (req, res, next) =>{
    try {
        const idSolicitud = req.params.id;
        const solicitud = await Solicitud.findByPk(idSolicitud);
        res.json(solicitud)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.actualizarSolicitud = async (req, res, next) =>{
    try {
        const idSolicitud = req.params.id;
        const datosActualizar = req.body;
        const solicitud = await Solicitud.findByPk(idSolicitud);
        if(!solicitud){
            return res.status(404).json({mensage: "Empleado no encontrado"})
        }

        await solicitud.update(datosActualizar, {
            where: {ID: idSolicitud}
        })

        res.json({mensaje: "Solicitud actualizadoacorrectamente"})
        
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.eliminarSolicitud = async (req, res, next) => {
    const idSolicitud = req.params.id;
    const solicitud = await Solicitud.findByPk(idSolicitud);
    if(!solicitud){
        return res.status(404).json({mensage: "Empleado no encontrado"})
    }

    await solicitud.destroy();
    res.json({ mensaje: "Solicitud eliminado correctamente" });
}
