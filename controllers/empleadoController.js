const { where } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Empleado = require('../models/Empleado');
const Usuario = require('../models/User');

//Agregar
exports.nuevoEmpleado = async (req, res, next) =>{
    const password = req.body.PASSWORD;
    const datosEmpleado = req.body;
    delete datosEmpleado.PASSWORD;
    const empleado = new Empleado(datosEmpleado);    
    try {
        await empleado.save();
        const newEmpleado = await Empleado.findOne(
            {
                where: {NOMBRE: req.body.NOMBRE}
            }
        )
        let nombre = req.body.NOMBRE.split(" ")[0];
        let datosUsuario = {
            ROL_ID: 2,
            EMPLEADO_ID: newEmpleado.dataValues.ID,
            EMAIL: `${nombre.toLowerCase()}@${nombre.toLowerCase()}.com`,
            PASSWORD: bcrypt.hashSync(password, 10)
        }
        const usuario = new Usuario(datosUsuario);
        await usuario.save();
        res.json({mensaje: 'Se agrego un nuevo empleado'})
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarEmpleados = async (req, res, next) =>{
    try {
        const empleados = await Empleado.findAll({});
        res.json(empleados)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarUnEmpleado = async (req, res, next) =>{
    try {
        const idEmpleado = req.params.id;
        const empleado = await Empleado.findByPk(idEmpleado);
        res.json(empleado)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.actualizarEmpleado = async (req, res, next) =>{
    try {
        const idEmpleado = req.params.id;
        const datosActualizar = req.body;
        const empleado = await Empleado.findByPk(idEmpleado);
        if(!empleado){
            return res.status(404).json({mensage: "Empleado no encontrado"})
        }

        await empleado.update(datosActualizar, {
            where: {ID: idEmpleado}
        })

        res.json({mensaje: "Usuario actualizado correctamente"})
        
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.eliminarEmpleado = async (req, res, next) => {
    const idEmpleado = req.params.id;
    const empleado = await Empleado.findByPk(idEmpleado);
    const usuario = await Usuario.findOne({
        where: {EMPLEADO_ID: idEmpleado}
    })
    if(usuario){
        await usuario.destroy();
    }
    if(!empleado){
        return res.status(404).json({mensage: "Empleado no encontrado"})
    }

    await empleado.destroy();
    res.json({ mensaje: "Usuario eliminado correctamente" });
}

exports.autenticarUsuario = async (req, res, next)=> {
    const {EMAIL, PASSWORD} = req.body;
    const usuario = await Usuario.findOne(
        {
            where: {EMAIL},
            include:{
                model: Empleado,
                attributes: ['NOMBRE']
            }
        }
    )
    if(!usuario){
        await res.status(401).json({mensaje: 'El usuario no existe'});
        next();
    }else{
        if(!bcrypt.compareSync(PASSWORD, usuario.dataValues.PASSWORD)){
            await res.status(401).json({mensaje: 'Password incorrecto'});
            next();
        }else{
            const token = jwt.sign({
                email: usuario.dataValues.EMAIL,
                nombre: usuario.dataValues.empleado.dataValues.NOMBRE
            }, 'PRUEBA',
            {
                expiresIn : '2h'
            })
            res.json({token});
        }
    }
}