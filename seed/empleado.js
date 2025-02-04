const sequelize = require('sequelize');

const empleado = [
    {
        FECHA_INGRESO: sequelize.fn('NOW'),
        NOMBRE: 'Ramiro Ramirez',
        SALARIO: 2000000
    },
    {
        FECHA_INGRESO: '2025-01-01',
        NOMBRE: 'Andrea Jimenez',
        SALARIO: 3000000
    },
    {
        FECHA_INGRESO: '2025-01-01',
        NOMBRE: 'Esteban Fernandez',
        SALARIO: 3000000
    }
]

module.exports = empleado;