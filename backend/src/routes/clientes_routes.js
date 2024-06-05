const express = require("express");
const router = express.Router();

const {
    consultarClientes,
    crearCliente,
    eliminarCliente,
} = require("../controllers/clientes_controller.js");


router.get("/clientes_registrados", consultarClientes);
router.post("/registrar_cliente", crearCliente);
router.delete("/eliminar_cliente" , eliminarCliente); 


module.exports = router;
