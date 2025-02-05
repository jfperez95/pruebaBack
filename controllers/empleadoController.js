const { where } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Empleado = require('../models/Empleado');
const Usuario = require('../models/User');
const Rol = require('../models/Rol');

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
        let apellido = req.body.NOMBRE.split(" ")[1];
        let datosUsuario = {
            ROL_ID: req.body.ROL_ID,
            EMPLEADO_ID: newEmpleado.dataValues.ID,
            EMAIL: `${nombre.toLowerCase()}${apellido.toLowerCase()}@${nombre.toLowerCase()}.com`,
            PASSWORD: bcrypt.hashSync(password, 10)
        }
        const usuario = new Usuario(datosUsuario);
        await usuario.save();
        res.json({mensaje: 'Se agrego un nuevo empleado'})
    } catch (error) {
        res.status(401).json({mensaje : 'Hubo un error verifique los datos ingresados'});
        next();
    }
}

exports.mostrarEmpleados = async (req, res, next) =>{
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
        const empleados = await Usuario.findAll({
            include:[{model: Empleado}],
            raw: true,
            nest:true
        });
        const datosEnviar = empleados.map((empleado) => ({
            ID: empleado.empleado?.ID,
            NOMBRE: empleado.empleado?.NOMBRE,
            FECHA_INGRESO: empleado.empleado?.FECHA_INGRESO,
            SALARIO: empleado.empleado?.SALARIO,
            EMAIL: empleado.EMAIL,
            ROL_ID: empleado.ROL_ID
          }))
        res.json(datosEnviar)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarRoles = async (req, res, next) => {
    try {
        const rol = await Rol.findAll();
        res.json(rol);
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarUnEmpleado = async (req, res, next) =>{
    try {
        const idEmpleado = req.params.id;
        const empleado = await Usuario.findOne({
            where:{EMPLEADO_ID: idEmpleado},
            include:[{model: Empleado}],
            raw: true,
            nest:true
        });
        const datosEmpleado = {
            ID: empleado.empleado?.ID,
            NOMBRE: empleado.empleado?.NOMBRE,
            FECHA_INGRESO: empleado.empleado?.FECHA_INGRESO,
            SALARIO: empleado.empleado?.SALARIO,
            EMAIL: empleado.EMAIL,
            ROL_ID: empleado.ROL_ID
          }
        res.json(datosEmpleado);
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.actualizarEmpleado = async (req, res, next) =>{
    try {
        const idEmpleado = req.params.id;
        const datosActualizar = req.body;
        let nombre = req.body.NOMBRE.split(" ")[0];
        let apellido = req.body.NOMBRE.split(" ")[1];
        const empleado = await Empleado.findByPk(idEmpleado);
        const usuario = await Usuario.findOne(
            {
                where: {EMPLEADO_ID: idEmpleado}
            }
        )
        const datosEmpleado = {
            NOMBRE: req.body.NOMBRE,
            FECHA_INGRESO: req.body.FECHA_INGRESO,
            SALARIO: req.body.SALARIO
        }     
        const datosUsuario= {ROL_ID:req.body.ROL_ID, EMAIL: `${nombre.toLowerCase()}${apellido.toLowerCase()}@${nombre.toLowerCase()}.com`}
        if(!empleado){
            return res.status(404).json({mensage: "Empleado no encontrado"})
        }

        await empleado.update(datosEmpleado, {
            where: {ID: idEmpleado}
        })

        await usuario.update(datosUsuario, {
            where: {EMPLEADO_ID: idEmpleado}
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
    res.json({ mensaje: "Empleado eliminado correctamente" });
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
                nombre: usuario.dataValues.empleado.dataValues.NOMBRE,
                rol: usuario.dataValues.ROL_ID
            }, 'PRUEBA',
            {
                expiresIn : '2h'
            })

            res.json({token});
        }
    }
}