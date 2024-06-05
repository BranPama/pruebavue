const express = require('express');
const PORT = require('../src/config.js');
const useRoutes = require('../src/routes/clientes_routes.js');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(useRoutes);





app.listen(PORT)
console.log('server iniciado en', PORT);