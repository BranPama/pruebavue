const express = require('express');
const PORT = require('../src/config.js');
const pg = require('pg');
const cors = require('cors');
//manejo de sesiones(autenticacion)
const crypto = require('crypto');
//routes donde se almacenan las peticiones
const routesClientes = require('../src/routes/clientes_routes.js');
const routesAutenticacion = require('../src/routes/auth_routes.js');
//

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//aqui le decimos donde se almacenan las sesiones


//routes
app.use(routesClientes);
app.use(routesAutenticacion);





app.listen(PORT)
console.log('server iniciado en', PORT);