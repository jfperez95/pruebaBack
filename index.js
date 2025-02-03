const express = require('express')

//Creacion del servidor
const app = express();

//Puerto
const port = 5000

app.listen(port, () => {
    console.log('Mi port' +  port);
  });

