const bcrypt = require('bcryptjs')

const usuario = [
    {
        ROL_ID: 1,
        EMPLEADO_ID: 1,
        EMAIL: 'ramiro@ramiro.com',
        PASSWORD: bcrypt.hashSync('123456', 10)
    },
    {
        ROL_ID: 2,
        EMPLEADO_ID: 2,
        EMAIL: 'andrea@andrea.com',
        PASSWORD: bcrypt.hashSync('123456', 10)
    },
    {
        ROL_ID: 2,
        EMPLEADO_ID: 3,
        EMAIL: 'esteban@esteban.com',
        PASSWORD: bcrypt.hashSync('123456', 10)
    }
]

module.exports = usuario;