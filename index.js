const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const cors = require('cors');
const db = require('./config/db');
const User = require('./models/User');
const Rol = require('./models/Rol');
const Empleado = require('./models/Empleado');
const Solicitud = require('./models/Solicitud');

//Creacion del servidor
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

db.sync()
    .then(()=> console.log("Base de datos sincronizada"))
    .catch(err=> console.error("Error al sincronizar BD: ", err))

//Habilitar cors
app.use(cors());

//Rutas de la app
app.use('/', routes());

//Puerto
const port = 5000

app.listen(port, () => {
    console.log('Mi port' +  port);
  });

