const express = require("express");
const router = express.Router();

const {
    consultarClientes,
    crearCliente,
    desactivarCliente,
} = require("../controllers/clientes_controller.js");


router.get("/clientes_registrados", consultarClientes);
router.post("/registrar_cliente", crearCliente);
router.put("/desactivar_cliente" , desactivarCliente); 


module.exports = router;
