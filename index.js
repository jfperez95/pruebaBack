const express = require('express');
const routes = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Rol = require('./models/Rol');
const Empleado = require('./models/Empleado');
const Solicitud = require('./models/Solicitud');

//Creacion del servidor
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

db.sync()
    .then(()=> console.log("Base de datos sincronizada"))
    .catch(err=> console.error("Error al sincronizar BD: ", err))

//Rutas de la app
app.use('/', routes());

//Puerto
const port = 5000

app.listen(port, () => {
    console.log('Mi port' +  port);
  });

