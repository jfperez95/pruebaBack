const { where } = require('sequelize');
const Solicitud = require('../models/Solicitud');
const Empleado = require('../models/Empleado');

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
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
        const solicitudes = await Solicitud.findAll({
            include:[{model: Empleado}],
            raw: true,
            nest:true
        });
        const datosEnviar = solicitudes.map((solicitud) => ({
            ID: solicitud.ID,
            DESCRIPCION: solicitud.DESCRIPCION,
            RESUMEN: solicitud.RESUMEN,
            NOMBRE: solicitud.empleado.NOMBRE,
            CODIGO: solicitud.CODIGO
          }))
        res.json(datosEnviar)
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
